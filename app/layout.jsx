import "./globals.css"
import { CartProvider } from "@/context/cart-context"
import { AuthProvider } from "@/context/auth-context"

export const metadata = {
  title: "Moonbin's Seoul Food",
  description: "Enjoy the taste of South Korea right in your hometown!",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>
            {children}
            <footer className="bg-[#f5f2e9] border-t border-gray-300 py-4 px-6 text-center text-sm text-gray-500">
              <p>
                ⚠️ <strong>Disclaimer:</strong> This is a mock-up website created as a college project. Please{" "}
                <strong>do not enter real credit card or personal payment information.</strong> No real transactions will
                be processed.
              </p>
            </footer>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
