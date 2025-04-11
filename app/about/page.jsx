import Image from "next/image"
import Link from "next/link"
import { CartIcon } from "@/components/cart-icon"
import { CartSlider } from "@/components/cart-slider"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f5f2e9]">
      {/* Header */}
      <header className="relative flex justify-between items-center px-6 py-4 bg-[#f5f2e9]">
        <div className="flex items-center gap-4">
          <div className="relative w-24 h-24">
            <Image
              src="/MoonBin.png?height=100&width=100"
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
        <div className="flex items-center gap-2">
          <CartIcon />
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
      <main className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-3xl text-[#a05046] italic font-medium mb-8 text-center">About Moonbin&apos;s Seoul Food</h2>

        <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
          <div className="md:w-1/2">
            <Image
              src="/MoonbinRes.jpg?height=400&width=500"
              alt="Restaurant interior"
              width={500}
              height={400}
              className="rounded-lg border-2 border-[#9d7a9b]"
            />
          </div>
          <div className="md:w-1/2 space-y-4">
            <p className="text-[#a05046] italic text-lg">
              Founded in 2015, Moonbin&apos;s Seoul Food brings authentic Korean cuisine to your neighborhood. Our
              journey began when Chef Moonbin, after years of culinary training in Seoul, decided to share his passion
              for Korean food with the world.
            </p>
            <p className="text-[#a05046] italic text-lg">
              What started as a small food truck has now grown into multiple restaurant locations, each maintaining the
              same dedication to quality and authenticity that we began with.
            </p>
          </div>
        </div>

        <h3 className="text-2xl text-[#a05046] italic font-medium mb-4">Our Philosophy</h3>
        <p className="text-[#a05046] italic text-lg mb-8">
          At Moonbin&apos;s Seoul Food, we believe that food is more than just sustenance—it&apos;s a cultural
          experience. Every dish we serve is prepared with traditional techniques and authentic ingredients, bringing
          the true flavors of Korea to your table.
        </p>

        <h3 className="text-2xl text-[#a05046] italic font-medium mb-4">Our Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg border-2 border-[#9d7a9b]">
            <div className="aspect-square relative mb-3">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="Chef Moonbin"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <h4 className="text-xl text-[#a05046] italic font-medium text-center">Chef Moonbin</h4>
            <p className="text-[#a05046] italic text-center">Founder & Head Chef</p>
          </div>
          <div className="bg-white p-4 rounded-lg border-2 border-[#9d7a9b]">
            <div className="aspect-square relative mb-3">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="Soo-Jin Park"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <h4 className="text-xl text-[#a05046] italic font-medium text-center">Soo-Jin Park</h4>
            <p className="text-[#a05046] italic text-center">Executive Chef</p>
          </div>
          <div className="bg-white p-4 rounded-lg border-2 border-[#9d7a9b]">
            <div className="aspect-square relative mb-3">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="Ji-Woo Kim"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <h4 className="text-xl text-[#a05046] italic font-medium text-center">Ji-Woo Kim</h4>
            <p className="text-[#a05046] italic text-center">Pastry Chef</p>
          </div>
        </div>

        <h3 className="text-2xl text-[#a05046] italic font-medium mb-4">Our Ingredients</h3>
        <p className="text-[#a05046] italic text-lg">
          We source the freshest ingredients, importing specialty items directly from Korea to ensure authenticity. Our
          commitment to quality means we prepare everything in-house, from our kimchi to our special sauces.
        </p>
      </main>
      <CartSlider />
    </div>
  )
}

