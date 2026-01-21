import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medusa Tattoo München – Premium Studio am Marienplatz",
  description: "Tattoo Studio direkt am Marienplatz. Fineline, Realistic & Cover-Ups. English spoken. Walk-ins willkommen in München Innenstadt.",
  keywords: "tattoo münchen, tattoo marienplatz, fineline tattoo münchen, english tattoo munich",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        {/* CRITICAL: JSON-LD Schema */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TattooParlor",
              "name": "Medusa Tattoo München",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Altheimer Eck 11",
                "addressLocality": "München",
                "postalCode": "80331",
                "addressCountry": "DE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 48.137,
                "longitude": 11.575
              },
              "areaServed": ["Altstadt-Lehel", "München Innenstadt", "Marienplatz"],
              "priceRange": "€€",
              "telephone": "+49-89-269313",
              "url": "https://www.muenchen-tattoo-studio.de",
              "sameAs": [
                "https://www.instagram.com/medusa_tattoo_munich",
                "https://www.facebook.com/medusatattoomunch"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
