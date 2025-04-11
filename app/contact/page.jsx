"use client"

import { useState } from "react"
import { CartSlider } from "@/components/cart-slider"
import { CartIcon } from "@/components/cart-icon"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import Image from "next/image"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your server
    console.log("Form submitted:", formData)
    setFormSubmitted(true)

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    })

    // Reset submission message after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false)
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-[#f5f2e9]">
      {/* Header */}
      <Header />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-3xl text-[#a05046] italic font-medium mb-8 text-center">Contact Us</h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Contact Information */}
          <div className="md:w-1/2 space-y-6">
            <div>
              <h3 className="text-2xl text-[#a05046] italic font-medium mb-4">Our Locations</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-2 border-[#9d7a9b]">
                  <h4 className="text-xl text-[#a05046] italic font-medium">Downtown</h4>
                  <p className="text-[#a05046] italic">123 Main Street</p>
                  <p className="text-[#a05046] italic">Seoul District</p>
                  <p className="text-[#a05046] italic">Open: 11am - 10pm Daily</p>
                  <p className="text-[#a05046] italic">Phone: (555) 123-4567</p>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-[#9d7a9b]">
                  <h4 className="text-xl text-[#a05046] italic font-medium">Uptown</h4>
                  <p className="text-[#a05046] italic">456 Park Avenue</p>
                  <p className="text-[#a05046] italic">Gangnam District</p>
                  <p className="text-[#a05046] italic">Open: 11am - 11pm Daily</p>
                  <p className="text-[#a05046] italic">Phone: (555) 987-6543</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl text-[#a05046] italic font-medium mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                <a href="https://www.facebook.com" className="text-[#a05046] hover:text-[#8a3a30] transition-colors">
                  <div className="w-10 h-10 bg-[#9d7a9b] rounded-full flex items-center justify-center">
                    <Image 
                      src="/apps/facebook.png"
                      alt="Facebook"
                      width={24}
                      height={24}
                      className="text-white"
                    />
                  </div>
                </a>
                <a href="https://www.instagram.com" className="text-[#a05046] hover:text-[#8a3a30] transition-colors">
                  <div className="w-10 h-10 bg-[#9d7a9b] rounded-full flex items-center justify-center">
                    <Image
                      src="/apps/instagram.png"
                      alt="Instagram"
                      width={24}
                      height={24}
                      className="text-white"
                    />
                  </div>
                </a>
                <a href="https://www.x.com" className="text-[#a05046] hover:text-[#8a3a30] transition-colors">
                  <div className="w-10 h-10 bg-[#9d7a9b] rounded-full flex items-center justify-center">
                    <Image 
                      src="/apps/twitter.png"
                      alt="Twitter"
                      width={24}
                      height={24}
                      className="text-white"
                    />
                  </div>
                </a>
                <a href="https://www.youtube.com" className="text-[#a05046] hover:text-[#8a3a30] transition-colors">
                  <div className="w-10 h-10 bg-[#9d7a9b] rounded-full flex items-center justify-center">
                    <Image
                      src="/apps/youtube.png"
                      alt="YouTube"
                      width={24}
                      height={24}
                      className="text-white"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:w-1/2">
            <h3 className="text-2xl text-[#a05046] italic font-medium mb-4">Send Us a Message</h3>

            {formSubmitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                Thank you for your message! We&apos;ll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-[#a05046] italic mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border-2 border-[#9d7a9b] rounded focus:outline-none focus:border-[#8a6a8a]"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[#a05046] italic mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border-2 border-[#9d7a9b] rounded focus:outline-none focus:border-[#8a6a8a]"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-[#a05046] italic mb-1">
                  Phone (optional)
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
                <label htmlFor="message" className="block text-[#a05046] italic mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-3 py-2 border-2 border-[#9d7a9b] rounded focus:outline-none focus:border-[#8a6a8a]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-[#9d7a9b] text-white italic rounded hover:bg-[#8a6a8a] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <CartSlider />
    </div>
  )
}

