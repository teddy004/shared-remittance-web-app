# GoozX Remittance Application - Business Functional Flows

## Overview

Goozam (GoozX) is a remittance application designed to empower diaspora users (particularly Ethiopian) to send money securely and efficiently to recipients in Ethiopia and other African/Middle Eastern countries. The platform focuses on trust, speed, and innovative features like purpose-driven payments, community tools, and investment options, differentiating it from traditional remittance services.

The application supports multiple user journeys: onboarding with Know Your Customer (KYC), wallet management, sending/requesting money, and future expansions like investments and an e-commerce marketplace.

This document summarizes the core business functional flows based on the provided design documents, mockups, and Software Requirements Specification (SRS). It aims to provide a clear, understandable overview for developers, stakeholders, and team members.

---

## Core Differentiators

Before diving into flows, here are the unique selling points that make GoozX stand out:

- **Purpose-Driven Transfers**: Users can pay directly for school fees, healthcare, utilities, rent, groceries, or other bills, building trust through transparency.
- **Multi-Channel Disbursement**: Flexible payout options including bank deposits, mobile wallets, cash pickup, and even gift cards/airtime top-ups.
- **Community-Powered Features**: Group contributions (e.g., for weddings/funerals), diaspora crowdfunding, and peer-to-peer (P2P) requests.
- **Smart FX & Transparency**: Real-time exchange rates (e.g., USD to ETB), fee breakdowns, and optional rate-locking to avoid surprises.
- **Diaspora Rewards & Loyalty**: Points system for frequent transfers, redeemable for rewards, with referral bonuses.
- **Biometric + Multi-Language Support**: Fingerprint/face ID login, UI support for English, Amharic, and Oromo.
- **Investment & Savings Gateway**: Enable diaspora to invest in Ethiopian financial products (e.g., government bonds, SME loans) for passive income and economic impact.
- **Diaspora Marketplace**: Direct purchases of goods/services (e.g., groceries, electronics) for family back home, with home delivery or pickup.
- **Trust & Security**: Bank-level encryption, MFA, AML/KYC compliance (FinCEN, National Bank of Ethiopia), and fraud prevention.

These features position GoozX as more than a remittance app— a comprehensive economic bridge for diaspora communities.

---

## High-Level Business Model

- **Revenue Streams**:
  - Transaction fees (starting at 1% for >$100).
  - Commissions from marketplace/e-commerce (3-8%).
  - Investment platform fees.
  - Referral/rewards partnerships.
- **Target Users**: Diaspora (senders) and recipients in Ethiopia/other regions.
- **Supported Currencies**: USD, EUR, GBP → ETB, KES, UGX, etc.
- **Compliance**: Licensed for Ethiopian financial laws, supports ETH, USD payouts.

---

## Core User Functional Flows

Below are the primary user journeys, described step-by-step for clarity. Each flow includes UX screens, system behavior, and backend integration notes.

### 1. Onboarding & KYC Flow

Establishes user identity, enables MFA trust, and sets language preferences for a secure start.

#### Steps:

1. **App Launch (Splash Screen)**:

   - Displays app logo, tagline ("Empowering Cross-Border Connections").
   - "Get Started" button.
   - Language options (English, Amharic, Oromo) that update UI dynamically.
   - System: Localized mockup tests without backend.

2. **Registration/Login**:

   - Register: Email/Phone + Password.
   - Login: Email/Phone + Password.
   - Optional social logins.
   - Backend Logic: Validate uniqueness, generate temporary user ID.

3. **Multi-Factor Authentication (MFA)**:

   - Enter 6-digit OTP sent to email/phone.
   - Numeric keypad, "Resend Code" button.
   - Backend: OTP via Twilio/SendGrid, stored in temporary session.

4. **Language Selection**:

   - Choose preferred language (English, Amharic, Oromo).
   - Updates entire UI for immersion (e.g., sample text in chosen language).
   - Backend: Save preference in user profile.

5. **Profile Setup**:

   - Fields: Full Name, Country, DOB, Nationality, Occupation/PEP status.
   - "Next" button navigates after validation.
   - Backend: Store in user_profile table, validate inputs.

6. **KYC Document Upload**:

   - Upload ID (Passport, Driver's License, National ID), liveness selfie.
   - Progress indicator, malware scan.
   - Backend: Integrate with KYC providers (Sumsub/Onfido), webhook updates status (In Review → Approved/Rejected).

7. **Verification Success**:
   - Congratulatory screen with animations.
   - "Continue" leads to Wallet Dashboard.
   - Features: "Protected by 2-Step Verification" banners.
   - Backend: Enable wallet access on approval.

#### Security & Compliance Notes:

- MFA banners reinforce trust.
- Encryption icons for visual assurance.
- Compliance: FinCEN, National Bank of Ethiopia standards.

#### Expected Outcome:

Users onboard seamlessly in local languages, gaining KYC-verified access to remittance features.

---

### 2. Wallet Dashboard Flow

Acts as the central hub for balances, transactions, and shortcuts to all app features.

#### Steps:

1. **Dashboard Load**:

   - Post-login/onboarding: Fetch wallet data (balances in USD/ETB, recent transactions).
   - Animated balance counter (static in mock).
   - Backend: Retrieve from wallet service, FX rates.

2. **Top-Up Flow**:

   - Click "Top Up": Amount entry + payment method (Visa, PayPal, ACH).
   - Success: Updated balance, confirmation.
   - Backend: Payment API (e.g., Stripe), credit wallet balance + log transaction.

3. **Send Money**: Fulfilled through full Send Money Flow (see Section 3).

4. **Request Money**: Launches Request Money Flow (see Section 4).

5. **View Transactions**:

   - List with filters (Pending, Completed, Failed).
   - Click for details modal.
   - Backend: Query transaction history.

6. **Investment Shortcut**: Preview of Investment Gateway.

   - Featured bonds/funds, annual yields.
   - Mock: Teaser for development.

7. **Gift Shop Shortcut**: Preview of Marketplace.

   - Categories: Groceries, Electronics.
   - Mock: Demonstrates future revenue.

8. **Wallet Sync & Refresh**:

   - After transactions: Re-fetch balances with animations.
   - Backend: API calls to Wallet/Transaction services.

9. **Logout**:
   - Clear session, return to Splash.
   - Backend: Revoke JWT.

#### Key Features:

- Balances toggle between USD/ETB.
- Transaction list includes notes/deposits.
- Action buttons for all major flows.

---

### 3. Send Money Flow

Core transaction engine for remittance, with FX, fees, and personalization.

#### Steps:

1. **Entry & Recipient Selection**:

   - From Dashboard: Click "Send Money".
   - Choose saved recipient or "Add New" (modal for name/phone).
   - Backend: Fetch recipients, validate (bank/wallet checks).

2. **Amount Entry & FX Calculation**:

   - Amount in USD, real-time ETB equivalent (e.g., 1 USD = 56 ETB).
   - Fee breakdown, total cost.
   - Backend: Fetch rates (cached), compute fees via pricing engine.

3. **Add Personal Note**:

   - Optional message field ("Happy Birthday!").
   - Previews in summary.
   - Backend: Append metadata to transaction.

4. **Transaction Summary**:

   - Recipient, amount, FX, fee, note.
   - "Confirm" navigates to success.
   - Backend: Hold funds, discourage cancellation post-init.

5. **Confirmation & Success**:

   - OTP for high-value/large transfers.
   - Success: Deduct balance, update history + notifications.
   - Backend: Commit, debit wallet, notify recipient.

6. **Post-Transaction Actions**:

   - "View Receipt" (localized PDF), "Send Again", "Back to Dashboard".
   - Backend: Generate PDF (with transaction ID), log analytics.

7. **Transaction History Update**:
   - Reflects new entry with status (Created → Settled/Failed).
   - Backend: Push to history and sync across services.

#### Supported Channels:

- Bank Deposit, Mobile Wallet (M-Pesa), Cash Pickup (agents).

#### Notes:

- Idempotent via Idempotency-Key header.
- States: Created, In Review, Authorized, In Flight, Settled, Failed.
- Receipts include settlement details.

---

### 4. Request Money Flow

Enables P2P requests with messaging and status tracking.

#### Steps:

1. **Entry Point**:

   - From Dashboard: Click "Request Money".
   - Select contact (from list or add new via email/phone).
   - Backend: Save new contacts.

2. **Amount Entry**:

   - USD/ETB, optional FX conversion.
   - Expiration date for request.
   - Backend: Store amount, currency.

3. **Add Message**:

   - Personalized text (e.g., "Help cover event costs").
   - Preview integrated.
   - Backend: Attach to request.

4. **Request Summary**:

   - Show contact, amount, message.
   - "Confirm" animation.
   - Backend: Create pending request with unique ID/status (Pending).

5. **Notification to Recipient**:

   - SMS/Email/Push: "Woinshet requested $150".
   - App notification badge.
   - Backend: Multi-channel delivery, track status.

6. **Recipient Action (View Side)**:

   - Inbox: Pending requests with Accept/Decline.
   - Accept: Creates Send Money flow; Declines change status.
   - Backend: Send/Request Service integration.

7. **Status Tracking**:

   - Request list (Pending, Completed, Declined, Expired).
   - Filters/status icons.
   - Backend: Query by user ID, real-time updates.

8. **Sync with History**:
   - Fulfilled requests → Transaction records for both users.
   - Backend: Ledger updates, both parties' histories.

#### Notes:

- Supports retries, dead-letter queues for notifications.
- Community focus: Encourages diaspora reciprocity.

---

## Future Teaser Features (Phase 2)

### Investment Gateway

- User invests diaspora bond ($1000, 7.5% yield) via app.
- Confirm, success with portfolio chart.
- Revenue: Commission; Impact: Capital inflow to Ethiopia.

### Gift & E-commerce Gateway

- Purchase electronics/groceries for recipient.
- Cart, checkout (wallet balance), order confirmation.
- Backend: Partner with Ethiopian retailers; Delivery tracking.

---

## Technical Architecture Summary (From SRS)

- **Backend**: Microservices (Auth, KYC, Transfer, etc.) via API Gateway (REST), Kafka events, Postgres + Redis.
- **Frontend**: React Native (mobile), React (admin); Multi-language (i18n).
- **Security**: JWT, MFA, AES-256, AML screening; NO PAN storage (PCI DSS).
- **Performance**: 99.9% uptime, p95 <500ms for reads, <800ms for transfers.
- **MV P Scope**: Onboarding, Send Money, wallet, notifications, admin.
- **Phase 2**: Request Money, Marketplace, Investments, Rewards.

---

## Conclusion

These flows form a cohesive user experience that prioritizes simplicity, trust, and innovation. The mockups emphasize localized UX, while the SRS ensures robust backend support. For implementation, align development with these steps to build GoozX as a leader in diaspora financial services.
