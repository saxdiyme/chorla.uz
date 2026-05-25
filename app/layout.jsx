import "./globals.css";

export const metadata = {
  title: "Chorla — Sotib ol va sot | Uzbekistan Marketplace",
  description:
    "Chorla.uz — O'zbekistondagi e'lonlar va auktsion bozori. Yangi, ishlatilgan va auktsion mahsulotlarini soting va sotib oling.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
