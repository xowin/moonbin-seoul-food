"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "@/context/cart-context"

export function CartIcon() {
  const { toggleCart, getCartCount } = useCart()
  const itemCount = getCartCount()

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 text-[#a05046] hover:text-[#8a3a30] transition-colors"
      aria-label="Shopping cart"
    >
      <ShoppingBag className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#9d7a9b] text-white text-xs flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  )
}
