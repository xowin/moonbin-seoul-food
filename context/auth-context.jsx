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
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

// Create the auth context
const AuthContext = createContext({
  currentUser: null,
  userProfile: null,
  loading: true,
  signup: async () => {},
  login: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
  updateUserProfile: async () => {},
  fetchUserProfile: async () => {},
  addOrder: async () => {},
  addToFavorites: async () => {},
  removeFromFavorites: async () => {},
})

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
      provider.setCustomParameters({
        prompt: "select_account",
      })
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
      console.error("Error signing in with Google:", error)
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

  const addOrder = async (orderData) => {
    if (!currentUser) return null

    try {
      // Generate a unique order ID
      const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`

      // Create the order object
      const order = {
        id: orderId,
        date: new Date().toISOString(),
        ...orderData,
        status: "Confirmed",
      }

      // Add to Firestore
      await updateDoc(doc(db, "users", currentUser.uid), {
        orders: arrayUnion(order),
      })

      // Refresh user profile
      await fetchUserProfile(currentUser.uid)

      return order
    } catch (error) {
      console.error("Error adding order:", error)
      throw error
    }
  }

  // Add item to favorites
  const addToFavorites = async (item) => {
    if (!currentUser) return null

    try {
      // Check if item is already in favorites
      const userDoc = await getDoc(doc(db, "users", currentUser.uid))
      const userData = userDoc.data()

      if (userData.favorites.some((fav) => fav.id === item.id)) {
        // Item already in favorites
        return userData
      }

      // Add to Firestore
      await updateDoc(doc(db, "users", currentUser.uid), {
        favorites: arrayUnion(item),
      })

      // Refresh user profile
      await fetchUserProfile(currentUser.uid)

      return userProfile
    } catch (error) {
      console.error("Error adding to favorites:", error)
      throw error
    }
  }

  // Remove item from favorites
  const removeFromFavorites = async (itemId) => {
    if (!currentUser || !userProfile) return null

    try {
      // Filter out the item to remove
      const updatedFavorites = userProfile.favorites.filter((item) => item.id !== itemId)

      // Update Firestore
      await updateDoc(doc(db, "users", currentUser.uid), {
        favorites: updatedFavorites,
      })

      // Refresh user profile
      await fetchUserProfile(currentUser.uid)

      return userProfile
    } catch (error) {
      console.error("Error removing from favorites:", error)
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
      } else {
        // If profile doesn't exist, create a default one
        const defaultProfile = {
          firstName: currentUser?.displayName?.split(" ")[0] || "",
          lastName: currentUser?.displayName?.split(" ").slice(1).join(" ") || "",
          email: currentUser?.email || "",
          createdAt: new Date().toISOString(),
          orders: [],
          favorites: [],
        }

        // Save the default profile
        await setDoc(doc(db, "users", userId), defaultProfile)
        setUserProfile(defaultProfile)
        return defaultProfile
      }
    } catch (error) {
      console.error("Error fetching user profile:", error)
      // Return a minimal profile to prevent loading indefinitely
      const fallbackProfile = {
        firstName: currentUser?.displayName?.split(" ")[0] || "",
        lastName: currentUser?.displayName?.split(" ").slice(1).join(" ") || "",
        email: currentUser?.email || "",
        createdAt: new Date().toISOString(),
        orders: [],
        favorites: [],
      }
      setUserProfile(fallbackProfile)
      return fallbackProfile
    }
  }

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed:", user ? user.email : "No user")
      setCurrentUser(user)

      if (user) {
        try {
          await fetchUserProfile(user.uid)
        } catch (error) {
          console.error("Error in auth state change:", error)
        }
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
