import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | GoozX",
  description: "Learn about our mission to empower cross-border connections.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">About Us</h1>
      <p className="mt-4 text-gray-600">
        We are building modern, purpose-driven remittance experiences for the
        Ethiopian diaspora, enabling meaningful support back home through
        technology.
      </p>
    </main>
  );
}
