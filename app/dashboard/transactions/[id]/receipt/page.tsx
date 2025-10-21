"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Share2, ArrowLeft, Printer } from "@/lib/icons";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function TransactionReceiptPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const transactionId = params.id as string;

  // Get transaction data from URL parameters or use mock data
  const getTransactionData = () => {
    const referenceNumber = searchParams.get("ref") || "ZMN-2025-001234";
    const amount = searchParams.get("amount") || "100.00";
    const currency = searchParams.get("currency") || "USD";
    const recipientName = searchParams.get("recipient") || "Tigist Alemu";
    const recipientPhone = searchParams.get("phone") || "+251-911-234567";
    const bank = searchParams.get("bank") || "Commercial Bank of Ethiopia";
    const rate = searchParams.get("rate") || "56.8";
    const message = searchParams.get("message") || "For school fees";

    const numericAmount = Number.parseFloat(amount);
    const exchangeRate = Number.parseFloat(rate);
    const transferFee = numericAmount > 100 ? numericAmount * 0.01 : 2.99;
    const receivedAmount = numericAmount * exchangeRate;

    return {
      id: transactionId,
      referenceNumber,
      status: "completed",
      date: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: {
        name: "Demo User",
        email: "demo@goozx.com",
        country: "United States",
      },
      recipient: {
        name: recipientName,
        phone: recipientPhone,
        accountNumber: "1000123456789",
        accountType: "Bank Account",
        bank: bank,
        country: "Ethiopia",
      },
      amount: {
        sent: numericAmount,
        currency: currency,
        received: receivedAmount,
        receivedCurrency: "ETB",
        exchangeRate: exchangeRate,
        fee: transferFee,
        total: numericAmount + transferFee,
      },
      message: message,
      estimatedDelivery: "Within 10 minutes",
      actualDelivery: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const transaction = getTransactionData();

  const handleDownload = () => {
    try {
      console.log("[v0] PDF download button clicked!");

      // Show loading state
      const downloadBtn = document.querySelector(
        "[data-pdf-download]"
      ) as HTMLButtonElement;

      if (downloadBtn) {
        downloadBtn.innerHTML = "⏳ Generating PDF...";
        downloadBtn.disabled = true;
      }

      // Create a simple text-based PDF that always works
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      let yPosition = 30;

      // Header
      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      pdf.text("GOOZ X REMITTANCE", 105, yPosition, { align: "center" });

      yPosition += 15;
      pdf.setFontSize(16);
      pdf.text("TRANSACTION RECEIPT", 105, yPosition, { align: "center" });

      yPosition += 20;

      // Reference Number
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text("Reference Number:", 20, yPosition);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.text(transaction.referenceNumber, 60, yPosition);

      yPosition += 15;

      // Transaction Details
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.text("Transaction Details:", 20, yPosition);

      yPosition += 10;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);

      const details = [
        `You Sent: $${transaction.amount.sent.toFixed(2)} ${
          transaction.amount.currency
        }`,
        `Recipient Gets: ${transaction.amount.received.toLocaleString()} ${
          transaction.amount.receivedCurrency
        }`,
        `Exchange Rate: 1 ${transaction.amount.currency} = ${transaction.amount.exchangeRate} ${transaction.amount.receivedCurrency}`,
        `Service Fee: $${transaction.amount.fee.toFixed(2)}`,
        `Total Paid: $${transaction.amount.total.toFixed(2)}`,
      ];

      details.forEach((detail) => {
        pdf.text(detail, 25, yPosition);
        yPosition += 8;
      });

      yPosition += 10;

      // Sender Information
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.text("Sender Information:", 20, yPosition);

      yPosition += 10;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);

      const senderInfo = [
        `Name: ${transaction.sender.name}`,
        `Email: ${transaction.sender.email}`,
        `Country: ${transaction.sender.country}`,
      ];

      senderInfo.forEach((info) => {
        pdf.text(info, 25, yPosition);
        yPosition += 8;
      });

      yPosition += 10;

      // Recipient Information
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.text("Recipient Information:", 20, yPosition);

      yPosition += 10;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);

      const recipientInfo = [
        `Name: ${transaction.recipient.name}`,
        `Phone: ${transaction.recipient.phone}`,
        `Bank: ${transaction.recipient.bank}`,
        `Account: ${transaction.recipient.accountNumber}`,
        `Country: ${transaction.recipient.country}`,
      ];

      recipientInfo.forEach((info) => {
        pdf.text(info, 25, yPosition);
        yPosition += 8;
      });

      yPosition += 10;

      // Timing
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.text("Transaction Timing:", 20, yPosition);

      yPosition += 10;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);

      pdf.text(`Initiated: ${transaction.date}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Completed: ${transaction.actualDelivery}`, 25, yPosition);

      yPosition += 15;

      // Message (if exists)
      if (transaction.message) {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(12);
        pdf.text("Message:", 20, yPosition);

        yPosition += 10;
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.text(`"${transaction.message}"`, 25, yPosition);
      }

      // Footer
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.setFontSize(8);
      pdf.setTextColor(128, 128, 128);
      pdf.text(
        `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
        20,
        pageHeight - 15
      );

      pdf.text(
        "Thank you for using GoozX Remittance | support@goozx.com | +1-800-GOOZX",
        20,
        pageHeight - 10
      );

      // Download PDF
      const fileName = `GoozX-Receipt-${transaction.referenceNumber}.pdf`;
      console.log("[v0] Saving PDF:", fileName);

      pdf.save(fileName);

      console.log("[v0] PDF downloaded successfully");

      // Reset button
      if (downloadBtn) {
        downloadBtn.innerHTML = "✅ PDF Downloaded";
        setTimeout(() => {
          downloadBtn.innerHTML =
            '<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l4-4m-4 4l-4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Download PDF';
          downloadBtn.disabled = false;
        }, 2000);
      }
    } catch (error) {
      console.error("[v0] Error generating PDF:", error);
      alert(
        `Failed to generate PDF: ${
          error instanceof Error ? error.message : "Unknown error"
        }. Check console for details.`
      );

      // Reset button
      const downloadBtn = document.querySelector(
        "[data-pdf-download]"
      ) as HTMLButtonElement;
      if (downloadBtn) {
        downloadBtn.innerHTML =
          '<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l4-4m-4 4l-4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Download PDF';
        downloadBtn.disabled = false;
      }
    }
  };

  const handleShare = () => {
    // In real app, use Web Share API
    console.log("[v0] Sharing receipt...");
    if (navigator.share) {
      navigator
        .share({
          title: "Transaction Receipt",
          text: `Receipt for transaction ${transaction.referenceNumber}`,
          url: window.location.href,
        })
        .catch((err) => console.log("Error sharing:", err));
    } else {
      alert("Share functionality would be implemented here");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white print:hidden">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Transactions
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Actions - Hide on print */}
        <div className="flex justify-end gap-3 mb-6 print:hidden">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button
            onClick={handleDownload}
            className="bg-primary"
            data-pdf-download
          >
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>

        {/* Receipt Card */}
        <Card
          className="p-8 print:shadow-none print:border-0"
          data-receipt-content
        >
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              Transaction Receipt
            </h1>
            <p className="text-muted-foreground">
              Transfer Completed Successfully
            </p>
          </div>

          {/* Reference Number */}
          <div className="bg-muted/50 rounded-lg p-4 mb-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">
              Reference Number
            </p>
            <p className="text-xl font-mono font-bold text-primary">
              {transaction.referenceNumber}
            </p>
          </div>

          {/* Transaction Details */}
          <div className="space-y-6 mb-6">
            {/* Amount Section */}
            <div className="bg-primary/5 rounded-lg p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">You Sent</p>
                  <p className="text-2xl font-bold text-primary">
                    ${transaction.amount.sent.toFixed(2)}{" "}
                    {transaction.amount.currency}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Recipient Gets
                  </p>
                  <p className="text-2xl font-bold text-success">
                    {transaction.amount.received.toLocaleString()}{" "}
                    {transaction.amount.receivedCurrency}
                  </p>
                </div>
              </div>
            </div>

            {/* Sender Information */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Sender Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{transaction.sender.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">
                    {transaction.sender.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Country</span>
                  <span className="font-medium">
                    {transaction.sender.country}
                  </span>
                </div>
              </div>
            </div>

            {/* Recipient Information */}
            <div>
              <h3 className="font-semibold text-lg mb-3">
                Recipient Information
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">
                    {transaction.recipient.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-medium">
                    {transaction.recipient.phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bank</span>
                  <span className="font-medium">
                    {transaction.recipient.bank}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account</span>
                  <span className="font-medium font-mono">
                    {transaction.recipient.accountNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Country</span>
                  <span className="font-medium">
                    {transaction.recipient.country}
                  </span>
                </div>
              </div>
            </div>

            {/* Transaction Breakdown */}
            <div>
              <h3 className="font-semibold text-lg mb-3">
                Transaction Breakdown
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transfer Amount</span>
                  <span className="font-medium">
                    ${transaction.amount.sent.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Exchange Rate</span>
                  <span className="font-medium">
                    1 {transaction.amount.currency} ={" "}
                    {transaction.amount.exchangeRate}{" "}
                    {transaction.amount.receivedCurrency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span className="font-medium">
                    ${transaction.amount.fee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t font-semibold">
                  <span>Total Paid</span>
                  <span className="text-primary">
                    ${transaction.amount.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Timing Information */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Timing</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Initiated</span>
                  <span className="font-medium">{transaction.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="font-medium text-success">
                    {transaction.actualDelivery}
                  </span>
                </div>
              </div>
            </div>

            {/* Message */}
            {transaction.message && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Message</h3>
                <p className="text-muted-foreground italic">
                  "{transaction.message}"
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-6 border-t text-center text-sm text-muted-foreground">
            <p className="mb-2">Thank you for using GoozX Remittance</p>
            <p>
              For support, contact us at support@goozx.com or call +1-800-GOOZX
            </p>
            <p className="mt-4 text-xs">
              This is an official receipt for your transaction.
            </p>
          </div>
        </Card>

        {/* Help Text */}
        <p className="text-center text-sm text-muted-foreground mt-6 print:hidden">
          Keep this receipt for your records. You can download or print it
          anytime from your transaction history.
        </p>
      </div>
    </div>
  );
}
