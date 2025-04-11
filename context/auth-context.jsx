"use client"

import { createContext, useContext, useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth"
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState(null)

  // Sign up with email and password
  const signup = async (email, password, firstName, lastName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Update profile with display name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      })

      // Create user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        createdAt: new Date().toISOString(),
        orders: [],
        favorites: [],
        addresses: [],
      })

      return user
    } catch (error) {
      throw error
    }
  }

  // Sign in with email and password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Sign in with Google
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Check if user document exists
      const userDoc = await getDoc(doc(db, "users", user.uid))

      if (!userDoc.exists()) {
        // Create user document if it doesn't exist
        const names = user.displayName ? user.displayName.split(" ") : ["", ""]
        const firstName = names[0] || ""
        const lastName = names.slice(1).join(" ") || ""

        await setDoc(doc(db, "users", user.uid), {
          firstName,
          lastName,
          email: user.email,
          createdAt: new Date().toISOString(),
          orders: [],
          favorites: [],
          addresses: [],
        })
      }

      return user
    } catch (error) {
      throw error
    }
  }

  // Sign out
  const logout = () => {
    return signOut(auth)
  }

  // Reset password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  // Update user profile
  const updateUserProfile = async (data) => {
    if (!currentUser) return

    try {
      await updateDoc(doc(db, "users", currentUser.uid), data)

      // Refresh user profile
      const updatedDoc = await getDoc(doc(db, "users", currentUser.uid))
      setUserProfile(updatedDoc.data())

      return updatedDoc.data()
    } catch (error) {
      throw error
    }
  }

  // Fetch user profile from Firestore
  const fetchUserProfile = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId))
      if (userDoc.exists()) {
        setUserProfile(userDoc.data())
        return userDoc.data()
      }
      return null
    } catch (error) {
      console.error("Error fetching user profile:", error)
      return null
    }
  }

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)

      if (user) {
        await fetchUserProfile(user.uid)
      } else {
        setUserProfile(null)
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    updateUserProfile,
    fetchUserProfile,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
