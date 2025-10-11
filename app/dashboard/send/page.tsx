"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Star, ChevronRight } from "@/lib/icons";

export default function SendMoneyPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    loadRecipients();
  }, []);

  useEffect(() => {
    if (searchParams.get("new")) {
      // Came back from add-recipient, reload recipients
      loadRecipients();
      // Remove the query param to clean the URL
      window.history.replaceState({}, "", "/dashboard/send");
    }
  }, [searchParams]);

  const loadRecipients = async () => {
    try {
      const res = await fetch("/api/recipients");
      const data = await res.json();
      if (data.success) {
        // Check for new recipient added recently
        const pendingRecipientData = localStorage.getItem("pendingRecipient");
        let apiRecipients = data.data;
        if (pendingRecipientData) {
          const newRecipient = JSON.parse(pendingRecipientData);
          apiRecipients = [newRecipient, ...apiRecipients];
          localStorage.removeItem("pendingRecipient");
        }
        setRecipients(apiRecipients);
      }
    } catch (error) {
      console.error("[v0] Error loading recipients:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecipients = recipients.filter((recipient: any) =>
    recipient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteRecipients = filteredRecipients.filter(
    (r: any) => r.isFavorite
  );
  const otherRecipients = filteredRecipients.filter((r: any) => !r.isFavorite);

  const handleSelectRecipient = (recipientId: string) => {
    router.push(`/dashboard/send/amount?recipient=${recipientId}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center p-4 min-h-[400px]">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin mx-auto border-4 border-purple-600 border-t-transparent rounded-full" />
          <p className="mt-4 text-gray-600">Loading recipients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6 p-4 pb-20 md:pb-6">
      <div>
        <h1 className="text-2xl font-bold">Send Money</h1>
        <p className="text-muted-foreground">
          Choose a recipient to send money to
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Recipients</CardTitle>
          <CardDescription>
            Find saved recipients or add a new one
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, phone, or account..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-10"
            />
          </div>

          <Button
            onClick={() => router.push("/dashboard/send/add-recipient")}
            className="h-12 w-full gap-2"
            variant="outline"
          >
            <Plus className="h-4 w-4" />
            Add New Recipient
          </Button>
        </CardContent>
      </Card>

      {favoriteRecipients.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-secondary text-secondary" />
              Favorites
            </CardTitle>
            <CardDescription>Your most frequent recipients</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {favoriteRecipients.map((recipient: any) => (
              <button
                key={recipient.id}
                onClick={() => handleSelectRecipient(recipient.id)}
                className="flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-all hover:border-primary hover:bg-primary/5"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={
                      recipient.avatar ||
                      "/generic-placeholder-icon.png?height=48&width=48"
                    }
                  />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {recipient.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{recipient.name}</p>
                    <Badge variant="secondary" className="text-xs">
                      {recipient.accountType === "bank"
                        ? "Bank"
                        : "Mobile Wallet"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {recipient.countryCode} • ****
                    {recipient.accountNumber.slice(-4)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(
                        `/dashboard/send/add-recipient?id=${recipient.id}`
                      );
                    }}
                    className="h-8 px-2 text-xs"
                  >
                    Edit
                  </Button>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </button>
            ))}
          </CardContent>
        </Card>
      )}

      {otherRecipients.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>All Recipients</CardTitle>
            <CardDescription>
              {otherRecipients.length} saved recipients
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {otherRecipients.map((recipient: any) => (
              <button
                key={recipient.id}
                onClick={() => handleSelectRecipient(recipient.id)}
                className="flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-all hover:border-primary hover:bg-primary/5"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={
                      recipient.avatar ||
                      "/generic-placeholder-icon.png?height=48&width=48"
                    }
                  />
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    {recipient.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{recipient.name}</p>
                    <Badge variant="secondary" className="text-xs">
                      {recipient.accountType === "bank"
                        ? "Bank"
                        : "Mobile Wallet"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {recipient.countryCode} • ****
                    {recipient.accountNumber.slice(-4)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(
                        `/dashboard/send/add-recipient?id=${recipient.id}`
                      );
                    }}
                    className="h-8 px-2 text-xs"
                  >
                    Edit
                  </Button>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </button>
            ))}
          </CardContent>
        </Card>
      )}

      {filteredRecipients.length === 0 && searchQuery && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-semibold">No recipients found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different search or add a new recipient
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
