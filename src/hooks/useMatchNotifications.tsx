import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface MatchEvent {
  id: number;
  minute: number;
  type: "goal" | "redCard" | "yellowCard" | "penalty" | "var" | "substitution";
  team: string;
  player: string;
  description: string;
  matchTitle: string;
}

const eventConfig = {
  goal: {
    icon: "⚽",
    title: "GOAL!",
    className: "bg-primary text-primary-foreground",
  },
  redCard: {
    icon: "🟥",
    title: "RED CARD!",
    className: "bg-destructive text-destructive-foreground",
  },
  yellowCard: {
    icon: "🟨",
    title: "Yellow Card",
    className: "bg-accent text-accent-foreground",
  },
  penalty: {
    icon: "⚽",
    title: "PENALTY!",
    className: "bg-primary text-primary-foreground",
  },
  var: {
    icon: "📺",
    title: "VAR Review",
    className: "bg-secondary text-secondary-foreground",
  },
  substitution: {
    icon: "🔄",
    title: "Substitution",
    className: "bg-muted text-muted-foreground",
  },
};

// Simulated live events for demo purposes
const simulatedEvents: MatchEvent[] = [
  {
    id: 1,
    minute: 68,
    type: "goal",
    team: "Arsenal",
    player: "Saka",
    description: "Brilliant curling shot into the top corner!",
    matchTitle: "Arsenal vs Chelsea",
  },
  {
    id: 2,
    minute: 72,
    type: "yellowCard",
    team: "Chelsea",
    player: "Caicedo",
    description: "Tactical foul to stop the counter",
    matchTitle: "Arsenal vs Chelsea",
  },
  {
    id: 3,
    minute: 78,
    type: "redCard",
    team: "Chelsea",
    player: "Mudryk",
    description: "Second yellow for simulation",
    matchTitle: "Arsenal vs Chelsea",
  },
  {
    id: 4,
    minute: 82,
    type: "penalty",
    team: "Arsenal",
    player: "Havertz",
    description: "Penalty converted! Cool finish down the middle",
    matchTitle: "Arsenal vs Chelsea",
  },
  {
    id: 5,
    minute: 85,
    type: "var",
    team: "Arsenal",
    player: "",
    description: "Checking for possible offside...",
    matchTitle: "Arsenal vs Chelsea",
  },
];

export const useMatchNotifications = (enabled: boolean = true) => {
  const eventIndexRef = useRef(0);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!enabled || hasStartedRef.current) return;
    
    hasStartedRef.current = true;

    const showNotification = (event: MatchEvent) => {
      const config = eventConfig[event.type];
      
      toast(
        <div className="flex items-start gap-3">
          <span className="text-2xl">{config.icon}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-display text-lg">{config.title}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-background/20">
                {event.minute}'
              </span>
            </div>
            <p className="font-semibold">{event.team} {event.player && `- ${event.player}`}</p>
            <p className="text-sm opacity-90">{event.description}</p>
            <p className="text-xs opacity-70 mt-1">{event.matchTitle}</p>
          </div>
        </div>,
        {
          duration: 5000,
          className: `${config.className} border-none`,
          position: "top-right",
        }
      );
    };

    // Show first notification after 3 seconds
    const initialDelay = setTimeout(() => {
      if (eventIndexRef.current < simulatedEvents.length) {
        showNotification(simulatedEvents[eventIndexRef.current]);
        eventIndexRef.current++;
      }
    }, 3000);

    // Then show subsequent notifications every 8 seconds
    const interval = setInterval(() => {
      if (eventIndexRef.current < simulatedEvents.length) {
        showNotification(simulatedEvents[eventIndexRef.current]);
        eventIndexRef.current++;
      }
    }, 8000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [enabled]);

  const triggerEvent = (event: MatchEvent) => {
    const config = eventConfig[event.type];
    
    toast(
      <div className="flex items-start gap-3">
        <span className="text-2xl">{config.icon}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-display text-lg">{config.title}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-background/20">
              {event.minute}'
            </span>
          </div>
          <p className="font-semibold">{event.team} {event.player && `- ${event.player}`}</p>
          <p className="text-sm opacity-90">{event.description}</p>
          <p className="text-xs opacity-70 mt-1">{event.matchTitle}</p>
        </div>
      </div>,
      {
        duration: 5000,
        className: `${config.className} border-none`,
        position: "top-right",
      }
    );
  };

  return { triggerEvent };
};
