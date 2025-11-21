import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Priya Sharma",
    role: "Home Chef",
    content: "Frosteva's ghee is absolutely pure! The bilingual packaging with nutritional info is helpful. I can taste the difference in every spoonful. My family loves it!",
    rating: 5,
    initials: "PS",
  },
  {
    name: "Rajesh Kumar",
    role: "Fitness Enthusiast",
    content: "Finally found authentic, high-quality dairy products online! Frosteva's peanut butter is perfect for my post-workout meals. Love the detailed nutrition labels!",
    rating: 5,
    initials: "RK",
  },
  {
    name: "Anjali Patel",
    role: "Busy Mom",
    content: "Frosteva makes healthy eating convenient for my family. Great pricing, fresh products, and the bilingual packaging helps everyone understand the nutrition. Highly recommended!",
    rating: 5,
    initials: "AP",
  },
  {
    name: "Vikram Singh",
    role: "Health Coach",
    content: "I recommend Frosteva to all my clients. The cold-pressed mustard oil and natural peanut butter with complete nutritional info are exactly what my clients need!",
    rating: 5,
    initials: "VS",
  },
];

export function Reviews() {
  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by Our Customers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what our satisfied customers have to say about The Golden Spoon's premium products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-12 w-12 flex-shrink-0">
                    <AvatarFallback>{review.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{review.name}</h3>
                    <p className="text-sm text-muted-foreground">{review.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  "{review.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
