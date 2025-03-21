"use client"

import { useState } from "react"
import Image from "next/image"

export function FoodModal({ food, onClose }) {
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const addToCart = () => {
    // Here you would implement your cart functionality
    alert(`Added ${quantity} ${food.name}(s) to cart!`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video">
          <Image src={food.image || "/placeholder.svg"} alt={food.name} fill className="object-cover rounded-t-lg" />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl text-[#a05046] italic font-medium">{food.name}</h3>
            <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
              ✕
            </button>
          </div>

          <p className="text-[#a05046] italic mb-4">{food.description}</p>

          <div className="text-xl text-[#a05046] italic font-medium mb-6">${food.price.toFixed(2)}</div>

          <div className="flex items-center mb-6">
            <span className="text-[#a05046] italic mr-4">Quantity:</span>
            <button className="w-8 h-8 bg-[#9d7a9b] text-white rounded-full" onClick={decreaseQuantity}>
              -
            </button>
            <span className="mx-4 text-[#a05046] italic">{quantity}</span>
            <button className="w-8 h-8 bg-[#9d7a9b] text-white rounded-full" onClick={increaseQuantity}>
              +
            </button>
          </div>

          <button
            className="w-full py-2 bg-[#9d7a9b] text-white italic rounded hover:bg-[#8a6a8a] transition-colors"
            onClick={addToCart}
          >
            Add to Cart - ${(food.price * quantity).toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  )
}

