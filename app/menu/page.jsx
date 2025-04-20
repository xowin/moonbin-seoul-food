"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { FoodModal } from "@/components/food-modal"
import { CartSlider } from "@/components/cart-slider"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/context/auth-context"
import { Heart } from "lucide-react"

export default function MenuPage() {
  const [selectedFood, setSelectedFood] = useState(null)
  const { currentUser, userProfile, addToFavorites, removeFromFavorites } = useAuth()
  const [favorites, setFavorites] = useState({})

  // Load favorites when user profile changes
  useEffect(() => {
    if (userProfile && userProfile.favorites) {
      const favMap = {}
      userProfile.favorites.forEach((item) => {
        favMap[item.id] = true
      })
      setFavorites(favMap)
    }
  }, [userProfile])

  const openFoodModal = (food) => {
    setSelectedFood(food)
  }

  const closeFoodModal = () => {
    setSelectedFood(null)
  }
  const toggleFavorite = async (e, food) => {
    e.stopPropagation() // Prevent opening the modal

    if (!currentUser) {
      alert("Please log in to add items to favorites")
      return
    }

    try {
      if (favorites[food.id]) {
        if (typeof removeFromFavorites === "function") {
        await removeFromFavorites(food.id)
        setFavorites((prev) => {
          const newFavorites = { ...prev }
          delete newFavorites[food.id]
          return newFavorites
        })
      } else {
        console.error("removeFromFavorites is not a function")
      }
      } else {
        if (typeof addToFavorites === "function") {
        await addToFavorites(food)
        setFavorites((prev) => ({
          ...prev,
          [food.id]: true,
        }))

      } else {
          console.error("addToFavorites is not a function")
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error)
    }
  }

  // Menu data
  const menuCategories = [
    {
      name: "Appetizers",
      items: [
        {
          id: 1,
          name: "Kimbap",
          image: "/appetizers/kimbap.jpg",
          description: "Seaweed rice rolls filled with vegetables, pickled radish, and your choice of protein.",
          price: 8.99,
        },
        {
          id: 2,
          name: "Tteokbokki",
          image: "/appetizers/T.jpg",
          description: "Spicy rice cakes cooked in a sweet and spicy gochujang sauce with fish cakes and scallions.",
          price: 10.99,
        },
        {
          id: 3,
          name: "Mandu",
          image: "/appetizers/mandu.jpg",
          description: "Korean dumplings filled with a mixture of ground meat, tofu, and vegetables.",
          price: 7.99,
        },
      ],
    },
    {
      name: "Combos",
      items: [
        {
          id: 4,
          name: "Korean Fried Chicken",
          image: "/appetizers/kfc.jpg?height=150&width=200",
          description:
            "Crispy double-fried chicken glazed with your choice of sauce: soy garlic, sweet spicy, or honey butter.",
          price: 15.99,
        },
        {
          id: 5,
          name: "Bibimbap",
          image: "/combos/bibimbap.jpg?height=150&width=200",
          description:
            "A bowl of warm rice topped with seasoned vegetables, gochujang, a fried egg, and your choice of protein.",
          price: 14.99,
        },
        {
          id: 6,
          name: "Bulgogi",
          image: "/combos/beef bulgolgi.jpg?height=150&width=200",
          description: "Thinly sliced marinated beef, stir-fried with onions and served with rice and banchan.",
          price: 16.99,
        },
      ],
    },
    {
      name: "Desserts",
      items: [
        {
          id: 7,
          name: "Hotteok",
          image: "/desserts/hotteok.jpg?height=150&width=200",
          description: "Sweet Korean pancakes filled with brown sugar, cinnamon, and nuts.",
          price: 5.99,
        },
        {
          id: 8,
          name: "Mochi",
          image: "/desserts/M.jpg?height=150&width=200",
          description: "Chewy rice cakes with various fillings including red bean, strawberry, and green tea.",
          price: 6.99,
        },
        {
          id: 9,
          name: "Tanghulu",
          image: "/desserts/Tanghulu.jpg?height=150&width=200",
          description: "Candied fruit skewers with a crunchy sugar coating.",
          price: 4.99,
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#f5f2e9]">
      {/* Header */}
      <Header />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-3xl text-[#a05046] italic font-medium mb-8 text-center">Our Menu</h2>

        {/* Menu Categories */}
        <div className="space-y-12">
          {menuCategories.map((category) => (
            <div key={category.name} className="space-y-6">
              <h3 className="text-2xl text-[#a05046] italic font-medium border-b-2 border-[#9d7a9b] pb-2">
                {category.name}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border-2 border-[#9d7a9b] p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow relative"
                    onClick={() => openFoodModal(item)}
                  >
                    {/*Favorite button*/}
                    <button
                      className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                      onClick={(e) => toggleFavorite(e, item)}
                    >
                      <Heart
                        className={`h-5 w-5 ${favorites[item.id] ? "fill-[#a05046] text-[#a05046]" : "text-gray-400"}`}
                      />
                    </button>
                    <div className="aspect-video relative mb-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded"
                      />
                    </div>
                    <h4 className="text-xl text-[#a05046] italic font-medium">{item.name}</h4>
                    <p className="text-[#a05046] italic">${item.price.toFixed(2)}</p>
                    <button
                      className="mt-2 px-4 py-1 bg-[#9d7a9b] text-white italic rounded hover:bg-[#8a6a8a] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        openFoodModal(item)
                      }}
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Food Modal */}
      {selectedFood && <FoodModal food={selectedFood} onClose={closeFoodModal} />}
      <CartSlider />
    </div>
  )
}

