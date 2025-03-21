"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { FoodModal } from "@/components/food-modal"

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
          image: "/placeholder.svg?height=150&width=200",
          description: "Seaweed rice rolls filled with vegetables, pickled radish, and your choice of protein.",
          price: 8.99,
        },
        {
          id: 2,
          name: "Tteokbokki",
          image: "/placeholder.svg?height=150&width=200",
          description: "Spicy rice cakes cooked in a sweet and spicy gochujang sauce with fish cakes and scallions.",
          price: 10.99,
        },
        {
          id: 3,
          name: "Mandu",
          image: "/placeholder.svg?height=150&width=200",
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
          image: "/placeholder.svg?height=150&width=200",
          description:
            "Crispy double-fried chicken glazed with your choice of sauce: soy garlic, sweet spicy, or honey butter.",
          price: 15.99,
        },
        {
          id: 5,
          name: "Bibimbap",
          image: "/placeholder.svg?height=150&width=200",
          description:
            "A bowl of warm rice topped with seasoned vegetables, gochujang, a fried egg, and your choice of protein.",
          price: 14.99,
        },
        {
          id: 6,
          name: "Bulgogi",
          image: "/placeholder.svg?height=150&width=200",
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
          image: "/placeholder.svg?height=150&width=200",
          description: "Sweet Korean pancakes filled with brown sugar, cinnamon, and nuts.",
          price: 5.99,
        },
        {
          id: 8,
          name: "Mochi",
          image: "/placeholder.svg?height=150&width=200",
          description: "Chewy rice cakes with various fillings including red bean, strawberry, and green tea.",
          price: 6.99,
        },
        {
          id: 9,
          name: "Tanghulu",
          image: "/placeholder.svg?height=150&width=200",
          description: "Candied fruit skewers with a crunchy sugar coating.",
          price: 4.99,
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#f5f2e9]">
      {/* Header */}
      <header className="relative flex justify-between items-center px-6 py-4 bg-[#f5f2e9]">
        <div className="flex items-center gap-4">
          <div className="relative w-24 h-24">
            <Image
              src="/placeholder.svg?height=100&width=100"
              alt="Moon logo"
              width={100}
              height={100}
              className="object-contain"
            />
            <div className="absolute bottom-0 text-xs text-center w-full text-[#333]">문빈의 서울 음식</div>
          </div>
          <h1 className="text-4xl font-cursive italic text-[#333]">
            Welcome to
            <br />
            Moonbin&apos;s Seoul Food
          </h1>
        </div>
        <div className="flex gap-2">
          <Link
            href="/signup"
            className="px-4 py-1 text-[#a05046] border-2 border-[#9d7a9b] bg-white font-medium italic"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="px-4 py-1 text-[#a05046] border-2 border-[#9d7a9b] bg-white font-medium italic"
          >
            Log In
          </Link>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-[#9d7a9b] py-3 px-6 flex justify-center gap-8">
        <Link href="/" className="px-8 py-2 bg-white text-[#a05046] text-2xl font-medium italic">
          Home
        </Link>
        <Link href="/about" className="px-8 py-2 bg-white text-[#a05046] text-2xl font-medium italic">
          About Us
        </Link>
        <Link href="/menu" className="px-8 py-2 bg-white text-[#a05046] text-2xl font-medium italic">
          Menu
        </Link>
        <Link href="/contact" className="px-8 py-2 bg-white text-[#a05046] text-2xl font-medium italic">
          Contact
        </Link>
      </nav>

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
    </div>
  )
}

