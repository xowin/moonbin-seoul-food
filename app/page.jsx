"use client"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { CartSlider } from "@/components/cart-slider"
import { ArrowRight } from "lucide-react"

export default function Home() {
  // Featured dishes data
  const featuredDishes = [
    {
      id: 1,
      name: "Kimbap",
      description: "Seaweed rice rolls filled with vegetables and your choice of protein",
      image: "/appetizers/kimbap.jpg",
      category: "Appetizers",
    },
    {
      id: 2,
      name: "Tteokbokki",
      description: "Spicy rice cakes in a sweet and spicy gochujang sauce",
      image: "/appetizers/T.jpg",
      category: "Appetizers",
    },
    {
      id: 4,
      name: "Korean Fried Chicken",
      description: "Crispy double-fried chicken with your choice of sauce",
      image: "/appetizers/kfc.jpg",
      category: "Main Dishes",
    },
    {
      id: 8,
      name: "Mochi",
      description: "Chewy rice cakes with various sweet fillings",
      image: "/desserts/M.jpg",
      category: "Desserts",
    },
  ]

  // Seasonal specials
  const seasonalSpecials = [
    {
      id: 9,
      name: "Tanghulu",
      description: "Candied fruit skewers with a crunchy sugar coating",
      image: "/desserts/Tanghulu.jpg",
    },
    {
      id: 7,
      name: "Hotteok",
      description: "Sweet Korean pancakes filled with brown sugar, cinnamon, and nuts",
      image: "/desserts/hotteok.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-[#f5f2e9]">
      {/* Header */}
      <Header />

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative">
        <div className="bg-[#9d7a9b]/20 py-16">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-cursive italic text-[#a05046] mb-4">
                  Enjoy the taste of South Korea right in your hometown!
                </h1>
                <p className="text-[#a05046] italic mb-6 text-lg">
                  Our professional chefs have put together savory dishes such as tteokboki, kimbap, Korean fried
                  chicken, and sweet dishes such as mochi, tanghulu, and hotteok.
                </p>
                <Link
                  href="/menu"
                  className="inline-flex items-center px-6 py-3 bg-[#9d7a9b] text-white italic rounded-md hover:bg-[#8a6a8a] transition-colors"
                >
                  Explore Our Menu
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <div className="md:w-1/2 md:pl-10">
                <div className="relative rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/combos/bibimbap.jpg"
                    alt="Korean cuisine"
                    width={600}
                    height={400}
                    className="w-full h-[200px] md:h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="bg-[#9d7a9b] text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured Dish
                    </span>
                    <h3 className="text-white text-2xl font-bold mt-2">Bibimbap</h3>
                    <p className="text-white/90 italic">A colorful bowl of rice topped with vegetables and protein</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl text-[#a05046] italic font-medium">Popular Dishes</h2>
            <Link href="/menu" className="text-[#9d7a9b] italic hover:text-[#8a6a8a] flex items-center">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={dish.image || "bibimbap.jpg"}
                    alt={dish.name}
                    fill
                    className="object-cover"
                    
                  />
                  <div className="absolute top-2 right-2 bg-[#9d7a9b] text-white text-xs px-2 py-1 rounded-full">
                    {dish.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl text-[#a05046] italic font-medium">{dish.name}</h3>
                  <p className="text-gray-600 italic text-sm mt-1 line-clamp-2">{dish.description}</p>
                  <Link
                    href={`/menu#${dish.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="mt-3 inline-block text-[#9d7a9b] italic hover:text-[#8a6a8a]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Specials Section */}
      <section className="py-12 bg-[#9d7a9b]/10">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl text-[#a05046] italic font-medium mb-8 text-center">Seasonal Specials</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {seasonalSpecials.map((special) => (
              <div key={special.id} className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="md:w-1/2 relative">
                  <Image
                    src={special.image || "/placeholder.svg"}
                    alt={special.name}
                    width={400}
                    height={300}
                    className="w-full h-60 md:h-full object-cover"
                    
                  />
                </div>
                <div className="md:w-1/2 p-6 flex flex-col justify-center">
                  <h3 className="text-2xl text-[#a05046] italic font-medium mb-2">{special.name}</h3>
                  <p className="text-gray-600 italic mb-4">{special.description}</p>
                  <Link
                    href={`/menu#${special.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="inline-flex items-center text-[#9d7a9b] italic hover:text-[#8a6a8a]"
                  >
                    Try it today
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-[#a05046]/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl text-[#a05046] italic font-medium mb-4">
            Ready to experience authentic Korean flavors?
          </h2>
          <p className="text-[#a05046] italic mb-8 text-lg max-w-2xl mx-auto">
            Come sit down at a restaurant near you, or order online and bring South Korea right to your doorstep!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/menu"
              className="px-8 py-3 bg-[#9d7a9b] text-white italic rounded-md hover:bg-[#8a6a8a] transition-colors"
            >
              Order Online
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border-2 border-[#9d7a9b] text-[#a05046] italic rounded-md hover:bg-[#9d7a9b]/10 transition-colors"
            >
              Find a Location
            </Link>
          </div>
        </div>
      </section>

      {/* Cart Slider */}
      <CartSlider />
    </div>
  )
}


