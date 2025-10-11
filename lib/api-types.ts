export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    requestId: string;
  };
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  phone: string;
  password: string;
  fullName: string;
}

export interface OTPRequest {
  email: string;
  code: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    kycStatus: string;
    avatar?: string;
  };
  token: string;
  refreshToken: string;
  expiresIn: number;
}

// Transaction Types
export interface CreateTransactionRequest {
  recipientId: string;
  amount: number;
  currency: "USD" | "ETB";
  message?: string;
  purpose?: string;
}

export interface TransactionResponse {
  id: string;
  status: "created" | "pending" | "processing" | "completed" | "failed";
  amount: number;
  currency: string;
  fee: number;
  exchangeRate: number;
  recipientName: string;
  referenceNumber: string;
  createdAt: string;
  estimatedDelivery?: string;
}

// Money Request Types
export interface CreateMoneyRequestRequest {
  recipientEmail: string;
  amount: number;
  purpose: string;
  description?: string;
  dueDate: string;
}

export interface MoneyRequestResponse {
  id: string;
  status: "pending" | "completed" | "cancelled" | "expired";
  amount: number;
  purpose: string;
  fromName: string;
  toEmail: string;
  dueDate: string;
  createdAt: string;
}

// KYC Types
export interface KYCSubmissionRequest {
  documentType: "passport" | "drivers_license" | "national_id";
  documentNumber: string;
  documentFrontImage: string; // base64 or URL
  documentBackImage?: string;
  selfieImage: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
}

export interface KYCStatusResponse {
  status: "pending" | "in_review" | "approved" | "rejected";
  submittedAt?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  documents: {
    type: string;
    status: string;
    uploadedAt: string;
  }[];
}

// Wallet Types
export interface WalletBalanceResponse {
  usd: number;
  etb: number;
  lastUpdated: string;
}

export interface TopUpRequest {
  amount: number;
  currency: "USD";
  paymentMethod: "card" | "bank_transfer" | "paypal";
  paymentDetails?: any;
}

// FX Rate Types
export interface FXRateResponse {
  from: string;
  to: string;
  rate: number;
  inverseRate: number;
  lastUpdated: string;
  validUntil: string;
}

// Recipient Types
export interface CreateRecipientRequest {
  name: string;
  phone: string;
  email?: string;
  accountNumber: string;
  accountType: "bank" | "mobile_wallet";
  country: string;
  bankName?: string;
}

export interface RecipientResponse {
  id: string;
  name: string;
  phone: string;
  accountNumber: string;
  accountType: string;
  country: string;
  verified: boolean;
  isFavorite: boolean;
}
