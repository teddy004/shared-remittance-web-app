"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Clock, CheckCircle2, XCircle, Send } from "@/lib/icons";
import { useRouter } from "next/navigation";

export default function RequestMoneyPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<
    "all" | "pending" | "completed" | "cancelled"
  >("all");
  interface Request {
    id: string;
    fromName: string;
    fromEmail: string;
    amount: number;
    purpose: string;
    description: string;
    status: string;
    dueDate: string;
    createdAt: string;
  }
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      // Demo - no auth required
      const res = await fetch("/api/requests");
      const data = await res.json();
      console.log("[v0] Requests API response:", data);
      if (data.success) {
        setRequests(data.data);
        console.log("[v0] Loaded requests:", data.data.length);
      } else {
        console.error("[v0] API error:", data.error);
        // Fallback to mock data if API fails
        console.log("[v0] Using fallback mock data");
        setRequests([
          {
            id: "req-001",
            fromName: "Sarah Johnson",
            fromEmail: "sarah.j@email.com",
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
            amount: 50.0,
            purpose: "Service Payment",
            description: "Website design consultation",
            status: "cancelled",
            dueDate: "2025-01-08",
            createdAt: "2025-01-02T16:45:00Z",
          },
        ]);
      }
    } catch (error) {
      console.error("[v0] Error loading requests:", error);
      // Fallback to mock data if API fails
      console.log("[v0] Using fallback mock data due to error");
      setRequests([
        {
          id: "req-001",
          fromName: "Sarah Johnson",
          fromEmail: "sarah.j@email.com",
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
          amount: 50.0,
          purpose: "Service Payment",
          description: "Website design consultation",
          status: "cancelled",
          dueDate: "2025-01-08",
          createdAt: "2025-01-02T16:45:00Z",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = requests.filter(
    (req: any) => filter === "all" || req.status === filter
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-secondary/10 text-secondary-foreground";
      case "completed":
        return "bg-success/10 text-success";
      case "cancelled":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center p-4 min-h-[400px]">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin mx-auto border-4 border-purple-600 border-t-transparent rounded-full" />
          <p className="mt-4 text-gray-600">Loading requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6 p-4 pb-20 md:pb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Request Money</h1>
          <p className="text-muted-foreground">
            Create and manage your payment requests
          </p>
        </div>
        <Button
          onClick={() => router.push("/dashboard/request/create")}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          New Request
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { value: "all", label: "All" },
              { value: "pending", label: "Pending" },
              { value: "completed", label: "Completed" },
              { value: "cancelled", label: "Cancelled" },
            ].map((tab) => (
              <Button
                key={tab.value}
                variant={filter === tab.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(tab.value as typeof filter)}
                className="whitespace-nowrap"
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {filteredRequests.length} Request
            {filteredRequests.length !== 1 ? "s" : ""}
          </CardTitle>
          <CardDescription>
            {filter === "all"
              ? "All your payment requests"
              : `${filter.charAt(0).toUpperCase() + filter.slice(1)} requests`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request: any) => (
              <button
                key={request.id}
                onClick={() => router.push(`/dashboard/request/${request.id}`)}
                className="flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-all hover:border-primary hover:bg-primary/5"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={`/generic-placeholder-icon.png?height=48&width=48`}
                  />
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    {request.fromName
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{request.fromName}</p>
                    <p className="text-lg font-bold">
                      ${request.amount.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {request.purpose}
                    </p>
                    <Badge
                      variant="secondary"
                      className={`gap-1 ${getStatusColor(request.status)}`}
                    >
                      {getStatusIcon(request.status)}
                      {request.status.charAt(0).toUpperCase() +
                        request.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Send className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-semibold">No requests found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {filter === "all"
                  ? "Create your first payment request"
                  : `No ${filter} requests`}
              </p>
              <Button
                onClick={() => router.push("/dashboard/request/create")}
                className="mt-4 gap-2"
              >
                <Plus className="h-4 w-4" />
                Create Request
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
