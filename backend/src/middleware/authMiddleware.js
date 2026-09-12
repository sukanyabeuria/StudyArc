import admin, { getAuth } from '../config/firebase.js';
import User from '../models/User.js';

/**
 * Authentication Middleware
 *
 * 1. Reads the Authorization header from the incoming request.
 * 2. Extracts the Bearer token: "Authorization: Bearer <firebase-id-token>".
 * 3. Verifies the token using Firebase Admin SDK.
 * 4. Resolves the user in MongoDB via `firebaseUid`.
 *    If this is the user's first time signing in, automatically provisions their User record.
 * 5. Attaches the authenticated MongoDB User document to `req.user`.
 * 6. Returns HTTP 401 for missing, invalid, or expired tokens.
 */
export const protect = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1]?.trim();
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authorization token missing or malformed. Expected Bearer <token>.'
    });
  }

  try {
    let decodedToken;

    // Optional development mock auth: Only allowed if explicitly enabled in development
    if (
      process.env.NODE_ENV === 'development' &&
      process.env.ALLOW_DEV_AUTH === 'true' &&
      token.startsWith('dev_token_')
    ) {
      const devUid = token.replace('dev_token_', '');
      decodedToken = {
        uid: devUid || 'dev_user_123',
        email: `${devUid || 'dev_user'}@focusnest.com`,
        name: `Dev User (${devUid || '123'})`,
        picture: ''
      };
    } else {
      // Standard Production Firebase Admin Verification
      if (!admin.apps.length) {
        return res.status(401).json({
          success: false,
          message:
            'Firebase Admin is not configured. Please supply Firebase credentials in .env or set ALLOW_DEV_AUTH=true in development.'
        });
      }
      const auth = getAuth();
      decodedToken = await auth.verifyIdToken(token);
    }

    // Attach verified Firebase token info
    req.firebaseUser = decodedToken;

    // Link Firebase identity to MongoDB User document
    let user = await User.findOne({ firebaseUid: decodedToken.uid });

    // JIT Provisioning: If user signed up via Firebase but has no MongoDB record yet, create one
    if (!user) {
      user = await User.create({
        firebaseUid: decodedToken.uid,
        email: decodedToken.email || `user_${decodedToken.uid}@focusnest.app`,
        name: decodedToken.name || decodedToken.email?.split('@')[0] || 'Focus Learner',
        avatar: decodedToken.picture || ''
      });
      console.log(`[Auth] Auto-provisioned new MongoDB user for UID: ${decodedToken.uid}`);
    }

    // Attach the authenticated user to the request
    req.user = user;
    next();
  } catch (error) {
    console.error(`[Auth Middleware Error]: ${error.message}`);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authorization token'
    });
  }
};
