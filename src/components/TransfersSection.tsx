import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Clock, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const transfers = [
  {
    id: 1,
    player: "Marcus Sterling",
    from: "Chelsea",
    fromAbbr: "CHE",
    to: "Arsenal",
    toAbbr: "ARS",
    fee: "€45M",
    status: "CONFIRMED",
    time: "Just now"
  },
  {
    id: 2,
    player: "Joao Cancelo",
    from: "Man City",
    fromAbbr: "MCI",
    to: "Barcelona",
    toAbbr: "FCB",
    fee: "Loan",
    status: "OFFICIAL",
    time: "2h ago"
  },
  {
    id: 3,
    player: "Kylian Mbappé",
    from: "PSG",
    fromAbbr: "PSG",
    to: "Real Madrid",
    toAbbr: "RMA",
    fee: "Free",
    status: "RUMOUR",
    time: "4h ago"
  },
  {
    id: 4,
    player: "Viktor Gyökeres",
    from: "Sporting",
    fromAbbr: "SCP",
    to: "Man United",
    toAbbr: "MUN",
    fee: "€80M",
    status: "TALKS",
    time: "6h ago"
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "CONFIRMED":
    case "OFFICIAL":
      return "bg-primary/20 text-primary";
    case "RUMOUR":
      return "bg-accent/20 text-accent";
    case "TALKS":
      return "bg-blue-500/20 text-blue-400";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const TransfersSection = () => {
  return (
    <section id="transfers" className="py-24 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              LIVE TRANSFER NEWS
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground">
              TRANSFER <span className="text-gradient-primary">CENTRAL</span>
            </h2>
          </div>
          <Button variant="default" className="mt-4 md:mt-0">
            <Bell className="w-4 h-4" />
            Get Transfer Alerts
          </Button>
        </motion.div>

        {/* Transfers List */}
        <div className="space-y-4">
          {transfers.map((transfer, index) => (
            <motion.div
              key={transfer.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 8 }}
              className="group bg-gradient-card rounded-xl border border-border/50 p-4 sm:p-6 cursor-pointer hover:border-primary/50 hover:shadow-glow transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Status Badge */}
                <span className={`inline-flex self-start px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(transfer.status)}`}>
                  {transfer.status}
                </span>

                {/* Transfer Info */}
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Player Name */}
                  <h3 className="font-display text-xl sm:text-2xl text-foreground group-hover:text-primary transition-colors">
                    {transfer.player}
                  </h3>

                  {/* Transfer Visual */}
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-xs font-bold">
                        {transfer.fromAbbr}
                      </span>
                      <span className="hidden sm:block text-sm">{transfer.from}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-primary" />
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                        {transfer.toAbbr}
                      </span>
                      <span className="hidden sm:block text-sm">{transfer.to}</span>
                    </div>
                  </div>
                </div>

                {/* Fee & Time */}
                <div className="flex items-center gap-6 sm:gap-8">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    <span className="font-display text-lg text-accent">{transfer.fee}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Clock className="w-4 h-4" />
                    {transfer.time}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ticker Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 py-4 bg-secondary/50 rounded-xl border border-border/50 overflow-hidden"
        >
          <div className="flex animate-ticker">
            {[...transfers, ...transfers].map((transfer, index) => (
              <div key={`${transfer.id}-${index}`} className="flex items-center gap-4 px-8 whitespace-nowrap">
                <span className="font-display text-primary">{transfer.player}</span>
                <span className="text-muted-foreground">→</span>
                <span className="text-foreground">{transfer.to}</span>
                <span className="text-accent font-medium">{transfer.fee}</span>
                <span className="text-muted-foreground">•</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
