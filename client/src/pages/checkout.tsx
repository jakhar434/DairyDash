import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import type { Product } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [cart, setCart] = useState<{ [key: string]: number }>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : {};
  });

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
  });

  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const cartItems = Object.entries(cart)
    .map(([productId, quantity]) => {
      const product = products?.find((p) => p.id === productId);
      return product ? { product, quantity } : null;
    })
    .filter((item): item is { product: Product; quantity: number } => item !== null);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      return await apiRequest("POST", "/api/orders", orderData);
    },
    onSuccess: () => {
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your order. We'll contact you soon.",
      });
      localStorage.removeItem("cart");
      setCart({});
      setLocation("/");
    },
    onError: () => {
      toast({
        title: "Order failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    const orderItems = cartItems.map(({ product, quantity }) => ({
      productId: product.id,
      productName: product.name,
      quantity,
      price: product.price,
    }));

    createOrderMutation.mutate({
      ...formData,
      items: JSON.stringify(orderItems),
      total: subtotal.toFixed(2),
      status: "pending",
    });
  };

  const cartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header cartItemCount={cartItemCount} />
        <main className="flex-1 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Add some products before proceeding to checkout.
            </p>
            <Button onClick={() => setLocation("/")} data-testid="button-back-to-shop">
              Back to Shop
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItemCount={cartItemCount} />
      
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.customerName}
                        onChange={(e) =>
                          setFormData({ ...formData, customerName: e.target.value })
                        }
                        placeholder="John Doe"
                        data-testid="input-name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.customerEmail}
                        onChange={(e) =>
                          setFormData({ ...formData, customerEmail: e.target.value })
                        }
                        placeholder="john@example.com"
                        data-testid="input-email"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.customerPhone}
                        onChange={(e) =>
                          setFormData({ ...formData, customerPhone: e.target.value })
                        }
                        placeholder="+1 (555) 123-4567"
                        data-testid="input-phone"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Shipping Address *</Label>
                      <Textarea
                        id="address"
                        required
                        value={formData.customerAddress}
                        onChange={(e) =>
                          setFormData({ ...formData, customerAddress: e.target.value })
                        }
                        placeholder="123 Main St, Apartment 4B, City, State, ZIP"
                        rows={4}
                        data-testid="input-address"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {cartItems.map(({ product, quantity }) => (
                        <div
                          key={product.id}
                          className="flex justify-between text-sm"
                          data-testid={`order-item-${product.id}`}
                        >
                          <span className="text-muted-foreground">
                            {product.name} × {quantity}
                          </span>
                          <span className="font-medium">
                            ${(Number(product.price) * quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}

                      <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between mb-2">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span className="font-medium">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-muted-foreground">Shipping</span>
                          <span className="font-medium text-green-600">Free</span>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between">
                            <span className="text-lg font-semibold">Total</span>
                            <span className="text-lg font-bold text-primary" data-testid="text-checkout-total">
                              ${subtotal.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={createOrderMutation.isPending}
                      data-testid="button-place-order"
                    >
                      {createOrderMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Placing Order...
                        </>
                      ) : (
                        "Place Order"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
