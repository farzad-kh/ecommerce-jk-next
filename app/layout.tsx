import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextAuthProvider from "./provider/NextAuthProvider";
import { ProvidersUI } from "./provider/NextUIProvider";
import Layout from "./components/layout/layout";
import WrappedQueryProvider from "./WrappedQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JACK & JONES - Men's Clothing",
  description: "Buy men's clothing at the JACK & JONES official online shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WrappedQueryProvider>
          <NextAuthProvider>
            <ProvidersUI>
              <Layout>{children}</Layout>
            </ProvidersUI>
          </NextAuthProvider>
        </WrappedQueryProvider>
      </body>
    </html>
  );
}
