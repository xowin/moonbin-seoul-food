import "./globals.css"

export const metadata = {
  title: "Moonbin's Seoul Food",
  description: "Enjoy the taste of South Korea right in your hometown!",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

