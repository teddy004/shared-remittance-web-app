export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  nationality: string;
  dateOfBirth: string;
  kycStatus: "pending" | "verified" | "rejected";
  avatar?: string;
}

export interface Recipient {
  id: string;
  name: string;
  phone: string;
  email?: string;
  accountNumber: string;
  accountType: "bank" | "mobile_wallet";
  country: string;
  countryCode: string;
  isFavorite: boolean;
  avatar?: string;
}

export interface Transaction {
  id: string;
  type: "sent" | "received" | "request";
  recipientId?: string;
  recipientName: string;
  amount: number;
  currency: "USD" | "ETB";
  status: "completed" | "pending" | "failed";
  date: string;
  fee?: number;
  exchangeRate?: number;
  message?: string;
  referenceNumber?: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  category: "education" | "healthcare" | "utilities" | "rent" | "groceries";
  logo: string;
  verified: boolean;
  rating: number;
}

export interface InvestmentProduct {
  id: string;
  name: string;
  description: string;
  yield: number;
  term: string;
  minimumInvestment: number;
  riskLevel: "low" | "medium" | "high";
  fundingProgress: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  priceUSD: number;
  priceETB: number;
  category: "groceries" | "electronics" | "gift_cards" | "health" | "education";
  image: string;
  deliveryType: "pickup" | "home_delivery" | "both";
}

export interface MoneyRequest {
  id: string;
  fromName: string;
  fromEmail: string;
  fromAvatar?: string;
  amount: number;
  purpose: string;
  description?: string;
  status: "pending" | "completed" | "cancelled";
  dueDate: string;
  createdAt: string;
}

export interface Investment {
  id: string;
  name: string;
  type: string;
  amount: number;
  purchaseDate: string;
  maturityDate: string;
  expectedReturn: string;
  currentValue: number;
  status: "active" | "matured" | "pending";
}

export interface GiftOrder {
  id: string;
  productName: string;
  recipientName: string;
  recipientPhone: string;
  amount: number;
  status: "processing" | "shipped" | "delivered";
  orderDate: string;
  deliveryDate?: string;
}

// Mock current user
export const mockUser: User = {
  id: "1",
  name: "Abebe Kebede",
  email: "abebe.kebede@example.com",
  phone: "+1-555-0123",
  country: "United States",
  nationality: "Ethiopian",
  dateOfBirth: "1985-03-15",
  kycStatus: "verified",
  avatar: "/ethiopian-man-avatar.jpg",
};

// Mock recipients
export const mockRecipients: Recipient[] = [
  {
    id: "1",
    name: "Tigist Alemu",
    phone: "+251-911-234567",
    accountNumber: "1000123456789",
    accountType: "bank",
    country: "Ethiopia",
    countryCode: "ET",
    isFavorite: true,
    avatar: "/ethiopian-woman-avatar.jpg",
  },
  {
    id: "2",
    name: "Dawit Tesfaye",
    phone: "+251-922-345678",
    accountNumber: "0911234567",
    accountType: "mobile_wallet",
    country: "Ethiopia",
    countryCode: "ET",
    isFavorite: true,
    avatar: "/ethiopian-man-avatar-2.jpg",
  },
  {
    id: "3",
    name: "Meron Haile",
    phone: "+251-933-456789",
    accountNumber: "1000987654321",
    accountType: "bank",
    country: "Ethiopia",
    countryCode: "ET",
    isFavorite: false,
    avatar: "/ethiopian-woman-avatar-2.jpg",
  },
];

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "sent",
    recipientId: "1",
    recipientName: "Tigist Alemu",
    amount: 20,
    currency: "USD",
    status: "completed",
    date: "2025-01-05T14:30:00Z",
    fee: 2.99,
    exchangeRate: 56.8,
    message: "For groceries",
    referenceNumber: "ZMN-2025-001234",
  },
  {
    id: "2",
    type: "sent",
    recipientId: "2",
    recipientName: "Dawit Tesfaye",
    amount: 15,
    currency: "USD",
    status: "completed",
    date: "2025-01-03T10:15:00Z",
    fee: 2.99,
    exchangeRate: 56.75,
    message: "Mobile credit",
    referenceNumber: "ZMN-2025-001189",
  },
  {
    id: "3",
    type: "sent",
    recipientId: "3",
    recipientName: "Meron Haile",
    amount: 10,
    currency: "USD",
    status: "completed",
    date: "2025-01-01T15:45:00Z",
    fee: 2.99,
    exchangeRate: 56.82,
    message: "School supplies",
    referenceNumber: "ZMN-2025-001256",
  },
  {
    id: "4",
    type: "received",
    recipientName: "Demo Top-up",
    amount: 50,
    currency: "USD",
    status: "completed",
    date: "2025-01-02T16:45:00Z",
    referenceNumber: "ZMN-2025-001145",
  },
  {
    id: "5",
    type: "sent",
    recipientId: "1",
    recipientName: "Tigist Alemu",
    amount: 25,
    currency: "USD",
    status: "completed",
    date: "2024-12-28T11:20:00Z",
    fee: 2.99,
    exchangeRate: 56.7,
    message: "Medical expenses",
    referenceNumber: "ZMN-2024-009876",
  },
];

// Mock service providers
export const mockServiceProviders: ServiceProvider[] = [
  {
    id: "1",
    name: "Addis Ababa University",
    category: "education",
    logo: "/generic-university-logo.png",
    verified: true,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Black Lion Hospital",
    category: "healthcare",
    logo: "/hospital-logo.png",
    verified: true,
    rating: 4.6,
  },
  {
    id: "3",
    name: "Ethiopian Electric Utility",
    category: "utilities",
    logo: "/electric-utility-logo.jpg",
    verified: true,
    rating: 4.5,
  },
  {
    id: "4",
    name: "Ethio Telecom",
    category: "utilities",
    logo: "/abstract-telecom-logo.png",
    verified: true,
    rating: 4.4,
  },
];

// Mock investment products
export const mockInvestmentProducts: InvestmentProduct[] = [
  {
    id: "1",
    name: "Ethiopian Diaspora Bond 2025",
    description:
      "Support Ethiopia's development while earning competitive returns. Government-backed security.",
    yield: 7.5,
    term: "5 years",
    minimumInvestment: 1000,
    riskLevel: "low",
    fundingProgress: 68,
  },
  {
    id: "2",
    name: "Real Estate Development Fund",
    description:
      "Invest in residential and commercial properties in Addis Ababa and major cities.",
    yield: 9.2,
    term: "3 years",
    minimumInvestment: 5000,
    riskLevel: "medium",
    fundingProgress: 45,
  },
  {
    id: "3",
    name: "SME Financing Portfolio",
    description:
      "Support small and medium enterprises across Ethiopia with microfinance lending.",
    yield: 11.5,
    term: "2 years",
    minimumInvestment: 500,
    riskLevel: "medium",
    fundingProgress: 82,
  },
];

// Mock products
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Monthly Grocery Package",
    description:
      "Essential food items delivered to your family - includes teff, oil, sugar, rice, and more",
    priceUSD: 75,
    priceETB: 4260,
    category: "groceries",
    image: "/ethiopian-grocery-package.jpg",
    deliveryType: "home_delivery",
  },
  {
    id: "2",
    name: "Smartphone - Samsung Galaxy A54",
    description: "Latest Samsung smartphone with warranty and local support",
    priceUSD: 350,
    priceETB: 19880,
    category: "electronics",
    image: "/samsung-smartphone-display.png",
    deliveryType: "both",
  },
  {
    id: "3",
    name: "Ethio Telecom Gift Card - 500 Birr",
    description: "Mobile credit for calls, data, and SMS",
    priceUSD: 9,
    priceETB: 500,
    category: "gift_cards",
    image: "/mobile-credit-card.jpg",
    deliveryType: "pickup",
  },
  {
    id: "4",
    name: "Medical Care Package",
    description:
      "Comprehensive health checkup and consultation at partner clinics",
    priceUSD: 120,
    priceETB: 6816,
    category: "health",
    image: "/medical-care-package.jpg",
    deliveryType: "pickup",
  },
];

// Mock money requests - Comprehensive examples with all statuses
export const mockRequests: MoneyRequest[] = [
  {
    id: "req-001",
    fromName: "Sarah Johnson",
    fromEmail: "sarah.j@email.com",
    fromAvatar: "/placeholder.svg?height=40&width=40",
    amount: 150.0,
    purpose: "Rent Payment",
    description: "Monthly rent for December",
    status: "pending",
    dueDate: "2025-01-15",
    createdAt: "2025-01-05T10:30:00Z",
  },
  {
    id: "req-002",
    fromName: "Michael Chen",
    fromEmail: "m.chen@email.com",
    fromAvatar: "/placeholder.svg?height=40&width=40",
    amount: 75.5,
    purpose: "Shared Expenses",
    description: "Dinner split from last weekend",
    status: "completed",
    dueDate: "2025-01-10",
    createdAt: "2025-01-03T14:20:00Z",
  },
  {
    id: "req-003",
    fromName: "Emily Rodriguez",
    fromEmail: "emily.r@email.com",
    fromAvatar: "/placeholder.svg?height=40&width=40",
    amount: 200.0,
    purpose: "Personal Loan",
    description: "Emergency family support",
    status: "pending",
    dueDate: "2025-01-20",
    createdAt: "2025-01-06T09:15:00Z",
  },
  {
    id: "req-004",
    fromName: "David Kim",
    fromEmail: "david.kim@email.com",
    fromAvatar: "/placeholder.svg?height=40&width=40",
    amount: 50.0,
    purpose: "Service Payment",
    description: "Website design consultation",
    status: "cancelled",
    dueDate: "2025-01-08",
    createdAt: "2025-01-02T16:45:00Z",
  },
  {
    id: "req-005",
    fromName: "Lisa Wang",
    fromEmail: "lisa.wang@email.com",
    fromAvatar: "/placeholder.svg?height=40&width=40",
    amount: 125.75,
    purpose: "Gift",
    description: "Birthday gift for family member",
    status: "completed",
    dueDate: "2025-01-12",
    createdAt: "2025-01-04T11:00:00Z",
  },
  {
    id: "req-006",
    fromName: "Ahmed Hassan",
    fromEmail: "ahmed.h@email.com",
    fromAvatar: "/placeholder.svg?height=40&width=40",
    amount: 300.0,
    purpose: "Rent Payment",
    description: "Monthly apartment rent",
    status: "pending",
    dueDate: "2025-01-25",
    createdAt: "2025-01-07T08:30:00Z",
  },
  {
    id: "req-007",
    fromName: "Maria Garcia",
    fromEmail: "maria.g@email.com",
    fromAvatar: "/placeholder.svg?height=40&width=40",
    amount: 85.0,
    purpose: "Shared Expenses",
    description: "Utility bills for the month",
    status: "completed",
    dueDate: "2025-01-14",
    createdAt: "2025-01-01T13:15:00Z",
  },
  {
    id: "req-008",
    fromName: "James Wilson",
    fromEmail: "james.w@email.com",
    fromAvatar: "/placeholder.svg?height=40&width=40",
    amount: 45.0,
    purpose: "Service Payment",
    description: "Freelance writing work",
    status: "cancelled",
    dueDate: "2025-01-05",
    createdAt: "2024-12-30T10:00:00Z",
  },
  {
    id: "req-009",
    fromName: "Fatima Al-Zahra",
    fromEmail: "fatima.az@email.com",
    fromAvatar: "/placeholder.svg?height=40&width=40",
    amount: 175.25,
    purpose: "Personal Loan",
    description: "School tuition assistance",
    status: "pending",
    dueDate: "2025-01-18",
    createdAt: "2025-01-08T15:45:00Z",
  },
  {
    id: "req-010",
    fromName: "Robert Taylor",
    fromEmail: "robert.t@email.com",
    fromAvatar: "/placeholder.svg?height=40&width=40",
    amount: 95.5,
    purpose: "Gift",
    description: "Holiday gift for parents",
    status: "completed",
    dueDate: "2025-01-16",
    createdAt: "2025-01-02T12:30:00Z",
  },
];

export const mockInvestments: Investment[] = [
  {
    id: "inv-001",
    name: "Ethiopian Government Bonds",
    type: "Government Bond",
    amount: 5000,
    purchaseDate: "2024-06-15",
    maturityDate: "2029-06-15",
    expectedReturn: "8-10%",
    currentValue: 5450,
    status: "active",
  },
  {
    id: "inv-002",
    name: "Real Estate Development Fund",
    type: "Real Estate",
    amount: 10000,
    purchaseDate: "2024-03-20",
    maturityDate: "2027-03-20",
    expectedReturn: "12-15%",
    currentValue: 11200,
    status: "active",
  },
];

export const mockGiftOrders: GiftOrder[] = [
  {
    id: "gift-001",
    productName: "Ethiopian Coffee Gift Set",
    recipientName: "Tigist Alemu",
    recipientPhone: "+251-911-234567",
    amount: 45,
    status: "delivered",
    orderDate: "2024-12-20",
    deliveryDate: "2024-12-23",
  },
  {
    id: "gift-002",
    productName: "Traditional Habesha Dress",
    recipientName: "Meron Haile",
    recipientPhone: "+251-933-456789",
    amount: 120,
    status: "shipped",
    orderDate: "2025-01-03",
  },
];

// Exchange rate
export const currentExchangeRate = {
  usdToEtb: 56.8,
  lastUpdated: "2025-01-06T12:00:00Z",
};

// Wallet balances
export const mockWalletBalances = {
  usd: 50.0, // Demo balance for testing
  eur: 850.75,
  gbp: 620.3,
  sar: 2100.0,
  aed: 1500.5,
  etb: 200000.0, // Increased for demo - plenty of Birr
};
