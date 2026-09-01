import type { Metadata } from "next";
import { Baloo_Da_2, Hind_Siliguri } from "next/font/google";
import "./globals.css";

// Display face — headlines only. Warm, rounded, has real Bengali+Latin
// character instead of a generic geometric sans.
const balooDa2 = Baloo_Da_2({
  variable: "--font-baloo",
  subsets: ["bengali", "latin"],
  weight: ["500", "600", "700", "800"],
});

// Body face — restrained and clean, deliberately distinct from the
// display face so the pairing reads as a choice, not a default.
const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Nur Delights Cafe | Order Online (COD)",
  description:
    "Order your favorite Bangladeshi food online — Cash on Delivery.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${balooDa2.variable} ${hindSiliguri.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-neutral-950 text-neutral-100">
        {children}
      </body>
    </html>
  );
}
