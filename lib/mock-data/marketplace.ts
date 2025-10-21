import { mockServiceProviders } from "../mock-data";

// Export existing service providers from main mock-data file
export { mockServiceProviders } from "../mock-data";

// Marketplace categories for filtering
export const mockMarketplaceCategories = [
  "All",
  "Education",
  "Healthcare",
  "Utilities",
  "Rent",
  "Groceries",
  "Telecom",
  "Insurance",
  "Transportation",
  "Entertainment",
  "Other",
];

// Extended service provider interface for marketplace
export interface MarketplaceServiceProvider {
  id: string;
  name: string;
  category: string;
  logoUrl: string;
  description: string;
  accountNumberLabel: string;
  accountNumberPlaceholder: string;
  verified: boolean;
  rating: number;
  processingTime: string;
  supportedAmountRange: {
    min: number;
    max: number;
  };
}

// Enhanced marketplace service providers with additional details
export const marketplaceServiceProviders: MarketplaceServiceProvider[] = [
  {
    id: "1",
    name: "Addis Ababa University",
    category: "Education",
    logoUrl: "/generic-university-logo.png",
    description:
      "Pay tuition fees, student services, and educational expenses for students at Addis Ababa University.",
    accountNumberLabel: "Student ID",
    accountNumberPlaceholder: "Enter student ID number",
    verified: true,
    rating: 4.8,
    processingTime: "1-2 business days",
    supportedAmountRange: { min: 10, max: 50000 },
  },
  {
    id: "2",
    name: "Black Lion Hospital",
    category: "Healthcare",
    logoUrl: "/hospital-logo.png",
    description:
      "Pay medical bills, consultation fees, and healthcare services at Ethiopia's premier hospital.",
    accountNumberLabel: "Patient ID",
    accountNumberPlaceholder: "Enter patient ID or medical record number",
    verified: true,
    rating: 4.6,
    processingTime: "Same day",
    supportedAmountRange: { min: 5, max: 100000 },
  },
  {
    id: "3",
    name: "Ethiopian Electric Utility",
    category: "Utilities",
    logoUrl: "/electric-utility-logo.jpg",
    description:
      "Pay electricity bills for residential and commercial properties across Ethiopia.",
    accountNumberLabel: "Account Number",
    accountNumberPlaceholder: "Enter your electricity account number",
    verified: true,
    rating: 4.5,
    processingTime: "1 business day",
    supportedAmountRange: { min: 10, max: 50000 },
  },
  {
    id: "4",
    name: "Ethio Telecom",
    category: "Telecom",
    logoUrl: "/abstract-telecom-logo.png",
    description:
      "Top up mobile credit, pay phone bills, and purchase data packages for loved ones.",
    accountNumberLabel: "Phone Number",
    accountNumberPlaceholder: "Enter Ethiopian phone number",
    verified: true,
    rating: 4.4,
    processingTime: "Instant",
    supportedAmountRange: { min: 1, max: 10000 },
  },
  {
    id: "5",
    name: "Awash Insurance",
    category: "Insurance",
    logoUrl: "/insurance-logo.png",
    description:
      "Pay insurance premiums for health, life, and property insurance policies.",
    accountNumberLabel: "Policy Number",
    accountNumberPlaceholder: "Enter insurance policy number",
    verified: true,
    rating: 4.7,
    processingTime: "1-3 business days",
    supportedAmountRange: { min: 25, max: 25000 },
  },
  {
    id: "6",
    name: "Anbessa City Bus",
    category: "Transportation",
    logoUrl: "/bus-logo.png",
    description:
      "Purchase monthly transport passes and pay for public transportation services.",
    accountNumberLabel: "Card Number",
    accountNumberPlaceholder: "Enter transport card number",
    verified: true,
    rating: 4.2,
    processingTime: "Same day",
    supportedAmountRange: { min: 5, max: 5000 },
  },
];
