"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"

export default function SignupPage() {
  const router = useRouter()
  const { signup, loginWithGoogle } = useAuth() // Assuming you have a custom hook for authentication

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })

  const [errors, setErrors] = useState({})
  const [generalError, setGeneralError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    try {
      setGeneralError("")
      setLoading(true)

      await signup(formData.email, formData.password, formData.firstName, formData.lastName)

      router.push("/")
    } catch (error) {
      console.error("Signup error:", error)
      setGeneralError("Failed to create an account. " + (error.message || "Please try again later."))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    try {
      setGeneralError("")
      setLoading(true)
      await loginWithGoogle()
      router.push("/")
    } catch (error) {
      console.error("Google signup error:", error)
      setGeneralError("Failed to sign up with Google.")
    } finally {
      setLoading(false)
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
          <h2 className="text-3xl text-[#a05046] italic font-medium mb-6 text-center">Create an Account</h2>

          {generalError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{generalError}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-[#a05046] italic mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border-2 ${errors.firstName ? "border-red-500" : "border-[#9d7a9b]"} rounded focus:outline-none focus:border-[#8a6a8a]`}
                />
                {errors.firstName && <p className="mt-1 text-red-500 text-sm">{errors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-[#a05046] italic mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border-2 ${errors.lastName ? "border-red-500" : "border-[#9d7a9b]"} rounded focus:outline-none focus:border-[#8a6a8a]`}
                />
                {errors.lastName && <p className="mt-1 text-red-500 text-sm">{errors.lastName}</p>}
              </div>
            </div>

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
                className={`w-full px-3 py-2 border-2 ${errors.email ? "border-red-500" : "border-[#9d7a9b]"} rounded focus:outline-none focus:border-[#8a6a8a]`}
              />
              {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
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
                className={`w-full px-3 py-2 border-2 ${errors.password ? "border-red-500" : "border-[#9d7a9b]"} rounded focus:outline-none focus:border-[#8a6a8a]`}
              />
              {errors.password && <p className="mt-1 text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-[#a05046] italic mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-3 py-2 border-2 ${errors.confirmPassword ? "border-red-500" : "border-[#9d7a9b]"} rounded focus:outline-none focus:border-[#8a6a8a]`}
              />
              {errors.confirmPassword && <p className="mt-1 text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className={`h-4 w-4 border-[#9d7a9b] rounded focus:ring-[#9d7a9b] ${errors.agreeTerms ? "border-red-500" : ""}`}
              />
              <label htmlFor="agreeTerms" className="ml-2 block text-sm text-[#a05046] italic">
                I agree to the{" "}
                <a href="#" className="text-[#9d7a9b] hover:text-[#8a6a8a]">
                  Terms and Conditions
                </a>
              </label>
            </div>
            {errors.agreeTerms && <p className="mt-1 text-red-500 text-sm">{errors.agreeTerms}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-[#9d7a9b] text-white italic rounded hover:bg-[#8a6a8a] transition-colors mt-6 disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#a05046] italic">
              Already have an account?{" "}
              <Link href="/login" className="text-[#9d7a9b] hover:text-[#8a6a8a]">
                Log in
              </Link>
            </p>
          </div>
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#9d7a9b]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#a05046] italic">Or sign up with</span>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={loading}
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

