import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import type { Order } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function AdminOrders() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      setLocation("/admin");
    }
  }, [setLocation]);

  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      return await apiRequest("PATCH", `/api/orders/${orderId}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      toast({
        title: "Status updated",
        description: "Order status has been updated successfully",
      });
    },
  });

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={sidebarStyle as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center gap-4 border-b px-6 py-4">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <h1 className="text-2xl font-bold">Orders Management</h1>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>All Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-3">
                      {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full" />
                      ))}
                    </div>
                  ) : orders && orders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.map((order) => {
                            const items = JSON.parse(order.items);
                            return (
                              <TableRow key={order.id} data-testid={`row-order-${order.id}`}>
                                <TableCell className="font-medium">
                                  <div>
                                    <p>{order.customerName}</p>
                                    <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                      {order.customerAddress}
                                    </p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="text-sm">
                                    <p className="truncate max-w-[150px]">{order.customerEmail}</p>
                                    <p className="text-muted-foreground">{order.customerPhone}</p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="text-sm">
                                    {items.slice(0, 2).map((item: any, idx: number) => (
                                      <p key={idx} className="truncate max-w-[150px]">
                                        {item.productName} × {item.quantity}
                                      </p>
                                    ))}
                                    {items.length > 2 && (
                                      <p className="text-muted-foreground">
                                        +{items.length - 2} more
                                      </p>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell className="font-bold text-primary">
                                  ${Number(order.total).toFixed(2)}
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant={
                                      order.status === "completed"
                                        ? "default"
                                        : order.status === "pending"
                                        ? "secondary"
                                        : "outline"
                                    }
                                  >
                                    {order.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                  {new Date(order.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                  <Select
                                    value={order.status}
                                    onValueChange={(status) =>
                                      updateStatusMutation.mutate({ orderId: order.id, status })
                                    }
                                  >
                                    <SelectTrigger
                                      className="w-32"
                                      data-testid={`select-status-${order.id}`}
                                    >
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="processing">Processing</SelectItem>
                                      <SelectItem value="shipped">Shipped</SelectItem>
                                      <SelectItem value="completed">Completed</SelectItem>
                                      <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No orders yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
