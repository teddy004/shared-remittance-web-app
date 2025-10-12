# 🌍 GoozX - Ethiopian Remittance & Financial Services Platform

A comprehensive remittance and financial services web application built with Next.js, designed specifically for the Ethiopian market. This platform enables seamless money transfers, bill payments, investments, and currency exchange services.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Quick Start Guide](#quick-start-guide)
- [Detailed Setup Instructions](#detailed-setup-instructions)
  - [Method 1: Clone from GitHub](#method-1-clone-from-github)
  - [Method 2: Download ZIP File](#method-2-download-zip-file)
- [Installation & Running](#installation--running)
- [Project Structure](#project-structure)
- [Features Overview](#features-overview)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🚀 Project Overview

GoozX is a modern remittance platform that provides:

- **Money Transfers** - Send money to Ethiopia securely
- **Bill Payments** - Pay school fees, healthcare, utilities
- **Investment Opportunities** - Invest in Ethiopian bonds and real estate
- **Currency Exchange** - Compare rates across Ethiopian banks
- **Gift Services** - Send groceries, electronics, and gift cards
- **Request Money** - Easy money requests with shareable links

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

- **Node.js**: Version 18.0.0 or higher (LTS recommended)
- **Git**: For cloning the repository
- **Package Manager**: npm (comes with Node.js) or yarn/pnpm

### System Requirements

- **Windows**: Windows 10 or higher
- **macOS**: macOS 10.15 or higher
- **Linux**: Ubuntu 18.04+, CentOS 7+, or similar

## ⚡ Quick Start Guide

### Step 1: Check Node.js Version

\`\`\`bash
node --version
\`\`\`
Should show: `v18.0.0` or higher

### Step 2: Clone or Download

Choose one of the methods below:

**Option A: Clone with Git**
\`\`\`bash
git clone https://github.com/teddy004/shared-remittance-web-app.git
cd shared-remittance-web-app
\`\`\`

**Option B: Download ZIP**

1. Go to: https://github.com/teddy004/shared-remittance-web-app
2. Click "Code" → "Download ZIP"
3. Extract the ZIP file
4. Open terminal in the extracted folder

### Step 3: Install Dependencies

\`\`\`bash
npm install
\`\`\`

### Step 4: Run Development Server

\`\`\`bash
npm run dev
\`\`\`

### Step 5: Open in Browser

Visit: http://localhost:3000

## 📖 Detailed Setup Instructions

### Method 1: Clone from GitHub

#### For Windows Users:

1. **Install Git** (if not already installed):

   - Download from: https://git-scm.com/download/win
   - Run the installer and follow the setup wizard

2. **Open Command Prompt or PowerShell**:

   - Press `Win + R`, type `cmd` or `powershell`, press Enter

3. **Clone the repository**:
   \`\`\`cmd
   git clone https://github.com/teddy004/shared-remittance-web-app.git
   cd shared-remittance-web-app
   \`\`\`

4. **Install dependencies**:
   \`\`\`cmd
   npm install
   \`\`\`

5. **Run the application**:
   \`\`\`cmd
   npm run dev
   \`\`\`

#### For macOS Users:

1. **Open Terminal**:

   - Press `Cmd + Space`, type "Terminal", press Enter

2. **Clone the repository**:
   \`\`\`bash
   git clone https://github.com/teddy004/shared-remittance-web-app.git
   cd shared-remittance-web-app
   \`\`\`

3. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

4. **Run the application**:
   \`\`\`bash
   npm run dev
   \`\`\`

#### For Linux Users:

1. **Open Terminal**:

   - Press `Ctrl + Alt + T` (Ubuntu/Debian)
   - Or search for "Terminal" in applications

2. **Update package manager**:
   \`\`\`bash
   sudo apt update # Ubuntu/Debian

   # or

   sudo yum update # CentOS/RHEL
   \`\`\`

3. **Install Git** (if not installed):
   \`\`\`bash
   sudo apt install git # Ubuntu/Debian

   # or

   sudo yum install git # CentOS/RHEL
   \`\`\`

4. **Clone the repository**:
   \`\`\`bash
   git clone https://github.com/teddy004/shared-remittance-web-app.git
   cd shared-remittance-web-app
   \`\`\`

5. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

6. **Run the application**:
   \`\`\`bash
   npm run dev
   \`\`\`

### Method 2: Download ZIP File

#### For Windows Users:

1. **Download ZIP**:

   - Go to: https://github.com/teddy004/shared-remittance-web-app
   - Click "Code" → "Download ZIP"

2. **Extract the ZIP**:

   - Right-click the downloaded file
   - Select "Extract All..."
   - Choose a destination folder

3. **Open Command Prompt**:

   - Navigate to the extracted folder:
     \`\`\`cmd
     cd path/to/extracted/folder
     \`\`\`

4. **Install dependencies**:
   \`\`\`cmd
   npm install
   \`\`\`

5. **Run the application**:
   \`\`\`cmd
   npm run dev
   \`\`\`

#### For macOS Users:

1. **Download ZIP**:

   - Go to: https://github.com/teddy004/shared-remittance-web-app
   - Click "Code" → "Download ZIP"

2. **Extract the ZIP**:

   - Double-click the ZIP file to extract
   - Or use Terminal:
     \`\`\`bash
     unzip shared-remittance-web-app.zip
     cd shared-remittance-web-app
     \`\`\`

3. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

4. **Run the application**:
   \`\`\`bash
   npm run dev
   \`\`\`

#### For Linux Users:

1. **Download ZIP**:

   - Go to: https://github.com/teddy004/shared-remittance-web-app
   - Click "Code" → "Download ZIP"

2. **Extract the ZIP**:
   \`\`\`bash
   unzip shared-remittance-web-app.zip
   cd shared-remittance-web-app
   \`\`\`

3. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

4. **Run the application**:
   \`\`\`bash
   npm run dev
   \`\`\`

## 🔧 Installation & Running

### 1. Install Dependencies

After cloning or extracting, install the required packages:

\`\`\`bash
npm install
\`\`\`

This will install all necessary dependencies including:

- Next.js 15.5.4
- React 18+
- TypeScript
- Tailwind CSS
- Radix UI components
- Lucide React icons

### 2. Environment Setup (Optional)

For production deployment, you might need to set up environment variables:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` with your specific configuration.

### 3. Run Development Server

Start the development server:

\`\`\`bash
npm run dev
\`\`\`

The application will be available at:

- **Local**: http://localhost:3000
- **Network**: http://192.168.x.x:3000 (accessible from other devices on your network)

### 4. Build for Production

To create a production build:

\`\`\`bash
npm run build
npm start
\`\`\`

## 📁 Project Structure

```
shared-remittance-web-app/
├── app/                    # Next.js 13+ app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── onboarding/        # User onboarding flow
│   └── [locale]/          # Internationalization
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── ...               # Feature-specific components
├── lib/                  # Utility libraries
│   ├── api-client.ts     # API client configuration
│   ├── exchange-rates.ts # Currency exchange logic
│   └── ...               # Other utilities
├── public/               # Static assets
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## ✨ Features Overview

### 🏠 Dashboard

- **Account Overview** - Balance display and quick actions
- **Currency Calculator** - Real-time currency conversion
- **Recent Transactions** - Transaction history
- **Quick Actions** - Easy access to all services

### 💸 Money Transfer

- **Send Money** - Transfer to Ethiopian bank accounts and mobile wallets
- **Request Money** - Generate shareable payment links
- **Real-time Tracking** - Monitor transaction status

### 🏦 Financial Services

- **Bill Payments** - School fees, healthcare, utilities
- **Investment Gateway** - Ethiopian bonds and real estate
- **Exchange Rates** - Compare rates across 8+ Ethiopian banks

### 🎁 Additional Services

- **Gift Shop** - Send groceries, electronics, gift cards
- **Credit Scoring** - Transaction-based credit evaluation
- **Multi-language Support** - English, Amharic, Afaan Oromoo

## 🔧 Development Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Create production build
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint
- \`npm run type-check\` - Run TypeScript type checking

## 🛠️ Troubleshooting

### Common Issues:

#### 1. "Node.js version not supported"

**Solution**: Update Node.js to version 18.0.0 or higher
\`\`\`bash

# Using nvm (recommended)

nvm install 18
nvm use 18

# Or download from nodejs.org

\`\`\`

#### 2. "Port 3000 already in use"

**Solution**: The port is busy, use a different port:
\`\`\`bash
npm run dev -- --port 3001

# or

npx next dev -p 3001
\`\`\`

#### 3. "Module not found" errors

**Solution**: Install dependencies again:
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

#### 4. Build errors

**Solution**: Clear Next.js cache:
\`\`\`bash
rm -rf .next
npm run dev
\`\`\`

#### 5. TypeScript errors

**Solution**: Check your Node.js and TypeScript versions:
\`\`\`bash
node --version
npm list typescript
\`\`\`

### Getting Help:

1. **Check the console output** for specific error messages
2. **Verify all prerequisites** are installed correctly
3. **Clear cache** if you encounter build issues
4. **Restart the development server** if changes don't reflect

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**: \`git checkout -b feature-name\`
3. **Make your changes**
4. **Test thoroughly**
5. **Submit a pull request**

### Development Guidelines:

- Follow TypeScript best practices
- Use meaningful commit messages
- Update documentation for new features
- Ensure responsive design for all screen sizes

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- UI components from [Radix UI](https://www.radix-ui.com/)

---

**Need help?** Create an issue on GitHub or reach out to the development team.

**Happy coding! 🚀**
