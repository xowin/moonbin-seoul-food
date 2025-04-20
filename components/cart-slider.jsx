"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import Image from "next/image"
import { X, Minus, Plus, ShoppingBag, ArrowLeft, Check } from "lucide-react"

export function CartSlider() {
  const { cartItems, isCartOpen, closeCart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const { currentUser, userProfile, addOrder } = useAuth()

  const [checkoutStep, setCheckoutStep] = useState("cart") // cart, checkout, confirmation
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  })
  const [errors, setErrors] = useState({})
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [placedOrderId, setPlacedOrderId] = useState(null)

  // Pre-fill form with user profile data if available
  useEffect(() => {
    if (userProfile && checkoutStep === "checkout") {
      setFormData((prevData) => ({
        ...prevData,
        name: `${userProfile.firstName} ${userProfile.lastName}`,
        email: userProfile.email || "",
        address: userProfile.address || "",
        city: userProfile.city || "",
        zipCode: userProfile.zipCode || "",
        cardName: `${userProfile.firstName} ${userProfile.lastName}`,
      }))
    }
  }, [userProfile, checkoutStep])

  if (!isCartOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required"
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required"
    else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) newErrors.cardNumber = "Invalid card number"
    if (!formData.cardName.trim()) newErrors.cardName = "Name on card is required"
    if (!formData.expiry.trim()) newErrors.expiry = "Expiry date is required"
    else if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) newErrors.expiry = "Use MM/YY format"
    if (!formData.cvv.trim()) newErrors.cvv = "CVV is required"
    else if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = "Invalid CVV"

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
      // Create order data
      const orderData = {
        items: cartItems,
        total: getCartTotal(),
        customer: {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
        },
        paymentMethod: "Credit Card",
        paymentDetails: {
          last4: formData.cardNumber.slice(-4),
        },
      }

      // Save order to user profile if logged in
      if (currentUser && typeof addOrder === "function") {
        const order = await addOrder(orderData)
        if (order) {
          setPlacedOrderId(order.id)
        }
      } else {
        // Generate a random order ID for non-logged in users
        setPlacedOrderId(`ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`)
        console.log("User not logged in or addOrder function not available")
      }


      setOrderPlaced(true)
      // Move to confirmation step
      setCheckoutStep("confirmation")
    } catch (error) {
      console.error("Error placing order:", error)
      // Show error to user
      setErrors({ submit: "Failed to place order. Please try again." })
    }
  }

  const handleBackToCart = () => {
    setCheckoutStep("cart")
  }

  const handleStartNewOrder = () => {
    clearCart()
    setCheckoutStep("cart")
    setFormData({
      name: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvv: "",
    })
    setOrderPlaced(false)
    setPlacedOrderId(null)
    closeCart()
  }

  const renderCartItems = () => (
    <>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <ShoppingBag className="h-6 w-6 text-[#a05046] mr-2" />
          <h2 className="text-xl font-medium text-[#a05046] italic">Your Cart</h2>
        </div>
        <button onClick={closeCart} className="p-1 rounded-full hover:bg-gray-100">
          <X className="h-6 w-6 text-gray-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-lg text-gray-500 italic">Your cart is empty</p>
            <button
              onClick={closeCart}
              className="mt-4 px-4 py-2 bg-[#9d7a9b] text-white italic rounded hover:bg-[#8a6a8a] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.id} className="py-4 flex">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover object-center"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=100&width=100"
                    }}
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-[#a05046]">
                      <h3 className="italic">{item.name}</h3>
                      <p className="ml-4 italic">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 italic line-clamp-2">{item.description}</p>
                  </div>

                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full bg-[#9d7a9b] text-white"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="mx-2 text-gray-700">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full bg-[#9d7a9b] text-white"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="font-medium text-[#a05046] hover:text-[#8a3a30] italic"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="border-t border-gray-200 p-4">
          <div className="flex justify-between text-base font-medium text-[#a05046] mb-4">
            <p className="italic">Subtotal</p>
            <p className="italic">${getCartTotal().toFixed(2)}</p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={clearCart}
              className="flex-1 px-6 py-3 border border-[#9d7a9b] text-[#a05046] italic rounded hover:bg-gray-50 transition-colors"
            >
              Clear Cart
            </button>
            <button
              onClick={() => setCheckoutStep("checkout")}
              className="flex-1 px-6 py-3 bg-[#9d7a9b] text-white italic rounded hover:bg-[#8a6a8a] transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </>
  )

  const renderCheckoutForm = () => (
    <>
      <div className="flex items-center p-4 border-b border-gray-200">
        <button onClick={handleBackToCart} className="p-1 mr-2 rounded-full hover:bg-gray-100">
          <ArrowLeft className="h-5 w-5 text-[#a05046]" />
        </button>
        <h2 className="text-xl font-medium text-[#a05046] italic">Checkout</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-[#a05046] italic mb-3">Order Summary</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between py-1">
                  <span className="text-sm text-gray-600 italic">
                    {item.quantity} × {item.name}
                  </span>
                  <span className="text-sm font-medium text-[#a05046] italic">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between">
                <span className="font-medium text-[#a05046] italic">Total</span>
                <span className="font-medium text-[#a05046] italic">${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-[#a05046] italic mb-3">Shipping Information</h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-sm text-[#a05046] italic mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.name ? "border-red-500" : "border-[#9d7a9b]"
                  } rounded focus:outline-none focus:border-[#8a6a8a]`}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-[#a05046] italic mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-[#9d7a9b]"
                  } rounded focus:outline-none focus:border-[#8a6a8a]`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm text-[#a05046] italic mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.address ? "border-red-500" : "border-[#9d7a9b]"
                  } rounded focus:outline-none focus:border-[#8a6a8a]`}
                />
                {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="city" className="block text-sm text-[#a05046] italic mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${
                      errors.city ? "border-red-500" : "border-[#9d7a9b]"
                    } rounded focus:outline-none focus:border-[#8a6a8a]`}
                  />
                  {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm text-[#a05046] italic mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${
                      errors.zipCode ? "border-red-500" : "border-[#9d7a9b]"
                    } rounded focus:outline-none focus:border-[#8a6a8a]`}
                  />
                  {errors.zipCode && <p className="mt-1 text-xs text-red-500">{errors.zipCode}</p>}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-[#a05046] italic mb-3">Payment Information</h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="cardNumber" className="block text-sm text-[#a05046] italic mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full px-3 py-2 border ${
                    errors.cardNumber ? "border-red-500" : "border-[#9d7a9b]"
                  } rounded focus:outline-none focus:border-[#8a6a8a]`}
                />
                {errors.cardNumber && <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>}
              </div>

              <div>
                <label htmlFor="cardName" className="block text-sm text-[#a05046] italic mb-1">
                  Name on Card
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.cardName ? "border-red-500" : "border-[#9d7a9b]"
                  } rounded focus:outline-none focus:border-[#8a6a8a]`}
                />
                {errors.cardName && <p className="mt-1 text-xs text-red-500">{errors.cardName}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="expiry" className="block text-sm text-[#a05046] italic mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className={`w-full px-3 py-2 border ${
                      errors.expiry ? "border-red-500" : "border-[#9d7a9b]"
                    } rounded focus:outline-none focus:border-[#8a6a8a]`}
                  />
                  {errors.expiry && <p className="mt-1 text-xs text-red-500">{errors.expiry}</p>}
                </div>

                <div>
                  <label htmlFor="cvv" className="block text-sm text-[#a05046] italic mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    className={`w-full px-3 py-2 border ${
                      errors.cvv ? "border-red-500" : "border-[#9d7a9b]"
                    } rounded focus:outline-none focus:border-[#8a6a8a]`}
                  />
                  {errors.cvv && <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>}
                </div>
              </div>
            </div>
          </div>

          {errors.submit && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{errors.submit}</div>
          )}
        </form>
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex justify-between text-base font-medium text-[#a05046] mb-4">
          <p className="italic">Total</p>
          <p className="italic">${getCartTotal().toFixed(2)}</p>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleBackToCart}
            className="flex-1 px-6 py-3 border border-[#9d7a9b] text-[#a05046] italic rounded hover:bg-gray-50 transition-colors"
          >
            Back to Cart
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-[#9d7a9b] text-white italic rounded hover:bg-[#8a6a8a] transition-colors"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  )

  const renderConfirmation = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-xl font-medium text-[#a05046] italic">Order Confirmation</h2>
        <button onClick={closeCart} className="p-1 rounded-full hover:bg-gray-100">
          <X className="h-6 w-6 text-gray-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center text-center">
        <div className="bg-green-100 rounded-full p-4 mb-4">
          <Check className="h-12 w-12 text-green-600" />
        </div>
        <h3 className="text-2xl font-medium text-[#a05046] italic mb-2">Thank You!</h3>
        <p className="text-lg text-[#a05046] italic mb-6">Your order has been placed successfully.</p>

        <div className="bg-gray-50 p-4 rounded-md w-full mb-6">
          <h4 className="text-lg font-medium text-[#a05046] italic mb-2">Order Summary</h4>
          <p className="text-sm text-gray-600 italic mb-1">
            Order #:{" "}
            {placedOrderId ||
              Math.floor(Math.random() * 10000)
                .toString()
                .padStart(4, "0")}
          </p>
          <p className="text-sm text-gray-600 italic mb-3">Date: {new Date().toLocaleDateString()}</p>

          <div className="border-t border-gray-200 pt-2 mb-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between py-1">
                <span className="text-sm text-gray-600 italic">
                  {item.quantity} × {item.name}
                </span>
                <span className="text-sm font-medium text-[#a05046] italic">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-2 flex justify-between">
            <span className="font-medium text-[#a05046] italic">Total</span>
            <span className="font-medium text-[#a05046] italic">${getCartTotal().toFixed(2)}</span>
          </div>
        </div>

        <p className="text-gray-600 italic mb-6">A confirmation email has been sent to {formData.email}</p>

        <button
          onClick={handleStartNewOrder}
          className="px-6 py-3 bg-[#9d7a9b] text-white italic rounded hover:bg-[#8a6a8a] transition-colors"
        >
          Start New Order
        </button>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-50" onClick={closeCart}>
      <div
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl border-l border-gray-200 flex flex-col z-50"
        onClick={(e) => e.stopPropagation()}
      >
        {checkoutStep === "cart" && renderCartItems()}
        {checkoutStep === "checkout" && renderCheckoutForm()}
        {checkoutStep === "confirmation" && renderConfirmation()}
      </div>
    </div>
  )
}
