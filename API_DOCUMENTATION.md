# GoozX Remittance API Documentation

Complete mock API documentation for the GoozX remittance application.

## Base URL

All API endpoints are prefixed with `/api`

## Authentication

Most endpoints require authentication via Bearer token in the Authorization header:

\`\`\`
Authorization: Bearer <token>
\`\`\`

## API Endpoints

### Authentication

#### POST /api/auth/register
Register a new user account.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "phone": "+1-555-0123",
  "password": "SecurePass123",
  "fullName": "John Doe"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-123",
      "email": "user@example.com",
      "name": "John Doe",
      "kycStatus": "pending"
    },
    "token": "mock_token_abc123",
    "refreshToken": "refresh_mock_token_abc123",
    "expiresIn": 604800
  }
}
\`\`\`

#### POST /api/auth/login
Login to existing account.

#### POST /api/auth/otp/send
Send OTP to email for verification.

#### POST /api/auth/otp/verify
Verify OTP code.

### User Profile

#### GET /api/user/profile
Get current user profile (requires auth).

#### PATCH /api/user/profile
Update user profile (requires auth).

### Wallet

#### GET /api/wallet/balance
Get wallet balances in USD and ETB.

#### POST /api/wallet/topup
Add funds to wallet.

**Request Body:**
\`\`\`json
{
  "amount": 100,
  "currency": "USD",
  "paymentMethod": "card"
}
\`\`\`

### Transactions

#### GET /api/transactions
Get all transactions with optional filters.

**Query Parameters:**
- `status`: Filter by status (completed, pending, failed)
- `type`: Filter by type (sent, received, request)
- `limit`: Limit number of results

#### POST /api/transactions
Create a new transaction (send money).

#### GET /api/transactions/:id
Get specific transaction details.

### FX Rates

#### GET /api/fx/rate?from=USD&to=ETB
Get exchange rate between currencies.

#### GET /api/fx/convert?from=USD&to=ETB&amount=100
Calculate currency conversion with fees.

### Recipients

#### GET /api/recipients
Get all saved recipients.

#### POST /api/recipients
Add new recipient.

#### GET /api/recipients/:id
Get specific recipient.

#### PATCH /api/recipients/:id
Update recipient details.

#### DELETE /api/recipients/:id
Delete recipient.

#### POST /api/recipients/:id/favorite
Toggle recipient favorite status.

### Money Requests

#### GET /api/requests
Get all money requests.

#### POST /api/requests
Create new money request.

#### GET /api/requests/:id
Get specific request details.

#### POST /api/requests/:id/accept
Accept a money request.

#### POST /api/requests/:id/decline
Decline a money request.

#### POST /api/requests/:id/cancel
Cancel your own money request.

### Send Money Flow

#### POST /api/send/validate-recipient
Validate recipient before sending.

#### POST /api/send/calculate-fees
Calculate fees for transaction.

#### POST /api/send/initiate
Initiate send money transaction.

#### POST /api/send/confirm
Confirm and complete transaction.

### KYC

#### GET /api/kyc/status
Get KYC verification status.

#### POST /api/kyc/submit
Submit KYC documents.

**Request Body:**
\`\`\`json
{
  "documentType": "passport",
  "documentNumber": "AB123456",
  "documentFrontImage": "base64_or_url",
  "selfieImage": "base64_or_url",
  "dateOfBirth": "1990-01-01",
  "nationality": "Ethiopian",
  "address": "123 Main St"
}
\`\`\`

#### POST /api/kyc/upload
Upload individual KYC document.

#### POST /api/kyc/resubmit
Resubmit rejected KYC application.

### Compliance

#### POST /api/compliance/sanctions-check
Check user against sanctions lists.

#### POST /api/compliance/aml-check
Perform AML check on transaction.

#### POST /api/compliance/report-suspicious
Report suspicious activity.

#### GET /api/compliance/limits
Get transaction limits for user.

### Marketplace (Bill Payments)

#### GET /api/marketplace/providers
Get all service providers.

**Query Parameters:**
- `category`: Filter by category (education, healthcare, utilities, rent, groceries)

#### GET /api/marketplace/providers/:id
Get specific service provider.

#### POST /api/marketplace/pay-bill
Pay bill to service provider.

**Request Body:**
\`\`\`json
{
  "providerId": "provider-123",
  "recipientId": "recipient-456",
  "amount": 150,
  "accountNumber": "ACC123456",
  "purpose": "School Fees",
  "notes": "Semester 1 payment"
}
\`\`\`

#### GET /api/marketplace/payments
Get all bill payment history.

### Gift Shop

#### GET /api/gifts/products
Get all gift products.

**Query Parameters:**
- `category`: Filter by category (groceries, electronics, gift_cards, health, education)

#### GET /api/gifts/products/:id
Get specific product details.

#### POST /api/gifts/purchase
Purchase gift for recipient.

**Request Body:**
\`\`\`json
{
  "productId": "product-123",
  "recipientId": "recipient-456",
  "quantity": 1,
  "deliveryType": "home_delivery",
  "deliveryAddress": "123 Main St, Addis Ababa",
  "message": "Happy Birthday!"
}
\`\`\`

#### GET /api/gifts/orders
Get all gift orders.

#### GET /api/gifts/orders/:id
Get specific order details.

#### GET /api/gifts/orders/:id/track
Track order delivery status.

### Investments

#### GET /api/investments/products
Get all investment products.

**Query Parameters:**
- `riskLevel`: Filter by risk level (low, medium, high)

#### GET /api/investments/products/:id
Get specific investment product.

#### POST /api/investments/invest
Make an investment.

**Request Body:**
\`\`\`json
{
  "productId": "investment-123",
  "amount": 5000
}
\`\`\`

#### GET /api/investments/portfolio
Get user's investment portfolio.

#### GET /api/investments/portfolio/:id
Get specific investment details.

#### GET /api/investments/portfolio/:id/performance
Get investment performance metrics.

## Error Codes

- `AUTH_001`: Email already registered
- `AUTH_002`: Invalid credentials
- `AUTH_003`: OTP not found or expired
- `AUTH_004`: OTP expired
- `AUTH_005`: Invalid OTP
- `AUTH_006`: Invalid or expired session
- `AUTH_007`: No authorization token provided
- `USER_001`: User not found
- `WALLET_001`: Invalid amount
- `WALLET_002`: Amount exceeds maximum limit
- `TRANSACTION_001`: Transaction not found
- `TRANSACTION_002`: Recipient not found
- `TRANSACTION_003`: Invalid amount
- `TRANSACTION_004`: Insufficient balance
- `RECIPIENT_001`: Recipient not found
- `RECIPIENT_002`: Invalid phone number
- `REQUEST_001`: Money request not found
- `REQUEST_002`: Invalid amount
- `REQUEST_003`: Due date must be in the future
- `REQUEST_004`: Request is not pending
- `REQUEST_005`: Request has expired
- `KYC_001`: Invalid document type
- `KYC_002`: Missing required documents
- `KYC_003`: No previous submission found
- `KYC_004`: Can only resubmit rejected applications
- `FX_001`: Exchange rate not available
- `MARKETPLACE_001`: Service provider not found
- `GIFT_001`: Product not found
- `GIFT_002`: Invalid delivery type
- `GIFT_003`: Order not found
- `INVESTMENT_001`: Investment product not found
- `INVESTMENT_002`: KYC verification required
- `INVESTMENT_003`: Below minimum investment amount
- `INVESTMENT_004`: Investment not found
- `SERVER_ERROR`: Internal server error

## Testing

All APIs include simulated delays (200-1500ms) to mimic real network conditions. OTP codes are logged to console for testing purposes.

For high-value transactions (>$500), OTP verification is required. The system auto-approves KYC submissions after 5 seconds for testing.
