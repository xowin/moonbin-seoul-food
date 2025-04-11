// lib/firebase-config.js
export const getFirebaseConfig = () => {
    // Try to use environment variables first
    const envConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    };
  
    // Check if environment variables are loaded
    if (envConfig.apiKey && envConfig.authDomain && envConfig.projectId) {
      console.log("Using environment variables for Firebase config");
      return envConfig;
    }
  
    // Fallback to hardcoded values (only in development)
    console.warn("Environment variables not found, using fallback config (DEVELOPMENT ONLY)");
    if (process.env.NODE_ENV === 'production') {
      throw new Error("Firebase configuration missing in production environment");
    }
  
    return {
      apiKey: "AIzaSyCCw-573y3e7vy0eA-UUEauMQizE6d7A7g",
      authDomain: "moonbins.firebaseapp.com",
      projectId: "moonbins",
      storageBucket: "moonbins.firebasestorage.app",
      messagingSenderId: "483193330045",
      appId: "1:483193330045:web:a0edb17c3bec133afd9414",
      measurementId: "G-QPN39D60G1"
    };
  };