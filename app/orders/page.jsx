"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/context/auth-context"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { CartSlider } from "@/components/cart-slider"
import { ShoppingBag, Clock, Calendar, CreditCard } from "lucide-react"

export default function OrdersPage() {
  const router = useRouter()
  const { currentUser, userProfile } = useAuth()

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      router.push("/login")
    }
  }, [currentUser, router])

  if (!currentUser || !userProfile) {
    return (
      <div className="min-h-screen bg-[#f5f2e9]">
        <Header />
        <Navigation />
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <p className="text-[#a05046] italic text-lg">Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f2e9]">
      <Header />
      <Navigation />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl text-[#a05046] italic font-medium mb-8">My Orders</h2>

        {userProfile.orders && userProfile.orders.length > 0 ? (
          <div className="space-y-8">
            {userProfile.orders.map((order, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border-2 border-[#9d7a9b] shadow-md">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <div className="flex items-center">
                      <ShoppingBag className="h-5 w-5 text-[#a05046] mr-2" />
                      <h3 className="text-xl text-[#a05046] italic font-medium">Order #{order.id}</h3>
                    </div>
                    <div className="flex items-center mt-2 text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(order.date).toLocaleDateString()}</span>
                      <Clock className="h-4 w-4 ml-4 mr-2" />
                      <span>{new Date(order.date).toLocaleTimeString()}</span>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-0">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {order.status || "Delivered"}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-lg text-[#a05046] italic font-medium mb-2">Items</h4>
                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-4">
                          <Image
                            src={item.image || "/placeholder.svg?height=100&width=100"}
                            alt={item.name}
                            fill
                            className="object-cover object-center"
                          />
                        </div>
                        <div className="flex-1">
                          <h5 className="text-[#a05046] italic font-medium">{item.name}</h5>
                          <p className="text-gray-500 italic text-sm">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-[#a05046] italic font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-gray-200">
                  <div className="flex items-center text-gray-600">
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span>Payment: {order.paymentMethod || "Credit Card"}</span>
                  </div>

                  <div className="mt-4 sm:mt-0 text-right">
                    <div className="text-gray-500 italic">Total</div>
                    <div className="text-xl text-[#a05046] italic font-medium">${order.total.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-lg border-2 border-[#9d7a9b] shadow-md text-center">
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl text-[#a05046] italic font-medium mb-2">No Orders Yet</h3>
            <p className="text-gray-500 italic mb-6">You haven't placed any orders yet.</p>
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
