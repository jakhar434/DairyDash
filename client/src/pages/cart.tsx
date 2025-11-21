import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import type { Product } from "@shared/schema";

export default function Cart() {
  const [, setLocation] = useLocation();
  const [cart, setCart] = useState<{ [key: string]: number }>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : {};
  });

  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const cartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

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

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      const newCart = { ...cart };
      delete newCart[productId];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      const newCart = { ...cart, [productId]: newQuantity };
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  const removeItem = (productId: string) => {
    const newCart = { ...cart };
    delete newCart[productId];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItemCount={cartItemCount} />
      
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <ShoppingBag className="h-24 w-24 text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">
                  Add some products to get started
                </p>
                <Button onClick={() => setLocation("/")} data-testid="button-continue-shopping">
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map(({ product, quantity }) => (
                  <Card key={product.id}>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            data-testid={`img-cart-${product.id}`}
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg mb-1" data-testid={`text-cart-name-${product.id}`}>
                            {product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {product.category}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(product.id, quantity - 1)}
                                data-testid={`button-decrease-${product.id}`}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center font-medium" data-testid={`text-quantity-${product.id}`}>
                                {quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(product.id, quantity + 1)}
                                data-testid={`button-increase-${product.id}`}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(product.id)}
                              className="text-destructive hover:text-destructive gap-2"
                              data-testid={`button-remove-${product.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                              Remove
                            </Button>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary" data-testid={`text-price-${product.id}`}>
                            ${(Number(product.price) * quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${Number(product.price).toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium" data-testid="text-subtotal">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-medium text-green-600">Free</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between">
                          <span className="text-lg font-semibold">Total</span>
                          <span className="text-lg font-bold text-primary" data-testid="text-total">
                            ${subtotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => setLocation("/checkout")}
                      data-testid="button-checkout"
                    >
                      Proceed to Checkout
                    </Button>
                    
                    <Button
                      variant="ghost"
                      className="w-full mt-2"
                      onClick={() => setLocation("/")}
                      data-testid="button-continue"
                    >
                      Continue Shopping
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
