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
      <body>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
