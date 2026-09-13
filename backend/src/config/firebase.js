import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

let firebaseApp = null;

/**
 * Initialize Firebase Admin SDK
 * Can be initialized via service account file path or individual environment variables.
 */
export const initFirebase = () => {
  if (firebaseApp) {
    return firebaseApp;
  }

  try {
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (serviceAccountPath && fs.existsSync(serviceAccountPath)) {
      const resolvedPath = path.resolve(serviceAccountPath);
      const serviceAccount = JSON.parse(fs.readFileSync(resolvedPath, 'utf8'));

      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      console.log(`[Firebase Admin] Initialized with service account file: ${resolvedPath}`);
    } else if (projectId && clientEmail && privateKey) {
      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          // Replace escaped newlines with actual newline characters
          privateKey: privateKey.replace(/\\n/g, '\n')
        })
      });
      console.log(`[Firebase Admin] Initialized with environment credentials for project: ${projectId}`);
    } else if (projectId) {
      firebaseApp = admin.initializeApp({ projectId });
      console.log(`[Firebase Admin] Initialized with project ID: ${projectId}`);
    } else {
      console.warn(
        `[Firebase Admin Warning] No Firebase credentials provided in .env. ` +
        `Firebase token verification will not work until credentials are configured (required for Phase 2).`
      );
    }
  } catch (error) {
    console.error(`[Firebase Admin Error] Initialization failed: ${error.message}`);
  }

  return firebaseApp;
};

export const getAuth = () => {
  if (!firebaseApp && admin.apps.length === 0) {
    initFirebase();
  }
  return admin.auth();
};

export default admin;
