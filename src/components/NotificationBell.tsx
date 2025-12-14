import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, BellOff } from "lucide-react";
import { toast } from "sonner";

interface NotificationBellProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export const NotificationBell = ({ enabled, onToggle }: NotificationBellProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    const newState = !enabled;
    onToggle(newState);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
    
    toast(
      newState 
        ? "🔔 Match notifications enabled" 
        : "🔕 Match notifications disabled",
      {
        duration: 2000,
        position: "top-right",
      }
    );
  };

  return (
    <motion.button
      onClick={handleToggle}
      className={`relative p-2 rounded-full transition-colors ${
        enabled 
          ? "bg-primary/20 text-primary hover:bg-primary/30" 
          : "bg-muted text-muted-foreground hover:bg-muted/80"
      }`}
      whileTap={{ scale: 0.95 }}
      aria-label={enabled ? "Disable notifications" : "Enable notifications"}
    >
      <AnimatePresence mode="wait">
        {enabled ? (
          <motion.div
            key="bell-on"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ 
              scale: 1, 
              rotate: isAnimating ? [0, -15, 15, -10, 10, 0] : 0 
            }}
            exit={{ scale: 0, rotate: 45 }}
            transition={{ duration: 0.3 }}
          >
            <Bell className="w-5 h-5" />
          </motion.div>
        ) : (
          <motion.div
            key="bell-off"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BellOff className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {enabled && (
        <motion.span
          className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-primary rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
};
