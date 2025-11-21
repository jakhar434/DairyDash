import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Minus, Plus, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<{ [key: string]: number }>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : {};
  });

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const product = products?.find((p) => p.id === params?.id);
  const cartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const handleAddToCart = () => {
    if (!product) return;
    const newCart = { ...cart, [product.id]: (cart[product.id] || 0) + quantity };
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    toast({
      title: "Added to cart",
      description: `${quantity} ${product.name} added to your cart.`,
    });
    setQuantity(1);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header cartItemCount={cartItemCount} />
        <main className="flex-1 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Skeleton className="aspect-square w-full" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header cartItemCount={cartItemCount} />
        <main className="flex-1 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The product you're looking for doesn't exist.
            </p>
            <Button onClick={() => setLocation("/")} data-testid="button-back-to-shop">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const inStock = Number(product.stock) > 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItemCount={cartItemCount} />
      
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="mb-8 -ml-4"
            data-testid="button-back"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
                data-testid="img-product"
              />
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <Badge variant="secondary" className="mb-3">
                  {product.category}
                </Badge>
                <h1 className="text-4xl font-bold mb-2" data-testid="text-product-name">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary" data-testid="text-product-price">
                    ${Number(product.price).toFixed(2)}
                  </span>
                  {!inStock && (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Stock Available</h2>
                <p className="text-muted-foreground" data-testid="text-stock">
                  {inStock ? `${product.stock} units available` : "Currently out of stock"}
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={!inStock}
                      data-testid="button-decrease-quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium" data-testid="text-quantity">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.min(Number(product.stock), quantity + 1))}
                      disabled={!inStock}
                      data-testid="button-increase-quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className="w-full gap-2"
                  data-testid="button-add-to-cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
