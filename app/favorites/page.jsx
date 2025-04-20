"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/context/auth-context"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { CartSlider } from "@/components/cart-slider"
import { Heart, ShoppingCart } from "lucide-react"
import { useCart } from "@/context/cart-context"

export default function FavoritesPage() {
  const router = useRouter()
  const { currentUser, userProfile, updateUserProfile, loading } = useAuth()
  const { addToCart } = useCart()

  // Update the useEffect to better handle redirects
  useEffect(() => {
    if (!currentUser && !loading) {
      router.push("/login")
    }
  }, [currentUser, router, loading])

  const handleRemoveFavorite = async (itemId) => {
    if (!userProfile || !userProfile.favorites) return

    try {
      const updatedFavorites = userProfile.favorites.filter((item) => item.id !== itemId)
      await updateUserProfile({ favorites: updatedFavorites })
    } catch (error) {
      console.error("Error removing favorite:", error)
    }
  }

  const handleAddToCart = (item) => {
    addToCart(item, 1)
  }

  // Replace the loading check with a more robust one
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f2e9]">
        <Header />
        <Navigation />
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <p className="text-[#a05046] italic text-lg">Loading favorites...</p>
        </div>
      </div>
    )
  }

  // If not loading but no user, redirect (this is a fallback)
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#f5f2e9]">
        <Header />
        <Navigation />
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <p className="text-[#a05046] italic text-lg">Please log in to view your favorites.</p>
          <button
            onClick={() => router.push("/login")}
            className="mt-4 px-6 py-2 bg-[#9d7a9b] text-white italic rounded hover:bg-[#8a6a8a] transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  // If user exists but no profile, show a default view with empty favorites
  if (!userProfile) {
    const emptyProfile = { favorites: [] }
    return (
      <div className="min-h-screen bg-[#f5f2e9]">
        <Header />
        <Navigation />
        <main className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-3xl text-[#a05046] italic font-medium mb-8">My Favorites</h2>
          <div className="bg-white p-12 rounded-lg border-2 border-[#9d7a9b] shadow-md text-center">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl text-[#a05046] italic font-medium mb-2">No Favorites Yet</h3>
            <p className="text-gray-500 italic mb-6">You haven't added any items to your favorites yet.</p>
            <button
              onClick={() => router.push("/menu")}
              className="px-6 py-3 bg-[#9d7a9b] text-white italic rounded hover:bg-[#8a6a8a] transition-colors"
            >
              Browse Menu
            </button>
          </div>
        </main>
        <CartSlider />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f2e9]">
      <Header />
      <Navigation />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl text-[#a05046] italic font-medium mb-8">My Favorites</h2>

        {userProfile.favorites && userProfile.favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userProfile.favorites.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg border-2 border-[#9d7a9b] shadow-md">
                <div className="relative w-full pt-[75%] mb-3 overflow-hidden rounded">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover absolute inset-0"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=200&width=300"
                    }}
                  />
                </div>

                <h3 className="text-xl text-[#a05046] italic font-medium">{item.name}</h3>
                <p className="text-[#a05046] italic mb-2">${item.price.toFixed(2)}</p>
                <p className="text-gray-500 italic text-sm line-clamp-2 mb-4">{item.description}</p>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleRemoveFavorite(item.id)}
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-[#9d7a9b] text-[#a05046] italic rounded hover:bg-gray-50 transition-colors"
                  >
                    <Heart className="h-4 w-4 mr-2 fill-current" />
                    Remove
                  </button>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-[#9d7a9b] text-white italic rounded hover:bg-[#8a6a8a] transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-lg border-2 border-[#9d7a9b] shadow-md text-center">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl text-[#a05046] italic font-medium mb-2">No Favorites Yet</h3>
            <p className="text-gray-500 italic mb-6">You haven't added any items to your favorites yet.</p>
            <button
              onClick={() => router.push("/menu")}
              className="px-6 py-3 bg-[#9d7a9b] text-white italic rounded hover:bg-[#8a6a8a] transition-colors"
            >
              Browse Menu
            </button>
          </div>
        )}
      </main>

      <CartSlider />
    </div>
  )
}
