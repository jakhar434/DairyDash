import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Leaf, Truck, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";
// Hero image is served from public folder

export default function Home() {
  const { toast } = useToast();
  const [cart, setCart] = useState<{ [key: string]: number }>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : {};
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const categories = ["All", "Dairy", "Oils", "Spreads"];

  const filteredProducts = products?.filter(
    (product) => selectedCategory === "All" || product.category === selectedCategory
  );

  const cartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const handleAddToCart = (product: Product) => {
    const newCart = { ...cart, [product.id]: (cart[product.id] || 0) + 1 };
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItemCount={cartItemCount} />
      
      <main className="flex-1">
        <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/rustic_farm_dairy_hero_image.png"
              alt="Fresh dairy products"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Farm Fresh{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Dairy & Condiments
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Premium quality products sourced from local farms. Experience the pure taste of nature in every bite.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#products">
                <Button size="lg" className="text-lg px-8" data-testid="button-shop-now">
                  Shop Now
                </Button>
              </a>
              <a href="#features">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 bg-background/20 backdrop-blur-md border-white/30 text-white hover:bg-background/30"
                  data-testid="button-learn-more"
                >
                  Learn More
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">100% Natural</h3>
                <p className="text-muted-foreground">
                  No artificial preservatives or additives. Pure and wholesome products.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
                <p className="text-muted-foreground">
                  Rigorous quality checks ensure you get the best products every time.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Quick and reliable delivery to keep your products fresh.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Premium Collection
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover our range of carefully crafted dairy products and artisanal condiments
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className="cursor-pointer px-4 py-2 text-sm font-medium hover-elevate active-elevate-2"
                  onClick={() => setSelectedCategory(category)}
                  data-testid={`button-category-${category.toLowerCase()}`}
                >
                  {category}
                </Badge>
              ))}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No products found in this category.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
