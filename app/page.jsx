import Image from "next/image"
import { CartSlider } from "@/components/cart-slider"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f2e9]">
      {/* Header */}
      <Header />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="px-6 py-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-3/4 pr-4">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {/* Kimbap */}
              <div className="border border-gray-300 relative">
                <div className="relative pt-[75%]">
                  {" "}
                  {/* 4:3 aspect ratio */}
                  <Image
                    src="/appetizers/kimbap.jpg"
                    alt="Kimbap"
                    fill
                    className="object-cover absolute inset-0"
                    
                  />
                </div>
                <div className="absolute bottom-0 left-0 bg-[#f5f2e9] bg-opacity-80 px-2 py-1 text-xl text-[#a05046] font-bold italic">
                  Kimbap
                </div>
              </div>

              {/* Tteokbokki */}
              <div className="border border-gray-300 relative">
                <div className="relative pt-[75%]">
                  {" "}
                  {/* 4:3 aspect ratio */}
                  <Image
                    src="/appetizers/tteokbokki.jpg"
                    alt="Tteokbokki"
                    fill
                    className="object-cover absolute inset-0"
                    
                  />
                </div>
                <div className="absolute bottom-0 left-0 bg-[#f5f2e9] bg-opacity-80 px-2 py-1 text-xl text-[#a05046] font-bold italic">
                  Tteokbokki
                </div>
              </div>

              {/* Korean Fried Chicken */}
              <div className="border border-gray-300 relative">
                <div className="relative pt-[75%]">
                  {" "}
                  {/* 4:3 aspect ratio */}
                  <Image
                    src="/appetizers/kfc.jpg"
                    alt="Korean Fried Chicken"
                    fill
                    className="object-cover absolute inset-0"
                    
                  />
                </div>
                <div className="absolute bottom-0 left-0 bg-[#f5f2e9] bg-opacity-80 px-2 py-1 text-xl text-[#a05046] font-bold italic">
                  Korean Fried Chicken
                </div>
              </div>

              {/* Mochi */}
              <div className="border border-gray-300 relative">
                <div className="relative pt-[75%]">
                  {" "}
                  {/* 4:3 aspect ratio */}
                  <Image
                    src="/desserts/mochi.jpg"
                    alt="Mochi"
                    fill
                    className="object-cover absolute inset-0"
                    
                  />
                </div>
                <div className="absolute bottom-0 left-0 bg-[#f5f2e9] bg-opacity-80 px-2 py-1 text-xl text-[#a05046] font-bold italic">
                  Mochi
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Images */}
          <div className="md:w-1/4 flex flex-col gap-4 mt-4 md:mt-0">
            {/* Tanghulu */}
            <div className="border border-gray-300 relative">
              <div className="relative pt-[100%]">
                {" "}
                {/* 1:1 aspect ratio */}
                <Image
                  src="/desserts/tanghulu.jpg"
                  alt="Tanghulu"
                  fill
                  className="object-cover absolute inset-0"
                  
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-[#f5f2e9] bg-opacity-80 px-2 py-1 text-xl text-[#a05046] font-bold italic">
                Tanghulu
              </div>
            </div>

            {/* Hotteok */}
            <div className="border border-gray-300 relative">
              <div className="relative pt-[100%]">
                {" "}
                {/* 1:1 aspect ratio */}
                <Image
                  src="/desserts/hotteok.jpg"
                  alt="Hotteok"
                  fill
                  className="object-cover absolute inset-0"
                  
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-[#f5f2e9] bg-opacity-80 px-2 py-1 text-xl text-[#a05046] font-bold italic">
                Hotteok
              </div>
            </div>
          </div>
        </div>
      </main>
      <CartSlider />
    </div>
  )
}


