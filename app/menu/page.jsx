"use client"

import { useState } from "react"
import Image from "next/image"
import { FoodModal } from "@/components/food-modal"
import { CartSlider } from "@/components/cart-slider"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"

export default function MenuPage() {
  const [selectedFood, setSelectedFood] = useState(null)

  const openFoodModal = (food) => {
    setSelectedFood(food)
  }

  const closeFoodModal = () => {
    setSelectedFood(null)
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
          image: "/appetizers/tteobokki.jpg",
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
          image: "/desserts/mochi.jpg?height=150&width=200",
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
                    className="bg-white border-2 border-[#9d7a9b] p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => openFoodModal(item)}
                  >
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

