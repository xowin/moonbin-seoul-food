import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f2e9]">
      {/* Header */}
      <header
        className="relative flex justify-between items-center px-6 py-4 bg-[#f5f2e9]">
        <div className="flex items-center gap-4">
          <div className="relative w-24 h-24">
            <Image
              src="/placeholder.svg?height=100&width=100"
              alt="Moon logo"
              width={100}
              height={100}
              className="object-contain" />
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
            className="px-4 py-1 text-[#a05046] border-2 border-[#9d7a9b] bg-white font-medium italic">
            Sign Up
          </Link>
          <Link
            href="/login"
            className="px-4 py-1 text-[#a05046] border-2 border-[#9d7a9b] bg-white font-medium italic">
            Log In
          </Link>
        </div>
      </header>
      {/* Navigation */}
      <nav className="bg-[#9d7a9b] py-3 px-6 flex justify-center gap-8">
        <Link
          href="/"
          className="px-8 py-2 bg-white text-[#a05046] text-2xl font-medium italic">
          Home
        </Link>
        <Link
          href="/about"
          className="px-8 py-2 bg-white text-[#a05046] text-2xl font-medium italic">
          About Us
        </Link>
        <Link
          href="/menu"
          className="px-8 py-2 bg-white text-[#a05046] text-2xl font-medium italic">
          Menu
        </Link>
        <Link
          href="/contact"
          className="px-8 py-2 bg-white text-[#a05046] text-2xl font-medium italic">
          Contact
        </Link>
      </nav>
      {/* Main Content */}
      <main className="px-6 py-4">
        <div className="flex">
          <div className="w-3/4 pr-4">
            <h2 className="text-2xl text-[#a05046] italic mb-4">
              Enjoy the taste of South Korea right in your hometown!
            </h2>

            <p className="text-[#a05046] italic mb-4 text-lg">
              Our professional chefs have put together savory dishes such as tteokboki, kimbap, Korean fried chicken,
              and sweet dishes such as mochi, tanghulu, and hotteok.
            </p>

            <p className="text-[#a05046] italic mb-4 text-lg">
              With our wide variety of dishes from South Korea itself, there are many delicious foods that everyone will
              love.
            </p>

            <p className="text-[#a05046] italic mb-8 text-lg">
              Come sit down at a restaurant near you, or order online and bring South Korea right to your doorstep!
            </p>

            {/* Food Images Row */}
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="border border-gray-300">
                <Image
                  src="/placeholder.svg?height=150&width=200"
                  alt="Kimbap"
                  width={200}
                  height={150}
                  className="w-full h-auto" />
              </div>
              <div className="border border-gray-300">
                <Image
                  src="/placeholder.svg?height=150&width=200"
                  alt="Tteokbokki"
                  width={200}
                  height={150}
                  className="w-full h-auto" />
              </div>
              <div className="border border-gray-300">
                <Image
                  src="/placeholder.svg?height=150&width=200"
                  alt="Korean Fried Chicken"
                  width={200}
                  height={150}
                  className="w-full h-auto" />
              </div>
              <div className="border border-gray-300">
                <Image
                  src="/placeholder.svg?height=150&width=200"
                  alt="Mochi"
                  width={200}
                  height={150}
                  className="w-full h-auto" />
              </div>
            </div>
          </div>

          {/* Right Side Images */}
          <div className="w-1/4 flex flex-col gap-4">
            <div className="border border-gray-300">
              <Image
                src="/placeholder.svg?height=150&width=200"
                alt="Tanghulu"
                width={200}
                height={150}
                className="w-full h-auto" />
            </div>
            <div className="border border-gray-300">
              <Image
                src="/placeholder.svg?height=150&width=200"
                alt="Hotteok"
                width={200}
                height={150}
                className="w-full h-auto" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

