import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./providers/LanguageProvider";
import AppInitializer from "./components/AppInitializer"; // Importe o componente

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevPortfolio",
  description: "Meu portfólio de desenvolvedor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-900 text-white antialiased`}>
        {/* Div para as partículas */}
        <div className="particles" aria-hidden="true"></div>

        <LanguageProvider>
          {children}
        </LanguageProvider>

        {/* Componente que inicializa os scripts */}
        <AppInitializer />
      </body>
    </html>
  );
}