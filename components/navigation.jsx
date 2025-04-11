import Link from "next/link"

export function Navigation() {
  return (
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
  )
}
