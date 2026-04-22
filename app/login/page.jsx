"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { useAuth } from "@/context/auth-context"
import { Navigation } from "@/components/navigation"

export default function LoginPage() {
  const router = useRouter()

  const { login, loginWithGoogle, resetPassword, currentUser, loading: authLoading } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resetSent, setResetSent] = useState(false)

  useEffect(() => {
    if (!authLoading && currentUser) {
      router.replace("/")
    }
  }, [authLoading, currentUser, router])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setError("")
      setIsSubmitting(true)
      await login(formData.email, formData.password)
      router.push("/")
    } catch (error) {
      console.error("Login error:", error)
      setError("Failed to log in. Please check your email and password.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setError("")
      setIsSubmitting(true)
      await loginWithGoogle()
      router.push("/")
    } catch (error) {
      console.error("Google login error:", error)
      const message =
        error?.code === "permission-denied"
          ? "Signed in with Google, but Firestore denied access. Please review your database rules."
          : "Failed to log in with Google."
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetPassword = async () => {
    if (!formData.email) {
      setError("Please enter your email address to reset your password.")
      return
    }

    try {
      setError("")
      setIsSubmitting(true)
      await resetPassword(formData.email)
      setResetSent(true)
    } catch (error) {
      console.error("Password reset error:", error)
      setError("Failed to send password reset email. Please check your email address.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f2e9]">
      {/* Header */}
      
      <Header />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 py-12">
        <div className="bg-white p-8 rounded-lg border-2 border-[#9d7a9b] shadow-lg">
          <h2 className="text-3xl text-[#a05046] italic font-medium mb-6 text-center">Log In</h2>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          {resetSent && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Password reset email sent! Check your inbox.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-[#a05046] italic mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border-2 border-[#9d7a9b] rounded focus:outline-none focus:border-[#8a6a8a]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[#a05046] italic mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border-2 border-[#9d7a9b] rounded focus:outline-none focus:border-[#8a6a8a]"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 border-[#9d7a9b] rounded focus:ring-[#9d7a9b]"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-[#a05046] italic">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="text-[#9d7a9b] hover:text-[#8a6a8a] italic hover:text - [#816a8a]">
                  Forgot your password?
                  </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-[#9d7a9b] text-white italic rounded hover:bg-[#8a6a8a] transition-colors disabled:opacity-70"
              >
              {isSubmitting ? " Loading..." : " Log In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#a05046] italic">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#9d7a9b] hover:text-[#8a6a8a]">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#9d7a9b]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#a05046] italic">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isSubmitting}
                className="w-full py-2 px-4 border-2 border-[#9d7a9b] rounded-md shadow-sm text-sm font-medium text-[#a05046] italic bg-white hover:bg-gray-50 disabled:opacity-70"
              >
                Google
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

