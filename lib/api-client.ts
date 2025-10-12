import {
  mockUser,
  mockRecipients,
  mockTransactions,
  mockWalletBalances,
  mockRequests,
  mockServiceProviders,
  mockInvestmentProducts,
  mockProducts,
  mockInvestments,
  mockGiftOrders,
} from "./mock-data";
import type {
  ApiResponse,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  OTPRequest,
  WalletBalanceResponse,
  TopUpRequest,
  CreateTransactionRequest,
  TransactionResponse,
  FXRateResponse,
  CreateRecipientRequest,
  RecipientResponse,
  CreateMoneyRequestRequest,
  MoneyRequestResponse,
  KYCSubmissionRequest,
  KYCStatusResponse,
} from "./api-types";
import { currentExchangeRate, fetchRealExchangeRate } from "./exchange-rates";

// Simulated delay for realistic API behavior
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate unique IDs
const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Generate reference numbers
const generateReferenceNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 999999)
    .toString()
    .padStart(6, "0");
  return `ZMN-${year}-${random}`;
};

// In-memory storage for mock data (simulates database)
const storage = {
  users: [mockUser],
  recipients: [...mockRecipients],
  transactions: [...mockTransactions],
  walletBalances: { ...mockWalletBalances },
  moneyRequests: [...mockRequests],
  sessions: new Map<string, { userId: string; expiresAt: number }>(),
  // Removed in-memory OTP storage
  // otpCodes: new Map<string, { code: string; expiresAt: number }>(),
  kycSubmissions: new Map<string, any>(),
  serviceProviders: [...mockServiceProviders],
  investmentProducts: [...mockInvestmentProducts],
  products: [...mockProducts],
  investments: [...mockInvestments],
  giftOrders: [...mockGiftOrders],
  billPayments: [] as any[],
  linkedBanks: [] as any[], // Added for bank integration
};

// Helper to create API response
function createResponse<T>(data: T, success = true): ApiResponse<T> {
  return {
    success,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      requestId: generateId(),
    },
  };
}

// Helper to create error response
function createErrorResponse(
  code: string,
  message: string,
  details?: any
): ApiResponse {
  return {
    success: false,
    error: {
      code,
      message,
      details,
    },
    meta: {
      timestamp: new Date().toISOString(),
      requestId: generateId(),
    },
  };
}

const OTP_STORAGE_KEY = "remittance_otp_codes";
const BANK_STORAGE_KEY = "remittance_linked_banks"; // Added for bank integration

function getOTPStorage(): Map<string, { code: string; expiresAt: number }> {
  if (typeof window === "undefined") return new Map();

  try {
    const stored = localStorage.getItem(OTP_STORAGE_KEY);
    if (!stored) return new Map();

    const data = JSON.parse(stored);
    return new Map(Object.entries(data));
  } catch {
    return new Map();
  }
}

function setOTPStorage(
  otpMap: Map<string, { code: string; expiresAt: number }>
) {
  if (typeof window === "undefined") return;

  try {
    const data = Object.fromEntries(otpMap);
    localStorage.setItem(OTP_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("[v0] Failed to save OTP to localStorage:", error);
  }
}

function clearExpiredOTPs() {
  const otpMap = getOTPStorage();
  const now = Date.now();
  let hasChanges = false;

  for (const [email, otp] of otpMap.entries()) {
    if (otp.expiresAt < now) {
      otpMap.delete(email);
      hasChanges = true;
    }
  }

  if (hasChanges) {
    setOTPStorage(otpMap);
  }
}

// Helper functions for Bank Integration storage
function getLinkedBanks(): any[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(BANK_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function setLinkedBanks(banks: any[]) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(BANK_STORAGE_KEY, JSON.stringify(banks));
  } catch (error) {
    console.error("[v0] Failed to save banks to localStorage:", error);
  }
}

// API Client
export const apiClient = {
  // Authentication APIs
  auth: {
    async register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
      await delay(800);

      // Validate email uniqueness
      const existingUser = storage.users.find((u) => u.email === data.email);
      if (existingUser) {
        return createErrorResponse("AUTH_001", "Email already registered");
      }

      // Create new user
      const newUser = {
        id: generateId(),
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        country: "United States",
        nationality: "",
        dateOfBirth: "",
        kycStatus: "pending" as const,
        avatar: "", // Assuming avatar is a new field
      };

      storage.users.push(newUser);

      // Generate session token
      const token = `mock_token_${generateId()}`;
      const expiresIn = 3600 * 24 * 7; // 7 days
      storage.sessions.set(token, {
        userId: newUser.id,
        expiresAt: Date.now() + expiresIn * 1000,
      });

      return createResponse<AuthResponse>({
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          kycStatus: newUser.kycStatus,
          avatar: newUser.avatar, // Include avatar in response
        },
        token,
        refreshToken: `refresh_${token}`,
        expiresIn,
      });
    },

    async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
      await delay(600);

      // For demo purposes, find user by email or accept any valid email format
      let user = storage.users.find((u) => u.email === data.email);

      // If user doesn't exist and email looks valid, create demo user
      if (!user && data.email && data.email.includes("@")) {
        user = {
          id: generateId(),
          name: data.email
            .split("@")[0]
            .replace(/[^a-zA-Z]/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
          email: data.email,
          phone: "+1-555-0123",
          country: "United States",
          nationality: "American",
          dateOfBirth: "1990-01-01",
          kycStatus: "verified" as const,
          avatar: "",
        };
        storage.users.push(user);
        console.log(`[v0] Demo user created: ${user.email}`);
      }

      // Accept any password for demo purposes
      if (!user) {
        return createErrorResponse("AUTH_002", "Invalid credentials");
      }

      // Generate session token
      const token = `mock_token_${generateId()}`;
      const expiresIn = 3600 * 24 * 7; // 7 days
      storage.sessions.set(token, {
        userId: user.id,
        expiresAt: Date.now() + expiresIn * 1000,
      });

      return createResponse<AuthResponse>({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          kycStatus: user.kycStatus,
          avatar: user.avatar, // Include avatar in response
        },
        token,
        refreshToken: `refresh_${token}`,
        expiresIn,
      });
    },

    async sendOTP(
      email: string
    ): Promise<ApiResponse<{ message: string; code?: string }>> {
      await delay(400);

      clearExpiredOTPs();

      // Generate 6-digit OTP
      const code = Math.floor(100000 + Math.random() * 900000).toString();

      const otpMap = getOTPStorage();
      otpMap.set(email, {
        code,
        expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
      });
      setOTPStorage(otpMap);

      console.log(`[v0] OTP for ${email}: ${code}`); // For testing

      return createResponse({ message: "OTP sent successfully", code });
    },

    async verifyOTP(
      data: OTPRequest
    ): Promise<ApiResponse<{ verified: boolean; token?: string; user?: any }>> {
      await delay(300);

      clearExpiredOTPs();

      const otpMap = getOTPStorage();
      const stored = otpMap.get(data.email);

      console.log("[v0] OTP verification attempt:", {
        email: data.email,
        providedCode: data.code,
        storedCode: stored?.code,
        hasStored: !!stored,
      });

      if (!stored) {
        return createErrorResponse("AUTH_003", "OTP not found or expired");
      }

      if (stored.expiresAt < Date.now()) {
        otpMap.delete(data.email);
        setOTPStorage(otpMap);
        return createErrorResponse("AUTH_004", "OTP expired");
      }

      if (stored.code !== data.code) {
        console.log("[v0] OTP verification error: Invalid OTP");
        return createErrorResponse("AUTH_005", "Invalid OTP");
      }

      // Clear OTP after successful verification
      otpMap.delete(data.email);
      setOTPStorage(otpMap);

      const user = storage.users.find((u) => u.email === data.email); // Changed from Array.from(storage.users.values())
      if (user) {
        const token = `mock_token_${generateId()}`;
        const expiresIn = 3600 * 24 * 7; // 7 days
        storage.sessions.set(token, {
          userId: user.id,
          expiresAt: Date.now() + expiresIn * 1000,
        });

        return createResponse({
          verified: true,
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            kycStatus: user.kycStatus,
          },
        });
      }

      return createResponse({ verified: true });
    },

    async changePassword(
      token: string,
      currentPassword: string,
      newPassword: string
    ): Promise<ApiResponse<{ message: string }>> {
      await delay(500);

      // Validate token
      const session = storage.sessions.get(token);
      if (!session) {
        return createErrorResponse("AUTH_001", "Invalid or expired session");
      }

      // In a real app, verify currentPassword against stored hash
      // For mock, just check it's not empty
      if (!currentPassword) {
        return createErrorResponse("AUTH_003", "Current password is incorrect");
      }

      // Update password (in mock, we just simulate success)
      return createResponse({ message: "Password changed successfully" });
    },

    async logout(token: string): Promise<ApiResponse<{ message: string }>> {
      await delay(200);
      storage.sessions.delete(token);
      return createResponse({ message: "Logged out successfully" });
    },
  },

  // User Profile APIs
  user: {
    async getProfile(token: string): Promise<ApiResponse<typeof mockUser>> {
      await delay(300);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const user = storage.users.find((u) => u.id === session.userId);
      if (!user) {
        return createErrorResponse("USER_001", "User not found");
      }

      return createResponse(user);
    },

    async updateProfile(
      token: string,
      updates: Partial<typeof mockUser>
    ): Promise<ApiResponse<typeof mockUser>> {
      await delay(500);

      const session = storage.sessions.get(token);
      if (!session) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const userIndex = storage.users.findIndex((u) => u.id === session.userId);
      if (userIndex === -1) {
        return createErrorResponse("USER_001", "User not found");
      }

      // Update user
      storage.users[userIndex] = {
        ...storage.users[userIndex],
        ...updates,
      };

      return createResponse(storage.users[userIndex]);
    },
  },

  // Wallet APIs (demo - no auth required)
  wallet: {
    async getBalance(
      token?: string
    ): Promise<ApiResponse<WalletBalanceResponse>> {
      await delay(300);

      // Demo mode - no auth validation required
      return createResponse<WalletBalanceResponse>({
        usd: storage.walletBalances.usd,
        etb: storage.walletBalances.etb,
        lastUpdated: new Date().toISOString(),
      });
    },

    async topUp(
      token: string,
      data: TopUpRequest
    ): Promise<ApiResponse<WalletBalanceResponse>> {
      await delay(1200); // Simulate payment processing

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      // Validate amount
      if (data.amount <= 0) {
        return createErrorResponse("WALLET_001", "Invalid amount");
      }

      if (data.amount > 10000) {
        return createErrorResponse(
          "WALLET_002",
          "Amount exceeds maximum limit of $10,000"
        );
      }

      // Simulate payment processing
      // In real app, integrate with Stripe/PayPal

      // Credit wallet
      storage.walletBalances.usd += data.amount;

      // Create transaction record
      const transaction = {
        id: generateId(),
        type: "received" as const,
        recipientName: "Wallet Top-Up",
        amount: data.amount,
        currency: "USD" as const,
        status: "completed" as const,
        date: new Date().toISOString(),
        referenceNumber: generateReferenceNumber(),
      };
      storage.transactions.unshift(transaction);

      return createResponse<WalletBalanceResponse>({
        usd: storage.walletBalances.usd,
        etb: storage.walletBalances.etb,
        lastUpdated: new Date().toISOString(),
      });
    },
  },

  // Transaction APIs
  transactions: {
    async getAll(
      token: string,
      filters?: { status?: string; type?: string; limit?: number }
    ): Promise<ApiResponse<typeof mockTransactions>> {
      await delay(400);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      let transactions = [...storage.transactions];

      // Apply filters
      if (filters?.status) {
        transactions = transactions.filter((t) => t.status === filters.status);
      }
      if (filters?.type) {
        transactions = transactions.filter((t) => t.type === filters.type);
      }
      if (filters?.limit) {
        transactions = transactions.slice(0, filters.limit);
      }

      return createResponse(transactions);
    },

    async getById(
      token: string,
      id: string
    ): Promise<ApiResponse<(typeof mockTransactions)[0]>> {
      await delay(300);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const transaction = storage.transactions.find((t) => t.id === id);
      if (!transaction) {
        return createErrorResponse("TRANSACTION_001", "Transaction not found");
      }

      return createResponse(transaction);
    },

    async create(
      token: string,
      data: CreateTransactionRequest
    ): Promise<ApiResponse<TransactionResponse>> {
      await delay(1000); // Simulate processing

      // For demo purposes, skip session validation
      // const session = storage.sessions.get(token);
      // if (!session || session.expiresAt < Date.now()) {
      //   return createErrorResponse("AUTH_006", "Invalid or expired session");
      // }

      // Validate recipient
      const recipient = storage.recipients.find(
        (r) => r.id === data.recipientId
      );
      if (!recipient) {
        return createErrorResponse("TRANSACTION_002", "Recipient not found");
      }

      // Validate amount
      if (data.amount <= 0) {
        return createErrorResponse("TRANSACTION_003", "Invalid amount");
      }

      // Calculate fee (1% for amounts > $100, $2.99 flat for smaller amounts)
      const fee = data.amount > 100 ? data.amount * 0.01 : 2.99;
      const totalCost = data.amount + fee;

      // Check balance based on currency
      if (data.currency === "USD" && storage.walletBalances.usd < totalCost) {
        return createErrorResponse("TRANSACTION_004", "Insufficient balance");
      } else if (
        data.currency === "ETB" &&
        storage.walletBalances.etb < totalCost
      ) {
        return createErrorResponse("TRANSACTION_004", "Insufficient balance");
      }

      // Debit wallet based on currency
      if (data.currency === "USD") {
        storage.walletBalances.usd -= totalCost;
      } else if (data.currency === "ETB") {
        storage.walletBalances.etb -= totalCost;
      }

      // Get exchange rate
      const exchangeRate = currentExchangeRate.usdToEtb;

      // Create transaction
      const transaction = {
        id: generateId(),
        type: "sent" as const,
        recipientId: recipient.id,
        recipientName: recipient.name,
        amount: data.amount,
        currency: data.currency,
        status: "completed" as const,
        date: new Date().toISOString(),
        fee,
        exchangeRate,
        message: data.message,
        referenceNumber: generateReferenceNumber(),
      };

      storage.transactions.unshift(transaction);

      return createResponse<TransactionResponse>({
        id: transaction.id,
        status: "completed",
        amount: transaction.amount,
        currency: transaction.currency,
        fee: transaction.fee!,
        exchangeRate: transaction.exchangeRate!,
        recipientName: transaction.recipientName,
        referenceNumber: transaction.referenceNumber!,
        createdAt: transaction.date,
        estimatedDelivery: new Date(
          Date.now() + 24 * 60 * 60 * 1000
        ).toISOString(), // 24 hours
      });
    },
  },

  // FX Rate APIs
  fx: {
    async getRate(
      from: string,
      to: string
    ): Promise<ApiResponse<FXRateResponse>> {
      await delay(200);

      if (from === "USD" && to === "ETB") {
        try {
          await fetchRealExchangeRate();
        } catch (error) {
          console.error("[v0] Error fetching real exchange rate:", error);
        }
      }

      // Mock FX rates
      const rates: Record<string, number> = {
        "USD-ETB": currentExchangeRate.usdToEtb,
        "ETB-USD": 1 / currentExchangeRate.usdToEtb,
      };

      const key = `${from}-${to}`;
      const rate = rates[key];

      if (!rate) {
        return createErrorResponse(
          "FX_001",
          "Exchange rate not available for this currency pair"
        );
      }

      return createResponse<FXRateResponse>({
        from,
        to,
        rate,
        inverseRate: 1 / rate,
        lastUpdated: currentExchangeRate.lastUpdated,
        validUntil: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
      });
    },

    async calculateConversion(
      from: string,
      to: string,
      amount: number
    ): Promise<
      ApiResponse<{
        amount: number;
        convertedAmount: number;
        rate: number;
        fee: number;
      }>
    > {
      await delay(200);

      const rateResponse = await this.getRate(from, to);
      if (!rateResponse.success || !rateResponse.data) {
        return createErrorResponse("FX_001", "Exchange rate not available");
      }

      const rate = rateResponse.data.rate;
      const convertedAmount = amount * rate;
      const fee = amount > 100 ? amount * 0.01 : 2.99;

      return createResponse({
        amount,
        convertedAmount,
        rate,
        fee,
      });
    },
  },

  // Recipient APIs (demo - no auth required)
  recipients: {
    async getAll(token?: string): Promise<ApiResponse<typeof mockRecipients>> {
      await delay(300);

      // Demo mode - no auth validation required
      return createResponse(storage.recipients);
    },

    async getById(
      token: string | undefined,
      id: string
    ): Promise<ApiResponse<(typeof mockRecipients)[0]>> {
      await delay(200);

      // Demo mode - no auth validation required
      const recipient = storage.recipients.find((r) => r.id === id);
      if (!recipient) {
        return createErrorResponse("RECIPIENT_001", "Recipient not found");
      }

      return createResponse(recipient);
    },

    async create(
      token: string,
      data: CreateRecipientRequest
    ): Promise<ApiResponse<RecipientResponse>> {
      await delay(600);

      // For demo purposes, skip session validation
      // const session = storage.sessions.get(token);
      // if (!session || session.expiresAt < Date.now()) {
      //   return createErrorResponse("AUTH_006", "Invalid or expired session");
      // }

      // Validate phone number
      if (!data.phone || data.phone.length < 10) {
        return createErrorResponse("RECIPIENT_002", "Invalid phone number");
      }

      // Create recipient
      const recipient = {
        id: generateId(),
        name: data.name,
        phone: data.phone,
        email: data.email,
        accountNumber: data.accountNumber,
        accountType: data.accountType,
        country: data.country,
        countryCode: data.country === "Ethiopia" ? "ET" : "US",
        isFavorite: false,
      };

      storage.recipients.push(recipient);

      return createResponse<RecipientResponse>({
        id: recipient.id,
        name: recipient.name,
        phone: recipient.phone,
        accountNumber: recipient.accountNumber,
        accountType: recipient.accountType,
        country: recipient.country,
        verified: true,
        isFavorite: recipient.isFavorite,
      });
    },

    async update(
      token: string,
      id: string,
      updates: Partial<CreateRecipientRequest>
    ): Promise<ApiResponse<RecipientResponse>> {
      await delay(500);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const index = storage.recipients.findIndex((r) => r.id === id);
      if (index === -1) {
        return createErrorResponse("RECIPIENT_001", "Recipient not found");
      }

      storage.recipients[index] = {
        ...storage.recipients[index],
        ...updates,
      };

      const recipient = storage.recipients[index];

      return createResponse<RecipientResponse>({
        id: recipient.id,
        name: recipient.name,
        phone: recipient.phone,
        accountNumber: recipient.accountNumber,
        accountType: recipient.accountType,
        country: recipient.country,
        verified: true,
        isFavorite: recipient.isFavorite,
      });
    },

    async delete(
      token: string,
      id: string
    ): Promise<ApiResponse<{ message: string }>> {
      await delay(400);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const index = storage.recipients.findIndex((r) => r.id === id);
      if (index === -1) {
        return createErrorResponse("RECIPIENT_001", "Recipient not found");
      }

      storage.recipients.splice(index, 1);

      return createResponse({ message: "Recipient deleted successfully" });
    },

    async toggleFavorite(
      token: string,
      id: string
    ): Promise<ApiResponse<RecipientResponse>> {
      await delay(300);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const index = storage.recipients.findIndex((r) => r.id === id);
      if (index === -1) {
        return createErrorResponse("RECIPIENT_001", "Recipient not found");
      }

      storage.recipients[index].isFavorite =
        !storage.recipients[index].isFavorite;
      const recipient = storage.recipients[index];

      return createResponse<RecipientResponse>({
        id: recipient.id,
        name: recipient.name,
        phone: recipient.phone,
        accountNumber: recipient.accountNumber,
        accountType: recipient.accountType,
        country: recipient.country,
        verified: true,
        isFavorite: recipient.isFavorite,
      });
    },
  },

  // Money Request APIs
  moneyRequests: {
    async getAll(
      token: string,
      filters?: { status?: string; limit?: number }
    ): Promise<ApiResponse<typeof mockRequests>> {
      await delay(400);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      let requests = [...storage.moneyRequests];

      // Apply filters
      if (filters?.status) {
        requests = requests.filter((r) => r.status === filters.status);
      }
      if (filters?.limit) {
        requests = requests.slice(0, filters.limit);
      }

      return createResponse(requests);
    },

    async getById(
      token: string,
      id: string
    ): Promise<ApiResponse<(typeof mockRequests)[0]>> {
      await delay(300);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const request = storage.moneyRequests.find((r) => r.id === id);
      if (!request) {
        return createErrorResponse("REQUEST_001", "Money request not found");
      }

      return createResponse(request);
    },

    async create(
      token: string | undefined,
      data: {
        fromName: string;
        fromEmail: string;
        fromPhone?: string;
        amount: number;
        purpose: string;
        description?: string;
        dueDate: string;
      }
    ): Promise<ApiResponse<MoneyRequestResponse>> {
      await delay(700);

      // Demo mode - no auth validation required
      // const session = storage.sessions.get(token);
      // if (!session || session.expiresAt < Date.now()) {
      //   return createErrorResponse("AUTH_006", "Invalid or expired session");
      // }

      // const user = storage.users.find((u) => u.id === session.userId);
      // if (!user) {
      //   return createErrorResponse("USER_001", "User not found");
      // }

      // Validate amount
      if (data.amount <= 0) {
        return createErrorResponse("REQUEST_002", "Invalid amount");
      }

      // Validate due date
      const dueDate = new Date(data.dueDate);
      if (dueDate < new Date()) {
        return createErrorResponse(
          "REQUEST_003",
          "Due date must be in the future"
        );
      }

      // Create money request
      const request = {
        id: `req-${generateId()}`,
        fromName: data.fromName,
        fromEmail: data.fromEmail,
        fromAvatar: "", // Demo user avatar
        amount: data.amount,
        purpose: data.purpose,
        description: data.description,
        status: "pending" as const,
        dueDate: data.dueDate,
        createdAt: new Date().toISOString(),
      };

      storage.moneyRequests.unshift(request);
      console.log("[v0] New request added to storage:", request);

      // In real app, send notification to recipient via email/SMS
      console.log(`[v0] Money request sent to ${data.fromEmail}`);

      return createResponse<MoneyRequestResponse>({
        id: request.id,
        status: request.status,
        amount: request.amount,
        purpose: request.purpose,
        fromName: request.fromName,
        toEmail: data.fromEmail,
        dueDate: request.dueDate,
        createdAt: request.createdAt,
      });
    },

    async accept(
      token: string,
      id: string
    ): Promise<ApiResponse<TransactionResponse>> {
      await delay(1000);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const requestIndex = storage.moneyRequests.findIndex((r) => r.id === id);
      if (requestIndex === -1) {
        return createErrorResponse("REQUEST_001", "Money request not found");
      }

      const request = storage.moneyRequests[requestIndex];

      if (request.status !== "pending") {
        return createErrorResponse("REQUEST_004", "Request is not pending");
      }

      // Check if expired
      if (new Date(request.dueDate) < new Date()) {
        storage.moneyRequests[requestIndex].status = "cancelled";
        return createErrorResponse("REQUEST_005", "Request has expired");
      }

      // Check balance
      const fee = request.amount > 100 ? request.amount * 0.01 : 2.99;
      const totalCost = request.amount + fee;

      if (storage.walletBalances.usd < totalCost) {
        return createErrorResponse("TRANSACTION_004", "Insufficient balance");
      }

      // Debit wallet
      storage.walletBalances.usd -= totalCost;

      // Update request status
      storage.moneyRequests[requestIndex].status = "completed";

      // Create transaction
      const transaction = {
        id: generateId(),
        type: "sent" as const,
        recipientName: request.fromName,
        amount: request.amount,
        currency: "USD" as const,
        status: "completed" as const,
        date: new Date().toISOString(),
        fee,
        exchangeRate: currentExchangeRate.usdToEtb,
        message: `Payment for: ${request.purpose}`,
        referenceNumber: generateReferenceNumber(),
      };

      storage.transactions.unshift(transaction);

      return createResponse<TransactionResponse>({
        id: transaction.id,
        status: "completed",
        amount: transaction.amount,
        currency: transaction.currency,
        fee: transaction.fee!,
        exchangeRate: transaction.exchangeRate!,
        recipientName: transaction.recipientName,
        referenceNumber: transaction.referenceNumber!,
        createdAt: transaction.date,
      });
    },

    async decline(
      token: string,
      id: string
    ): Promise<ApiResponse<{ message: string }>> {
      await delay(400);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const requestIndex = storage.moneyRequests.findIndex((r) => r.id === id);
      if (requestIndex === -1) {
        return createErrorResponse("REQUEST_001", "Money request not found");
      }

      const request = storage.moneyRequests[requestIndex];

      if (request.status !== "pending") {
        return createErrorResponse("REQUEST_004", "Request is not pending");
      }

      // Update request status
      storage.moneyRequests[requestIndex].status = "cancelled";

      return createResponse({ message: "Money request declined" });
    },

    async cancel(
      token: string,
      id: string
    ): Promise<ApiResponse<{ message: string }>> {
      await delay(400);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const requestIndex = storage.moneyRequests.findIndex((r) => r.id === id);
      if (requestIndex === -1) {
        return createErrorResponse("REQUEST_001", "Money request not found");
      }

      const request = storage.moneyRequests[requestIndex];

      if (request.status !== "pending") {
        return createErrorResponse("REQUEST_004", "Request is not pending");
      }

      // Update request status
      storage.moneyRequests[requestIndex].status = "cancelled";

      return createResponse({ message: "Money request cancelled" });
    },
  },

  // Send Money flow APIs (orchestrated transaction creation)
  sendMoney: {
    async validateRecipient(
      token: string,
      recipientId: string
    ): Promise<ApiResponse<{ valid: boolean; recipient: any }>> {
      await delay(300);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const recipient = storage.recipients.find((r) => r.id === recipientId);
      if (!recipient) {
        return createErrorResponse("RECIPIENT_001", "Recipient not found");
      }

      // In real app, validate with bank/wallet provider
      return createResponse({
        valid: true,
        recipient,
      });
    },

    async calculateFees(
      token: string | undefined,
      amount: number,
      currency: string
    ): Promise<
      ApiResponse<{
        amount: number;
        fee: number;
        total: number;
        exchangeRate: number;
        convertedAmount: number;
      }>
    > {
      await delay(200);

      // Demo mode - no auth validation required
      // const session = storage.sessions.get(token);
      // if (!session || session.expiresAt < Date.now()) {
      //   return createErrorResponse("AUTH_006", "Invalid or expired session");
      // }

      if (amount <= 0) {
        return createErrorResponse("TRANSACTION_003", "Invalid amount");
      }

      // Calculate fee (1% for amounts > $100, $2.99 flat for smaller amounts)
      const fee = amount > 100 ? amount * 0.01 : 2.99;
      const total = amount + fee;

      // Get exchange rate
      const exchangeRate = currentExchangeRate.usdToEtb;
      const convertedAmount = amount * exchangeRate;

      return createResponse({
        amount,
        fee,
        total,
        exchangeRate,
        convertedAmount,
      });
    },

    async initiate(
      token: string | undefined,
      data: CreateTransactionRequest & { requireOTP?: boolean }
    ): Promise<
      ApiResponse<{
        transactionId: string;
        requiresOTP: boolean;
        otpSent?: boolean;
      }>
    > {
      await delay(600);

      // For demo purposes, skip session validation
      // const session = storage.sessions.get(token);
      // if (!session || session.expiresAt < Date.now()) {
      //   return createErrorResponse("AUTH_006", "Invalid or expired session");
      // }

      // Validate recipient
      const recipient = storage.recipients.find(
        (r) => r.id === data.recipientId
      );
      if (!recipient) {
        return createErrorResponse("RECIPIENT_001", "Recipient not found");
      }

      // Validate amount
      if (data.amount <= 0) {
        return createErrorResponse("TRANSACTION_003", "Invalid amount");
      }

      // Calculate fee
      const fee = data.amount > 100 ? data.amount * 0.01 : 2.99;
      const totalCost = data.amount + fee;

      // Check balance
      if (storage.walletBalances.usd < totalCost) {
        return createErrorResponse("TRANSACTION_004", "Insufficient balance");
      }

      // For high-value transactions (>$500), require OTP
      const requiresOTP = data.amount > 500;

      if (requiresOTP) {
        // For demo purposes, skip OTP sending in initiate
        // In real app, would send OTP here
        console.log("[v0] High-value transaction detected, OTP would be sent");
      }

      // Create pending transaction
      const transactionId = generateId();

      return createResponse({
        transactionId,
        requiresOTP,
        otpSent: requiresOTP,
      });
    },

    async confirm(
      token: string | undefined,
      transactionId: string,
      otp?: string
    ): Promise<ApiResponse<TransactionResponse>> {
      await delay(1000);

      // Demo mode - no auth validation required
      // const session = storage.sessions.get(token);
      // if (!session || session.expiresAt < Date.now()) {
      //   return createErrorResponse("AUTH_006", "Invalid or expired session");
      // }

      // In real app, verify OTP if required
      // For mock, skip OTP verification

      // This would normally retrieve the pending transaction
      // For mock, we'll just return success with proper details
      return createResponse<TransactionResponse>({
        id: transactionId,
        status: "completed",
        amount: 100,
        currency: "USD",
        fee: 2.99,
        exchangeRate: currentExchangeRate.usdToEtb,
        recipientName: "Mock Recipient",
        referenceNumber: generateReferenceNumber(),
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes for faster feedback
      });
    },
  },

  // KYC APIs
  kyc: {
    async getStatus(token: string): Promise<ApiResponse<KYCStatusResponse>> {
      await delay(400);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const user = storage.users.find((u) => u.id === session.userId);
      if (!user) {
        return createErrorResponse("USER_001", "User not found");
      }

      // Get KYC submission if exists
      const submission = storage.kycSubmissions.get(session.userId);

      if (!submission) {
        return createResponse<KYCStatusResponse>({
          status: "pending",
          documents: [],
        });
      }

      return createResponse<KYCStatusResponse>({
        status: submission.status,
        submittedAt: submission.submittedAt,
        reviewedAt: submission.reviewedAt,
        rejectionReason: submission.rejectionReason,
        documents: submission.documents,
      });
    },

    async submit(
      token: string,
      data: KYCSubmissionRequest
    ): Promise<ApiResponse<KYCStatusResponse>> {
      await delay(1500); // Simulate document processing

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const user = storage.users.find((u) => u.id === session.userId);
      if (!user) {
        return createErrorResponse("USER_001", "User not found");
      }

      // Validate document type
      const validDocTypes = ["passport", "drivers_license", "national_id"];
      if (!validDocTypes.includes(data.documentType)) {
        return createErrorResponse("KYC_001", "Invalid document type");
      }

      // Validate required fields
      if (
        !data.documentNumber ||
        !data.documentFrontImage ||
        !data.selfieImage
      ) {
        return createErrorResponse("KYC_002", "Missing required documents");
      }

      // Create KYC submission
      const submission = {
        userId: session.userId,
        status: "in_review" as const,
        documentType: data.documentType,
        documentNumber: data.documentNumber,
        dateOfBirth: data.dateOfBirth,
        nationality: data.nationality,
        address: data.address,
        submittedAt: new Date().toISOString(),
        documents: [
          {
            type: "document_front",
            status: "uploaded",
            uploadedAt: new Date().toISOString(),
          },
          ...(data.documentBackImage
            ? [
                {
                  type: "document_back",
                  status: "uploaded",
                  uploadedAt: new Date().toISOString(),
                },
              ]
            : []),
          {
            type: "selfie",
            status: "uploaded",
            uploadedAt: new Date().toISOString(),
          },
        ],
      };

      storage.kycSubmissions.set(session.userId, submission);

      // Update user KYC status
      const userIndex = storage.users.findIndex((u) => u.id === session.userId);
      if (userIndex !== -1) {
        storage.users[userIndex].kycStatus = "pending";
      }

      // In real app, integrate with KYC provider (Sumsub/Onfido)
      // Simulate auto-approval after delay
      setTimeout(() => {
        const sub = storage.kycSubmissions.get(session.userId);
        if (sub) {
          sub.status = "approved";
          sub.reviewedAt = new Date().toISOString();
          storage.kycSubmissions.set(session.userId, sub);

          // Update user status
          const idx = storage.users.findIndex((u) => u.id === session.userId);
          if (idx !== -1) {
            storage.users[idx].kycStatus = "verified";
          }
        }
      }, 5000); // Auto-approve after 5 seconds for testing

      return createResponse<KYCStatusResponse>({
        status: submission.status,
        submittedAt: submission.submittedAt,
        documents: submission.documents,
      });
    },

    async uploadDocument(
      token: string,
      documentType: string,
      file: string
    ): Promise<ApiResponse<{ documentId: string; url: string }>> {
      await delay(800);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      // In real app, upload to cloud storage (S3, Cloudinary)
      // For mock, just return success
      const documentId = generateId();

      return createResponse({
        documentId,
        url: `/uploads/kyc/${documentId}`,
      });
    },

    async resubmit(
      token: string,
      data: KYCSubmissionRequest
    ): Promise<ApiResponse<KYCStatusResponse>> {
      await delay(1500);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const existingSubmission = storage.kycSubmissions.get(session.userId);
      if (!existingSubmission) {
        return createErrorResponse("KYC_003", "No previous submission found");
      }

      if (existingSubmission.status !== "rejected") {
        return createErrorResponse(
          "KYC_004",
          "Can only resubmit rejected applications"
        );
      }

      // Resubmit with new data
      return await this.submit(token, data);
    },
  },

  // Compliance APIs
  compliance: {
    async checkSanctions(
      token: string,
      name: string,
      dateOfBirth: string,
      nationality: string
    ): Promise<ApiResponse<{ clear: boolean; matches?: any[] }>> {
      await delay(600);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      // In real app, check against OFAC, UN, EU sanctions lists
      // For mock, always return clear
      return createResponse({
        clear: true,
        matches: [],
      });
    },

    async checkAML(
      token: string,
      userId: string,
      transactionAmount: number
    ): Promise<
      ApiResponse<{
        approved: boolean;
        riskLevel: string;
        requiresReview: boolean;
      }>
    > {
      await delay(500);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      // Simple AML rules for mock
      let riskLevel = "low";
      let requiresReview = false;

      if (transactionAmount > 5000) {
        riskLevel = "high";
        requiresReview = true;
      } else if (transactionAmount > 1000) {
        riskLevel = "medium";
      }

      // Check transaction velocity (number of transactions in last 24h)
      const recentTransactions = storage.transactions.filter((t) => {
        const txDate = new Date(t.date);
        const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return txDate > dayAgo && t.type === "sent";
      });

      if (recentTransactions.length > 10) {
        riskLevel = "high";
        requiresReview = true;
      }

      return createResponse({
        approved: !requiresReview,
        riskLevel,
        requiresReview,
      });
    },

    async reportSuspiciousActivity(
      token: string,
      data: {
        transactionId?: string;
        userId?: string;
        reason: string;
        description: string;
      }
    ): Promise<ApiResponse<{ reportId: string; status: string }>> {
      await delay(700);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      // In real app, file SAR (Suspicious Activity Report) with FinCEN
      const reportId = `SAR-${generateId()}`;

      console.log(`[v0] Suspicious activity reported: ${reportId}`, data);

      return createResponse({
        reportId,
        status: "filed",
      });
    },

    async getTransactionLimits(token: string): Promise<
      ApiResponse<{
        daily: { current: number; limit: number };
        monthly: { current: number; limit: number };
        perTransaction: { min: number; max: number };
      }>
    > {
      await delay(300);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const user = storage.users.find((u) => u.id === session.userId);
      if (!user) {
        return createErrorResponse("USER_001", "User not found");
      }

      // Calculate current usage
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const dailyTransactions = storage.transactions.filter((t) => {
        const txDate = new Date(t.date);
        return txDate >= today && t.type === "sent";
      });

      const dailyTotal = dailyTransactions.reduce(
        (sum, t) => sum + t.amount,
        0
      );

      // Monthly
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const monthlyTransactions = storage.transactions.filter((t) => {
        const txDate = new Date(t.date);
        return txDate >= monthStart && t.type === "sent";
      });

      const monthlyTotal = monthlyTransactions.reduce(
        (sum, t) => sum + t.amount,
        0
      );

      // Limits based on KYC status
      const limits =
        user.kycStatus === "verified"
          ? {
              daily: 10000,
              monthly: 50000,
              perTransactionMin: 1,
              perTransactionMax: 10000,
            }
          : {
              daily: 1000,
              monthly: 5000,
              perTransactionMin: 1,
              perTransactionMax: 1000,
            };

      return createResponse({
        daily: {
          current: dailyTotal,
          limit: limits.daily,
        },
        monthly: {
          current: monthlyTotal,
          limit: limits.monthly,
        },
        perTransaction: {
          min: limits.perTransactionMin,
          max: limits.perTransactionMax,
        },
      });
    },
  },

  // Marketplace APIs
  marketplace: {
    async getServiceProviders(
      token: string,
      category?: string
    ): Promise<ApiResponse<typeof mockServiceProviders>> {
      await delay(400);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      let providers = [...storage.serviceProviders];

      if (category) {
        providers = providers.filter((p) => p.category === category);
      }

      return createResponse(providers);
    },

    async getServiceProvider(
      token: string,
      id: string
    ): Promise<ApiResponse<(typeof mockServiceProviders)[0]>> {
      await delay(300);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const provider = storage.serviceProviders.find((p) => p.id === id);
      if (!provider) {
        return createErrorResponse(
          "MARKETPLACE_001",
          "Service provider not found"
        );
      }

      return createResponse(provider);
    },

    async payBill(
      token: string,
      data: {
        providerId: string;
        recipientId: string;
        amount: number;
        accountNumber: string;
        purpose: string;
        notes?: string;
      }
    ): Promise<ApiResponse<TransactionResponse>> {
      await delay(1200);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      // Validate provider
      const provider = storage.serviceProviders.find(
        (p) => p.id === data.providerId
      );
      if (!provider) {
        return createErrorResponse(
          "MARKETPLACE_001",
          "Service provider not found"
        );
      }

      // Validate recipient
      const recipient = storage.recipients.find(
        (r) => r.id === data.recipientId
      );
      if (!recipient) {
        return createErrorResponse("RECIPIENT_001", "Recipient not found");
      }

      // Validate amount
      if (data.amount <= 0) {
        return createErrorResponse("TRANSACTION_003", "Invalid amount");
      }

      // Calculate fee
      const fee = data.amount > 100 ? data.amount * 0.01 : 2.99;
      const totalCost = data.amount + fee;

      // Check balance
      if (storage.walletBalances.usd < totalCost) {
        return createErrorResponse("TRANSACTION_004", "Insufficient balance");
      }

      // Debit wallet
      storage.walletBalances.usd -= totalCost;

      // Create bill payment record
      const payment = {
        id: generateId(),
        providerId: data.providerId,
        providerName: provider.name,
        recipientId: data.recipientId,
        recipientName: recipient.name,
        amount: data.amount,
        accountNumber: data.accountNumber,
        purpose: data.purpose,
        notes: data.notes,
        status: "completed" as const,
        createdAt: new Date().toISOString(),
        referenceNumber: generateReferenceNumber(),
      };

      storage.billPayments.push(payment);

      // Create transaction record
      const transaction = {
        id: generateId(),
        type: "sent" as const,
        recipientId: recipient.id,
        recipientName: `${provider.name} - ${recipient.name}`,
        amount: data.amount,
        currency: "USD" as const,
        status: "completed" as const,
        date: new Date().toISOString(),
        fee,
        exchangeRate: currentExchangeRate.usdToEtb,
        message: `Bill payment: ${data.purpose}`,
        referenceNumber: payment.referenceNumber,
      };

      storage.transactions.unshift(transaction);

      return createResponse<TransactionResponse>({
        id: transaction.id,
        status: "completed",
        amount: transaction.amount,
        currency: transaction.currency,
        fee: transaction.fee!,
        exchangeRate: transaction.exchangeRate!,
        recipientName: transaction.recipientName,
        referenceNumber: transaction.referenceNumber!,
        createdAt: transaction.date,
      });
    },

    async getBillPayments(token: string): Promise<ApiResponse<any[]>> {
      await delay(400);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      return createResponse(storage.billPayments);
    },
  },

  // Gift Shop APIs
  gifts: {
    async getProducts(
      token: string,
      category?: string
    ): Promise<ApiResponse<typeof mockProducts>> {
      await delay(400);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      let products = [...storage.products];

      if (category) {
        products = products.filter((p) => p.category === category);
      }

      return createResponse(products);
    },

    async getProduct(
      token: string,
      id: string
    ): Promise<ApiResponse<(typeof mockProducts)[0]>> {
      await delay(300);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const product = storage.products.find((p) => p.id === id);
      if (!product) {
        return createErrorResponse("GIFT_001", "Product not found");
      }

      return createResponse(product);
    },

    async purchaseGift(
      token: string,
      data: {
        productId: string;
        recipientId: string;
        quantity: number;
        deliveryType: "pickup" | "home_delivery";
        deliveryAddress?: string;
        message?: string;
      }
    ): Promise<
      ApiResponse<{
        orderId: string;
        status: string;
        totalAmount: number;
        estimatedDelivery: string;
      }>
    > {
      await delay(1000);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      // Validate product
      const product = storage.products.find((p) => p.id === data.productId);
      if (!product) {
        return createErrorResponse("GIFT_001", "Product not found");
      }

      // Validate recipient
      const recipient = storage.recipients.find(
        (r) => r.id === data.recipientId
      );
      if (!recipient) {
        return createErrorResponse("RECIPIENT_001", "Recipient not found");
      }

      // Validate delivery type
      if (
        product.deliveryType !== "both" &&
        product.deliveryType !== data.deliveryType
      ) {
        return createErrorResponse(
          "GIFT_002",
          `Product only available for ${product.deliveryType}`
        );
      }

      // Calculate total
      const totalAmount = product.priceUSD * data.quantity;
      // FIX: Use totalAmount instead of totalCost
      const totalCost = totalAmount;
      // FIX: The original code had 'totalCost' undeclared and unused in this context.
      //      It should have been 'totalAmount' or 'totalAmount + fee' if there was a fee.
      //      Assuming no fee for gift purchases based on the original logic.

      // Check balance
      if (storage.walletBalances.usd < totalAmount) {
        return createErrorResponse("TRANSACTION_004", "Insufficient balance");
      }

      // Debit wallet
      storage.walletBalances.usd -= totalCost;

      // Create gift order
      const order = {
        id: `gift-${generateId()}`,
        productName: product.name,
        productId: product.id,
        recipientName: recipient.name,
        recipientPhone: recipient.phone,
        recipientId: recipient.id,
        amount: totalAmount,
        quantity: data.quantity,
        deliveryType: data.deliveryType,
        deliveryAddress: data.deliveryAddress,
        message: data.message,
        status: "processing" as const,
        orderDate: new Date().toISOString(),
        estimatedDelivery: new Date(
          Date.now() + 3 * 24 * 60 * 60 * 1000
        ).toISOString(), // 3 days
      };

      storage.giftOrders.push(order);

      // Create transaction record
      const transaction = {
        id: generateId(),
        type: "sent" as const,
        recipientId: recipient.id,
        recipientName: `Gift: ${product.name} for ${recipient.name}`,
        amount: totalAmount,
        currency: "USD" as const,
        status: "completed" as const,
        date: new Date().toISOString(),
        message: data.message,
        referenceNumber: generateReferenceNumber(),
      };

      storage.transactions.unshift(transaction);

      return createResponse({
        orderId: order.id,
        status: order.status,
        totalAmount: order.amount,
        estimatedDelivery: order.estimatedDelivery,
      });
    },

    async getOrders(
      token: string
    ): Promise<ApiResponse<typeof mockGiftOrders>> {
      await delay(400);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      return createResponse(storage.giftOrders);
    },

    async getOrder(
      token: string,
      id: string
    ): Promise<ApiResponse<(typeof mockGiftOrders)[0]>> {
      await delay(300);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const order = storage.giftOrders.find((o) => o.id === id);
      if (!order) {
        return createErrorResponse("GIFT_003", "Order not found");
      }

      return createResponse(order);
    },

    async trackOrder(
      token: string,
      id: string
    ): Promise<
      ApiResponse<{
        orderId: string;
        status: string;
        timeline: Array<{
          status: string;
          timestamp: string;
          description: string;
        }>;
      }>
    > {
      await delay(300);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const order = storage.giftOrders.find((o) => o.id === id);
      if (!order) {
        return createErrorResponse("GIFT_003", "Order not found");
      }

      // Mock tracking timeline
      const timeline = [
        {
          status: "processing",
          timestamp: order.orderDate,
          description: "Order received and being processed",
        },
      ];

      if (order.status === "shipped" || order.status === "delivered") {
        timeline.push({
          status: "shipped",
          timestamp: new Date(
            new Date(order.orderDate).getTime() + 24 * 60 * 60 * 1000
          ).toISOString(),
          description: "Order shipped and in transit",
        });
      }

      if (order.status === "delivered") {
        timeline.push({
          status: "delivered",
          timestamp: order.deliveryDate!,
          description: "Order delivered successfully",
        });
      }

      return createResponse({
        orderId: order.id,
        status: order.status,
        timeline,
      });
    },
  },

  // Investment APIs
  investments: {
    async getProducts(
      token: string,
      riskLevel?: string
    ): Promise<ApiResponse<typeof mockInvestmentProducts>> {
      await delay(400);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      let products = [...storage.investmentProducts];

      if (riskLevel) {
        products = products.filter((p) => p.riskLevel === riskLevel);
      }

      return createResponse(products);
    },

    async getProduct(
      token: string,
      id: string
    ): Promise<ApiResponse<(typeof mockInvestmentProducts)[0]>> {
      await delay(300);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const product = storage.investmentProducts.find((p) => p.id === id);
      if (!product) {
        return createErrorResponse(
          "INVESTMENT_001",
          "Investment product not found"
        );
      }

      return createResponse(product);
    },

    async invest(
      token: string,
      data: {
        productId: string;
        amount: number;
      }
    ): Promise<
      ApiResponse<{
        investmentId: string;
        status: string;
        amount: number;
        expectedReturn: string;
        maturityDate: string;
      }>
    > {
      await delay(1200);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const user = storage.users.find((u) => u.id === session.userId);
      if (!user) {
        return createErrorResponse("USER_001", "User not found");
      }

      // Validate KYC
      if (user.kycStatus !== "verified") {
        return createErrorResponse(
          "INVESTMENT_002",
          "KYC verification required for investments"
        );
      }

      // Validate product
      const product = storage.investmentProducts.find(
        (p) => p.id === data.productId
      );
      if (!product) {
        return createErrorResponse(
          "INVESTMENT_001",
          "Investment product not found"
        );
      }

      // Validate amount
      if (data.amount < product.minimumInvestment) {
        return createErrorResponse(
          "INVESTMENT_003",
          `Minimum investment amount is $${product.minimumInvestment}`
        );
      }

      // Check balance
      if (storage.walletBalances.usd < data.amount) {
        return createErrorResponse("TRANSACTION_004", "Insufficient balance");
      }

      // Debit wallet
      storage.walletBalances.usd -= data.amount;

      // Calculate maturity date based on term
      const termYears = Number.parseInt(product.term.split(" ")[0]);
      const maturityDate = new Date();
      maturityDate.setFullYear(maturityDate.getFullYear() + termYears);

      // Create investment
      const investment = {
        id: `inv-${generateId()}`,
        name: product.name,
        type: product.name.includes("Bond")
          ? "Government Bond"
          : product.name.includes("Real Estate")
          ? "Real Estate"
          : "SME Financing",
        amount: data.amount,
        purchaseDate: new Date().toISOString(),
        maturityDate: maturityDate.toISOString(),
        expectedReturn: `${product.yield}%`,
        currentValue: data.amount,
        status: "active" as const,
      };

      storage.investments.push(investment);

      // Create transaction record
      const transaction = {
        id: generateId(),
        type: "sent" as const,
        recipientName: `Investment: ${product.name}`,
        amount: data.amount,
        currency: "USD" as const,
        status: "completed" as const,
        date: new Date().toISOString(),
        message: `Investment in ${product.name}`,
        referenceNumber: generateReferenceNumber(),
      };

      storage.transactions.unshift(transaction);

      return createResponse({
        investmentId: investment.id,
        status: investment.status,
        amount: investment.amount,
        expectedReturn: investment.expectedReturn,
        maturityDate: investment.maturityDate,
      });
    },

    async getPortfolio(
      token: string
    ): Promise<ApiResponse<typeof mockInvestments>> {
      await delay(400);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      return createResponse(storage.investments);
    },

    async getInvestment(
      token: string,
      id: string
    ): Promise<ApiResponse<(typeof mockInvestments)[0]>> {
      await delay(300);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const investment = storage.investments.find((i) => i.id === id);
      if (!investment) {
        return createErrorResponse("INVESTMENT_004", "Investment not found");
      }

      return createResponse(investment);
    },

    async getPerformance(
      token: string,
      id: string
    ): Promise<
      ApiResponse<{
        investmentId: string;
        initialAmount: number;
        currentValue: number;
        totalReturn: number;
        returnPercentage: number;
        daysHeld: number;
      }>
    > {
      await delay(300);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const investment = storage.investments.find((i) => i.id === id);
      if (!investment) {
        return createErrorResponse("INVESTMENT_004", "Investment not found");
      }

      // Calculate performance
      const purchaseDate = new Date(investment.purchaseDate);
      const now = new Date();
      const daysHeld = Math.floor(
        (now.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      const totalReturn = investment.currentValue - investment.amount;
      const returnPercentage = (totalReturn / investment.amount) * 100;

      return createResponse({
        investmentId: investment.id,
        initialAmount: investment.amount,
        currentValue: investment.currentValue,
        totalReturn,
        returnPercentage,
        daysHeld,
      });
    },
  },
  bank: {
    async linkAccount(
      token: string,
      data: {
        bankName: string;
        accountType: "checking" | "savings";
        accountNumber: string;
        routingNumber: string;
        accountHolderName: string;
      }
    ): Promise<
      ApiResponse<{
        accountId: string;
        bankName: string;
        accountType: string;
        last4: string;
        status: string;
      }>
    > {
      await delay(1200);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      // Validate account number
      if (data.accountNumber.length < 8) {
        return createErrorResponse("BANK_001", "Invalid account number");
      }

      // Create linked bank account
      const linkedBanks = getLinkedBanks();
      const accountId = `bank-${generateId()}`;
      const last4 = data.accountNumber.slice(-4);

      const bankAccount = {
        id: accountId,
        userId: session.userId,
        bankName: data.bankName,
        accountType: data.accountType,
        accountNumber: data.accountNumber, // In real app, encrypt this
        routingNumber: data.routingNumber,
        accountHolderName: data.accountHolderName,
        last4,
        status: "verified",
        isPrimary: linkedBanks.length === 0,
        linkedAt: new Date().toISOString(),
      };

      linkedBanks.push(bankAccount);
      setLinkedBanks(linkedBanks);

      console.log("[v0] Bank account linked:", bankAccount.bankName, last4);

      return createResponse({
        accountId: bankAccount.id,
        bankName: bankAccount.bankName,
        accountType: bankAccount.accountType,
        last4: bankAccount.last4,
        status: bankAccount.status,
      });
    },

    async getLinkedAccounts(token: string): Promise<ApiResponse<any[]>> {
      await delay(300);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const linkedBanks = getLinkedBanks();
      const userBanks = linkedBanks.filter((b) => b.userId === session.userId);

      // Return sanitized data (no full account numbers)
      const sanitized = userBanks.map((b) => ({
        id: b.id,
        bankName: b.bankName,
        accountType: b.accountType,
        last4: b.last4,
        status: b.status,
        isPrimary: b.isPrimary,
        linkedAt: b.linkedAt,
      }));

      return createResponse(sanitized);
    },

    async removeAccount(
      token: string,
      accountId: string
    ): Promise<ApiResponse<{ message: string }>> {
      await delay(400);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const linkedBanks = getLinkedBanks();
      const index = linkedBanks.findIndex(
        (b) => b.id === accountId && b.userId === session.userId
      );

      if (index === -1) {
        return createErrorResponse("BANK_002", "Bank account not found");
      }

      linkedBanks.splice(index, 1);
      setLinkedBanks(linkedBanks);

      return createResponse({ message: "Bank account removed successfully" });
    },

    async setPrimaryAccount(
      token: string,
      accountId: string
    ): Promise<ApiResponse<{ message: string }>> {
      await delay(300);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      const linkedBanks = getLinkedBanks();
      const userBanks = linkedBanks.filter((b) => b.userId === session.userId);

      // Remove primary from all accounts
      userBanks.forEach((b) => (b.isPrimary = false));

      // Set new primary
      const account = linkedBanks.find(
        (b) => b.id === accountId && b.userId === session.userId
      );
      if (!account) {
        return createErrorResponse("BANK_002", "Bank account not found");
      }

      account.isPrimary = true;
      setLinkedBanks(linkedBanks);

      return createResponse({ message: "Primary account updated" });
    },

    async topUpFromBank(
      token: string,
      data: {
        accountId: string;
        amount: number;
      }
    ): Promise<ApiResponse<WalletBalanceResponse & { transactionId: string }>> {
      await delay(1500); // Simulate ACH processing

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      // Validate bank account
      const linkedBanks = getLinkedBanks();
      const bankAccount = linkedBanks.find(
        (b) => b.id === data.accountId && b.userId === session.userId
      );

      if (!bankAccount) {
        return createErrorResponse("BANK_002", "Bank account not found");
      }

      // Validate amount
      if (data.amount <= 0) {
        return createErrorResponse("WALLET_001", "Invalid amount");
      }

      if (data.amount > 10000) {
        return createErrorResponse(
          "WALLET_002",
          "Amount exceeds maximum limit of $10,000"
        );
      }

      // Credit wallet
      storage.walletBalances.usd += data.amount;

      // Create transaction record
      const transaction = {
        id: generateId(),
        type: "received" as const,
        recipientName: `Top-up from ${bankAccount.bankName} (...${bankAccount.last4})`,
        amount: data.amount,
        currency: "USD" as const,
        status: "completed" as const,
        date: new Date().toISOString(),
        referenceNumber: generateReferenceNumber(),
      };
      storage.transactions.unshift(transaction);

      console.log("[v0] Wallet topped up from bank:", data.amount);

      return createResponse({
        usd: storage.walletBalances.usd,
        etb: storage.walletBalances.etb,
        lastUpdated: new Date().toISOString(),
        transactionId: transaction.id,
      });
    },

    async withdrawToBank(
      token: string,
      data: {
        accountId: string;
        amount: number;
      }
    ): Promise<
      ApiResponse<
        WalletBalanceResponse & {
          transactionId: string;
          estimatedArrival: string;
        }
      >
    > {
      await delay(1500); // Simulate ACH processing

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      // Validate bank account
      const linkedBanks = getLinkedBanks();
      const bankAccount = linkedBanks.find(
        (b) => b.id === data.accountId && b.userId === session.userId
      );

      if (!bankAccount) {
        return createErrorResponse("BANK_002", "Bank account not found");
      }

      // Validate amount
      if (data.amount <= 0) {
        return createErrorResponse("WALLET_001", "Invalid amount");
      }

      // Check balance
      if (storage.walletBalances.usd < data.amount) {
        return createErrorResponse("TRANSACTION_004", "Insufficient balance");
      }

      // Debit wallet
      storage.walletBalances.usd -= data.amount;

      // Create transaction record
      const transaction = {
        id: generateId(),
        type: "sent" as const,
        recipientName: `Withdrawal to ${bankAccount.bankName} (...${bankAccount.last4})`,
        amount: data.amount,
        currency: "USD" as const,
        status: "completed" as const,
        date: new Date().toISOString(),
        referenceNumber: generateReferenceNumber(),
      };
      storage.transactions.unshift(transaction);

      // ACH typically takes 1-3 business days
      const estimatedArrival = new Date(
        Date.now() + 3 * 24 * 60 * 60 * 1000
      ).toISOString();

      console.log("[v0] Withdrawal initiated to bank:", data.amount);

      return createResponse({
        usd: storage.walletBalances.usd,
        etb: storage.walletBalances.etb,
        lastUpdated: new Date().toISOString(),
        transactionId: transaction.id,
        estimatedArrival,
      });
    },

    async verifyMicroDeposits(
      token: string,
      accountId: string,
      amounts: [number, number]
    ): Promise<ApiResponse<{ verified: boolean }>> {
      await delay(800);

      const session = storage.sessions.get(token);
      if (!session || session.expiresAt < Date.now()) {
        return createErrorResponse("AUTH_006", "Invalid or expired session");
      }

      // In real app, verify the micro-deposit amounts
      // For mock, accept any amounts
      const linkedBanks = getLinkedBanks();
      const account = linkedBanks.find(
        (b) => b.id === accountId && b.userId === session.userId
      );

      if (!account) {
        return createErrorResponse("BANK_002", "Bank account not found");
      }

      account.status = "verified";
      setLinkedBanks(linkedBanks);

      return createResponse({ verified: true });
    },
  },
};
