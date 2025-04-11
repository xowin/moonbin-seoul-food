"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/context/auth-context"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { CartSlider } from "@/components/cart-slider"
import { User, Phone, MapPin, Edit, Save, X } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const { currentUser, userProfile, updateUserProfile } = useAuth()

  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  })

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser && !loading) {
      router.push("/login")
    }
  }, [currentUser, router, loading])

  // Load user profile data
  useEffect(() => {
    if (userProfile) {
      setFormData({
        firstName: userProfile.firstName || "",
        lastName: userProfile.lastName || "",
        phone: userProfile.phone || "",
        address: userProfile.address || "",
        city: userProfile.city || "",
        zipCode: userProfile.zipCode || "",
      })
    }
  }, [userProfile])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError("")
      setSuccess("")
      setLoading(true)

      await updateUserProfile(formData)

      setSuccess("Profile updated successfully!")
      setEditing(false)
    } catch (error) {
      console.error("Profile update error:", error)
      setError("Failed to update profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!currentUser || !userProfile) {
    return (
      <div className="min-h-screen bg-[#f5f2e9]">
        <Header />
        <Navigation />
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <p className="text-[#a05046] italic text-lg">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f2e9]">
      <Header />
      <Navigation />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white p-8 rounded-lg border-2 border-[#9d7a9b] shadow-lg">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl text-[#a05046] italic font-medium">My Profile</h2>

            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center px-4 py-2 bg-[#9d7a9b] text-white italic rounded hover:bg-[#8a6a8a] transition-colors"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            ) : (
              <button
                onClick={() => setEditing(false)}
                className="flex items-center px-4 py-2 border border-[#9d7a9b] text-[#a05046] italic rounded hover:bg-gray-50 transition-colors"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
            )}
          </div>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>
          )}

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="bg-gray-100 p-6 rounded-lg border border-gray-200 text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#9d7a9b]">
                  <Image
                    src={currentUser.photoURL || "/placeholder.svg?height=200&width=200"}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="text-xl text-[#a05046] italic font-medium">
                  {userProfile.firstName} {userProfile.lastName}
                </h3>
                <p className="text-gray-500 italic">{currentUser.email}</p>

                <div className="mt-4 text-left">
                  <div className="flex items-center text-gray-600 mb-2">
                    <User className="h-4 w-4 mr-2" />
                    <span>Member since {new Date(userProfile.createdAt).toLocaleDateString()}</span>
                  </div>

                  {userProfile.phone && (
                    <div className="flex items-center text-gray-600 mb-2">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{userProfile.phone}</span>
                    </div>
                  )}

                  {userProfile.address && (
                    <div className="flex items-start text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 mt-1" />
                      <div>
                        <p>{userProfile.address}</p>
                        {userProfile.city && userProfile.zipCode && (
                          <p>
                            {userProfile.city}, {userProfile.zipCode}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              {editing ? (
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
                        className="w-full px-3 py-2 border-2 border-[#9d7a9b] rounded focus:outline-none focus:border-[#8a6a8a]"
                      />
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
                        className="w-full px-3 py-2 border-2 border-[#9d7a9b] rounded focus:outline-none focus:border-[#8a6a8a]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-[#a05046] italic mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-2 border-[#9d7a9b] rounded focus:outline-none focus:border-[#8a6a8a]"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-[#a05046] italic mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-2 border-[#9d7a9b] rounded focus:outline-none focus:border-[#8a6a8a]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-[#a05046] italic mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border-2 border-[#9d7a9b] rounded focus:outline-none focus:border-[#8a6a8a]"
                      />
                    </div>

                    <div>
                      <label htmlFor="zipCode" className="block text-[#a05046] italic mb-1">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border-2 border-[#9d7a9b] rounded focus:outline-none focus:border-[#8a6a8a]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center px-6 py-3 bg-[#9d7a9b] text-white italic rounded hover:bg-[#8a6a8a] transition-colors disabled:opacity-70"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl text-[#a05046] italic font-medium mb-4">Order History</h3>
                    {userProfile.orders && userProfile.orders.length > 0 ? (
                      <div className="space-y-4">
                        {userProfile.orders.map((order, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[#a05046] italic font-medium">Order #{order.id}</span>
                              <span className="text-gray-500 italic">{new Date(order.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">{order.items.length} items</span>
                              <span className="text-[#a05046] italic font-medium">${order.total.toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">You haven't placed any orders yet.</p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl text-[#a05046] italic font-medium mb-4">Favorite Items</h3>
                    {userProfile.favorites && userProfile.favorites.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {userProfile.favorites.map((item, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4 flex items-center">
                            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-4">
                              <Image
                                src={item.image || "/placeholder.svg?height=100&width=100"}
                                alt={item.name}
                                fill
                                className="object-cover object-center"
                              />
                            </div>
                            <div>
                              <h4 className="text-[#a05046] italic font-medium">{item.name}</h4>
                              <p className="text-gray-500 italic">${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">You don't have any favorite items yet.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <CartSlider />
    </div>
  )
}
