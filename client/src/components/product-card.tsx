import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import type { Product, ProductVariant } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, variant?: ProductVariant) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const inStock = Number(product.stock) > 0;
  const variants: ProductVariant[] = product.variants ? JSON.parse(product.variants) : [];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    variants.length > 0 ? variants[0] : null
  );

  const displayPrice = selectedVariant ? Number(selectedVariant.price) : Number(product.price);

  return (
    <Card className="group hover-elevate overflow-hidden flex flex-col h-full">
      <Link href={`/product/${product.id}`}>
        <a className="block" data-testid={`link-product-${product.id}`}>
          <div className="aspect-square overflow-hidden bg-muted">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              data-testid={`img-product-${product.id}`}
            />
          </div>
        </a>
      </Link>

      <CardContent className="flex-1 p-4 pb-2">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs font-medium">
            {product.category}
          </Badge>
        </div>
        <Link href={`/product/${product.id}`}>
          <a data-testid={`text-product-name-${product.id}`}>
            <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </a>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        
        {variants.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={`px-2 py-1 text-xs rounded border transition-colors ${
                  selectedVariant?.id === variant.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-muted-foreground text-muted-foreground hover:border-primary"
                }`}
                data-testid={`button-variant-${variant.id}`}
              >
                {variant.name}
              </button>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-2 flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-primary" data-testid={`text-price-${product.id}`}>
            ₹{displayPrice}
          </span>
          {!inStock && (
            <span className="text-xs text-destructive font-medium">Out of Stock</span>
          )}
        </div>
        <Button
          onClick={() => onAddToCart?.(product, selectedVariant || undefined)}
          disabled={!inStock}
          size="default"
          className="gap-2"
          data-testid={`button-add-to-cart-${product.id}`}
        >
          <ShoppingCart className="h-4 w-4" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
