import { motion } from "framer-motion";
import { Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const clubs = [
  { name: "Manchester United", members: "245K", color: "#DA291C", abbr: "MUN" },
  { name: "Real Madrid", members: "312K", color: "#FEBE10", abbr: "RMA" },
  { name: "Barcelona", members: "289K", color: "#A50044", abbr: "FCB" },
  { name: "Liverpool", members: "198K", color: "#C8102E", abbr: "LIV" },
  { name: "Bayern Munich", members: "167K", color: "#DC052D", abbr: "BAY" },
  { name: "Manchester City", members: "156K", color: "#6CABDD", abbr: "MCI" },
  { name: "Juventus", members: "143K", color: "#000000", abbr: "JUV" },
  { name: "Paris Saint-Germain", members: "178K", color: "#004170", abbr: "PSG" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const ClubsSection = () => {
  return (
    <section id="clubs" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            CLUB COMMUNITIES
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground mb-4">
            JOIN YOUR <span className="text-gradient-primary">TRIBE</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find your club, connect with fellow supporters, and be part of the conversation.
          </p>
        </motion.div>

        {/* Clubs Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {clubs.map((club) => (
            <motion.div
              key={club.abbr}
              variants={item}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group relative bg-gradient-card rounded-xl border border-border/50 p-6 cursor-pointer overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-glow"
            >
              {/* Club Color Accent */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: club.color }}
              />
              
              {/* Club Badge Placeholder */}
              <div 
                className="w-16 h-16 rounded-xl mb-4 flex items-center justify-center font-display text-xl"
                style={{ backgroundColor: `${club.color}20`, color: club.color }}
              >
                {club.abbr}
              </div>
              
              <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                {club.name}
              </h3>
              
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Users className="w-4 h-4" />
                <span>{club.members} members</span>
              </div>
              
              {/* Hover Arrow */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-5 h-5 text-primary" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            View All 500+ Clubs
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
