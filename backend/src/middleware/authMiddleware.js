import mongoose from 'mongoose';
import admin, { getAuth } from '../config/firebase.js';
import User from '../models/User.js';

/**
 * Authentication Middleware
 *
 * 1. Reads the Authorization header from the incoming request.
 * 2. Extracts the Bearer token: "Authorization: Bearer <firebase-id-token>".
 * 3. Verifies the token using Firebase Admin SDK (or dev mock in development).
 * 4. Resolves the user in MongoDB via `firebaseUid` if DB is connected.
 * 5. Attaches the authenticated User to `req.user`.
 * 6. Returns HTTP 401 for missing, invalid, or expired tokens.
 */
export const protect = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1]?.trim();
  }

  const allowDevAuth = process.env.ALLOW_DEV_AUTH === 'true' || !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

  // If no token is supplied, but dev/guest auth is allowed, assign default study persona
  if (!token) {
    if (allowDevAuth) {
      token = 'dev_token_debasis';
    } else {
      return res.status(401).json({
        success: false,
        message: 'Authorization token missing or malformed. Expected Bearer <token>.'
      });
    }
  }

  try {
    let decodedToken;

    // Optional development / demo persona auth:
    if (token.startsWith('dev_token_') && allowDevAuth) {
      const devUid = token.replace('dev_token_', '') || 'debasis';
      const capitalized = devUid.charAt(0).toUpperCase() + devUid.slice(1);
      decodedToken = {
        uid: `dev_${devUid}`,
        email: `${devUid}@studyarc.com`,
        name: capitalized,
        picture: ''
      };
    } else {
      // Standard Firebase Admin Verification
      if (admin.apps.length) {
        const auth = getAuth();
        decodedToken = await auth.verifyIdToken(token);
      } else if (token.includes('.') && allowDevAuth) {
        try {
          const payloadBase64 = token.split('.')[1];
          const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf8');
          const payload = JSON.parse(payloadJson);
          decodedToken = {
            uid: payload.user_id || payload.sub || payload.uid || 'dev_user',
            email: payload.email || 'user@studyarc.com',
            name: payload.name || payload.email?.split('@')[0] || 'Focus Learner',
            picture: payload.picture || ''
          };
          console.log(`[Auth] Parsed client Firebase token for UID: ${decodedToken.uid}`);
        } catch (e) {
          decodedToken = {
            uid: 'dev_debasis',
            email: 'debasis@studyarc.com',
            name: 'Debasis',
            picture: ''
          };
        }
      } else if (allowDevAuth) {
        // Graceful fallback to dev persona if Firebase admin is not configured
        decodedToken = {
          uid: 'dev_debasis',
          email: 'debasis@studyarc.com',
          name: 'Debasis',
          picture: ''
        };
      } else {
        return res.status(401).json({
          success: false,
          message:
            'Firebase Admin is not configured. Please supply Firebase credentials in .env or set ALLOW_DEV_AUTH=true in environment variables.'
        });
      }
    }

    // Attach verified Firebase token info
    req.firebaseUser = decodedToken;

    // Link Firebase identity to MongoDB User document if database is connected
    let user = null;
    if (mongoose.connection.readyState === 1) {
      user = await User.findOne({ firebaseUid: decodedToken.uid });
      if (!user) {
        user = await User.create({
          firebaseUid: decodedToken.uid,
          email: decodedToken.email || `user_${decodedToken.uid}@studyarc.app`,
          name: decodedToken.name || decodedToken.email?.split('@')[0] || 'Focus Learner',
          avatar: decodedToken.picture || ''
        });
        console.log(`[Auth] Auto-provisioned new MongoDB user for UID: ${decodedToken.uid}`);
      }
    } else {
      // Graceful fallback with valid Mongoose ObjectId so Todo.create never fails schema validation
      user = {
        _id: new mongoose.Types.ObjectId('65f1a2b3c4d5e6f7a8b9c0d1'),
        firebaseUid: decodedToken.uid,
        name: decodedToken.name || 'Debasis',
        email: decodedToken.email || 'debasis@studyarc.com',
        level: 1,
        xp: 0
      };
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

/**
 * Optional Authentication Middleware
 * If a Bearer token is provided, verify and attach user to req.user.
 * If no token or invalid token, allows request to proceed with req.user = null.
 */
export const optionalProtect = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1]?.trim();
  }

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    let decodedToken = null;

    const allowDevAuth = process.env.ALLOW_DEV_AUTH === 'true' || !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

    if (token.startsWith('dev_token_') && allowDevAuth) {
      const devUid = token.replace('dev_token_', '') || 'debasis';
      const capitalized = devUid.charAt(0).toUpperCase() + devUid.slice(1);
      decodedToken = {
        uid: `dev_${devUid}`,
        email: `${devUid}@studyarc.com`,
        name: capitalized,
        picture: ''
      };
    } else if (admin.apps.length) {
      const auth = getAuth();
      decodedToken = await auth.verifyIdToken(token);
    } else if (token.includes('.') && allowDevAuth) {
      try {
        const payloadBase64 = token.split('.')[1];
        const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf8');
        const payload = JSON.parse(payloadJson);
        decodedToken = {
          uid: payload.user_id || payload.sub || payload.uid || 'dev_user',
          email: payload.email || 'user@studyarc.com',
          name: payload.name || payload.email?.split('@')[0] || 'Focus Learner',
          picture: payload.picture || ''
        };
      } catch (e) {
        decodedToken = {
          uid: 'dev_debasis',
          email: 'debasis@studyarc.com',
          name: 'Debasis',
          picture: ''
        };
      }
    } else if (allowDevAuth) {
      decodedToken = {
        uid: 'dev_debasis',
        email: 'debasis@studyarc.com',
        name: 'Debasis',
        picture: ''
      };
    }

    if (decodedToken) {
      req.firebaseUser = decodedToken;
      if (mongoose.connection.readyState === 1) {
        req.user = await User.findOne({ firebaseUid: decodedToken.uid });
      } else {
        req.user = {
          _id: new mongoose.Types.ObjectId('65f1a2b3c4d5e6f7a8b9c0d1'),
          firebaseUid: decodedToken.uid,
          name: decodedToken.name || 'Debasis',
          email: decodedToken.email || 'debasis@studyarc.com',
          level: 1,
          xp: 0
        };
      }
    } else {
      req.user = null;
    }

    next();
  } catch (error) {
    // For optional authentication, do not fail the request
    req.user = null;
    next();
  }
};
