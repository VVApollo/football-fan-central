import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Activity, TrendingUp, Circle } from "lucide-react";
import { NotificationBell } from "./NotificationBell";
import { useMatchNotifications } from "@/hooks/useMatchNotifications";

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  minute: number;
  status: "live" | "halftime" | "finished";
  homeColor: string;
  awayColor: string;
}

interface MatchEvent {
  id: number;
  minute: number;
  type: "goal" | "card" | "substitution" | "var";
  team: "home" | "away";
  player: string;
  description: string;
}

interface MatchStat {
  label: string;
  home: number;
  away: number;
}

const liveMatches: Match[] = [
  { id: 1, homeTeam: "Arsenal", awayTeam: "Chelsea", homeScore: 2, awayScore: 1, minute: 67, status: "live", homeColor: "hsl(0 80% 50%)", awayColor: "hsl(220 80% 45%)" },
  { id: 2, homeTeam: "Real Madrid", awayTeam: "Barcelona", homeScore: 1, awayScore: 1, minute: 45, status: "halftime", homeColor: "hsl(0 0% 100%)", awayColor: "hsl(240 100% 25%)" },
  { id: 3, homeTeam: "Bayern Munich", awayTeam: "Dortmund", homeScore: 3, awayScore: 0, minute: 90, status: "finished", homeColor: "hsl(0 80% 50%)", awayColor: "hsl(50 100% 50%)" },
];

const matchEvents: MatchEvent[] = [
  { id: 1, minute: 67, type: "goal", team: "home", player: "Saka", description: "GOAL! Brilliant finish into the bottom corner" },
  { id: 2, minute: 54, type: "card", team: "away", player: "Enzo Fernández", description: "Yellow card for a tactical foul" },
  { id: 3, minute: 45, type: "goal", team: "away", player: "Palmer", description: "Stunning free kick into the top corner" },
  { id: 4, minute: 38, type: "goal", team: "home", player: "Havertz", description: "Header from close range" },
  { id: 5, minute: 23, type: "var", team: "home", player: "", description: "Goal confirmed after VAR review" },
  { id: 6, minute: 12, type: "substitution", team: "away", player: "Mudryk → Madueke", description: "Tactical substitution" },
];

const matchStats: MatchStat[] = [
  { label: "Possession", home: 58, away: 42 },
  { label: "Shots", home: 14, away: 8 },
  { label: "Shots on Target", home: 6, away: 3 },
  { label: "Corners", home: 7, away: 4 },
  { label: "Fouls", home: 9, away: 12 },
];

const getEventIcon = (type: MatchEvent["type"]) => {
  switch (type) {
    case "goal":
      return "⚽";
    case "card":
      return "🟨";
    case "substitution":
      return "🔄";
    case "var":
      return "📺";
    default:
      return "•";
  }
};

const getStatusBadge = (status: Match["status"], minute: number) => {
  switch (status) {
    case "live":
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary/20 text-primary text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          {minute}'
        </span>
      );
    case "halftime":
      return (
        <span className="px-2 py-0.5 rounded bg-accent/20 text-accent text-xs font-semibold">
          HT
        </span>
      );
    case "finished":
      return (
        <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-xs font-semibold">
          FT
        </span>
      );
  }
};

export const MatchCenter = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  useMatchNotifications(notificationsEnabled);
  const featuredMatch = liveMatches[0];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-6 h-6 text-primary" />
              <h2 className="font-display text-4xl sm:text-5xl text-foreground">MATCH CENTER</h2>
            </div>
            <p className="text-muted-foreground">Live scores and real-time updates</p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <NotificationBell 
              enabled={notificationsEnabled} 
              onToggle={setNotificationsEnabled} 
            />
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">3 Live Matches</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Live Matches List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-display text-xl text-foreground mb-4">LIVE NOW</h3>
            {liveMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  match.id === featuredMatch.id
                    ? "bg-card border-primary/50 shadow-glow"
                    : "bg-card/50 border-border hover:border-primary/30"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  {getStatusBadge(match.status, match.minute)}
                  <span className="text-xs text-muted-foreground">Premier League</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Circle className="w-3 h-3" style={{ color: match.homeColor, fill: match.homeColor }} />
                      <span className="font-medium text-foreground">{match.homeTeam}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Circle className="w-3 h-3" style={{ color: match.awayColor, fill: match.awayColor }} />
                      <span className="font-medium text-foreground">{match.awayTeam}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl text-foreground">{match.homeScore}</div>
                    <div className="font-display text-2xl text-foreground">{match.awayScore}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Featured Match - Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h3 className="font-display text-xl text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              MATCH TIMELINE
            </h3>
            <div className="bg-card rounded-xl border border-border p-4 h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[22px] top-0 bottom-0 w-px bg-border" />
                
                <div className="space-y-4">
                  {matchEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4 relative"
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-semibold text-muted-foreground w-8 text-right">
                          {event.minute}'
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-secondary border-2 border-border flex items-center justify-center z-10 text-lg">
                        {getEventIcon(event.type)}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-sm font-semibold ${
                            event.team === "home" ? "text-primary" : "text-accent"
                          }`}>
                            {event.player || "VAR"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Match Statistics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-xl text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              MATCH STATS
            </h3>
            <div className="bg-card rounded-xl border border-border p-6">
              {/* Team Headers */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Circle className="w-4 h-4" style={{ color: featuredMatch.homeColor, fill: featuredMatch.homeColor }} />
                  <span className="font-semibold text-foreground">{featuredMatch.homeTeam}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{featuredMatch.awayTeam}</span>
                  <Circle className="w-4 h-4" style={{ color: featuredMatch.awayColor, fill: featuredMatch.awayColor }} />
                </div>
              </div>

              {/* Stats Bars */}
              <div className="space-y-5">
                {matchStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="font-semibold text-foreground">{stat.home}</span>
                      <span className="text-muted-foreground">{stat.label}</span>
                      <span className="font-semibold text-foreground">{stat.away}</span>
                    </div>
                    <div className="flex gap-1 h-2">
                      <div className="flex-1 flex justify-end">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(stat.home / (stat.home + stat.away)) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className="h-full rounded-l-full bg-primary"
                        />
                      </div>
                      <div className="flex-1">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(stat.away / (stat.home + stat.away)) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className="h-full rounded-r-full bg-accent"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Live Commentary Indicator */}
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-muted-foreground">Live commentary active</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
