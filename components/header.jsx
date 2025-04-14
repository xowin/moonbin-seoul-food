"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { CartIcon } from "@/components/cart-icon"
import { useAuth } from "@/context/auth-context"
import { ChevronDown, User, LogOut, Heart, ShoppingBag } from "lucide-react"

export function Header() {
  const { currentUser, logout } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      // Redirect to home page after logout
      window.location.href = "/"
    } catch (error) {
      console.error("Failed to log out", error)
    }
  }

  return (
    <header className="relative flex justify-between items-center px-6 py-4 bg-[#f5f2e9]">
      <div className="flex items-center gap-4">
        <div className="relative w-24 h-24">
          <Image
            src="/MoonBin.png"
            alt="Moon logo"
            width={100}
            height={100}
            className="object-contain"
            onError={(e) => {
              e.target.src = "/placeholder.svg?height=100&width=100"
            }}
          />
        </div>
        <h1 className="text-4xl font-cursive italic text-[#333]">
          Welcome to
          <br />
          Moonbin&apos;s Seoul Food
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <CartIcon />

        {currentUser ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-4 py-2 text-[#a05046] border-2 border-[#9d7a9b] bg-white font-medium italic rounded-md"
            >
              <span className="hidden sm:inline">{currentUser.displayName || currentUser.email}</span>
              <User className="h-5 w-5" />
              <ChevronDown className="h-4 w-4" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-[#9d7a9b] rounded-md shadow-lg z-10">
                <div className="py-1">
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 text-[#a05046] hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    My Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="flex items-center px-4 py-2 text-[#a05046] hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    My Orders
                  </Link>
                  <Link
                    href="/favorites"
                    className="flex items-center px-4 py-2 text-[#a05046] hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Favorites
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-[#a05046] hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </header>
  )
}
