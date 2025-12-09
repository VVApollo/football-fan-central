import { motion } from "framer-motion";
import { Clock, MessageCircle, Heart, Share2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const newsItems = [
  {
    id: 1,
    category: "MATCH REPORT",
    title: "Thrilling Derby Ends in Dramatic Late Winner",
    excerpt: "A stoppage-time goal sent fans into delirium as the home side secured all three points in a pulsating encounter.",
    time: "2 hours ago",
    comments: 342,
    likes: 1.2,
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    category: "TACTICAL ANALYSIS",
    title: "How the New Formation is Changing Everything",
    excerpt: "Breaking down the tactical shift that has transformed the team's attacking play this season.",
    time: "5 hours ago",
    comments: 189,
    likes: 856,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    category: "BREAKING NEWS",
    title: "Star Player Signs Contract Extension Until 2029",
    excerpt: "The club confirms a new long-term deal for their captain, ending months of speculation.",
    time: "8 hours ago",
    comments: 567,
    likes: 2.4,
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=600&h=400&fit=crop"
  }
];

export const NewsSection = () => {
  return (
    <section id="news" className="py-24 bg-secondary/30 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              LATEST NEWS
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground">
              NEVER MISS A <span className="text-gradient-gold">STORY</span>
            </h2>
          </div>
          <Button variant="ghost" className="mt-4 md:mt-0">
            View All News
            <ChevronRight className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* News Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {newsItems.map((news, index) => (
            <motion.article
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-gradient-card rounded-xl border border-border/50 overflow-hidden cursor-pointer hover:border-accent/50 hover:shadow-gold transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold">
                  {news.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {news.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-muted-foreground text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {news.time}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {typeof news.likes === 'number' && news.likes >= 1 ? `${news.likes}K` : news.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {news.comments}
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
