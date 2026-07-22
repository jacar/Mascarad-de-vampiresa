import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jacomeovalle.com"),
  title: "¡Te invito a mis XV Años! 🦇 Johanny Chiquinquirá",
  description:
    "Estás cordialmente invitado a la celebración de mis XV Años. Una noche mágica bajo la temática de Mascarada Vampiresa. ¡No faltes este 19 de Septiembre!",
  keywords: [
    "XV Años",
    "Quinceañera",
    "Johanny Chiquinquirá",
    "Mascarada Vampiresa",
    "Invitación",
    "Fiesta",
  ],
  authors: [{ name: "Desarrollo Armando Ovalle", url: "https://www.jacomeovalle.com" }],
  openGraph: {
    title: "¡Te invito a mis XV Años! 🦇 Johanny Chiquinquirá",
    description:
      "Acompáñame a celebrar mis XV Años en una espectacular Mascarada Vampiresa. ¡Descubre todos los detalles aquí y confirma tu asistencia!",
    url: "https://www.jacomeovalle.com", // Replace with final deployment URL
    siteName: "XV Años Johanny",
    images: [
      {
        url: "/hero-image.png",
        width: 1200,
        height: 630,
        alt: "XV Años - Johanny Chiquinquirá",
      },
    ],
    locale: "es_VE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "¡Te invito a mis XV Años! 🦇 Johanny Chiquinquirá",
    description:
      "Acompáñame a celebrar mis XV Años en una espectacular Mascarada Vampiresa. ¡Descubre todos los detalles aquí!",
    images: ["/hero-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body
        className={`${cinzel.variable} ${cormorant.variable} antialiased bg-vampire-dark text-cream`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}