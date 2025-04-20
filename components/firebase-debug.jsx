"use client"

import { useState } from "react"
import { auth, db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

export function FirebaseDebug() {
  const [status, setStatus] = useState("Not checked")
  const [error, setError] = useState(null)
  const [config, setConfig] = useState(null)

  const checkFirebase = async () => {
    try {
      setStatus("Checking...")
      setError(null)

      // Check auth
      const currentUser = auth.currentUser

      // Check Firestore connection
      try {
        const snapshot = await getDocs(collection(db, "test-collection"))
        console.log("Firestore connection successful")
      } catch (firestoreError) {
        console.error("Firestore error:", firestoreError)
        setError(`Firestore error: ${firestoreError.message}`)
      }

      // Get config
      const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
      }

      setConfig(firebaseConfig)
      setStatus(currentUser ? `Connected as ${currentUser.email}` : "Connected (not logged in)")
    } catch (e) {
      console.error("Firebase check error:", e)
      setError(`Error: ${e.message}`)
      setStatus("Error")
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-md">
        <h3 className="text-lg font-medium mb-2">Firebase Status: {status}</h3>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {config && (
          <div className="mb-2 text-xs">
            <p>API Key: {config.apiKey ? config.apiKey.substring(0, 5) + "..." : "Not set"}</p>
            <p>Project ID: {config.projectId || "Not set"}</p>
            <p>Auth Domain: {config.authDomain || "Not set"}</p>
          </div>
        )}

        <button onClick={checkFirebase} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Check Firebase
        </button>
      </div>
    </div>
  )
}
