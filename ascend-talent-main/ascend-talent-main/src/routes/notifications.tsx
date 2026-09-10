import { createFileRoute } from "@tanstack/react-router";
import { Bell, X, Check, MessageSquare, DollarSign, Star, Shield, Briefcase, FileText, Award } from "lucide-react";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications | Orbitwork" },
      { name: "description", content: "View all your notifications" },
    ],
  }),
  component: Notifications,
});

const allNotifications = [
  { id: "1", type: "proposal", title: "New proposal received", description: "Alex Moreau sent a proposal for \"Restaurant Website\"", time: "2 hours ago", read: false, action: "View Proposal", link: "/dashboard?tab=proposals" },
  { id: "2", type: "message", title: "New message", description: "Aarav Sharma: \"I've completed the homepage design\"", time: "3 hours ago", read: false, action: "Reply", link: "/messages/1" },
  { id: "3", type: "milestone", title: "Milestone completed", description: "Design System milestone approved for \"E-Commerce Redesign\"", time: "5 hours ago", read: false, action: "Review", link: "/project/ecommerce-redesign?tab=milestones" },
  { id: "4", type: "payment", title: "Payment released", description: "$600 released for UI/UX Design System milestone", time: "1 day ago", read: true, action: "View Details", link: "/project/ecommerce-redesign?tab=payments" },
  { id: "5", type: "review", title: "New review received", description: "Nova Retail left a 5-star review for \"Product Launch Platform\"", time: "2 days ago", read: true, action: "Read Review", link: "/freelancers/aarav-sharma#reviews" },
  { id: "6", type: "project", title: "New project match", description: "\"Build a modern restaurant website\" matches your skills", time: "3 days ago", read: true, action: "View Project", link: "/projects/restaurant-site" },
  { id: "7", type: "leaderboard", title: "Leaderboard update", description: "You moved up to #42 in Web Development", time: "1 week ago", read: true, action: "View Leaderboard", link: "/leaderboard?filter=Development%20%26%20IT" },
  { id: "8", type: "achievement", title: "Achievement unlocked!", description: "You earned the \"Fast Responder\" badge", time: "2 weeks ago", read: true, action: "View Badges", link: "/freelancers/aarav-sharma#achievements" },
  { id: "9", type: "system", title: "Profile completeness", description: "Your profile is 78% complete. Add a video intro to reach 100%", time: "3 weeks ago", read: true, action: "Complete Profile", link: "/freelancer-dashboard" },
  { id: "10", type: "proposal", title: "Proposal accepted", description: "Your proposal for \"AI Support Agent\" was shortlisted", time: "1 month ago", read: true, action: "View Project", link: "/projects/ai-support-agent" },
];

const typeIcons: Record<string, typeof Bell> = {
  proposal: FileText,
  message: MessageSquare,
  milestone: Briefcase,
  payment: DollarSign,
  review: Star,
  project: Briefcase,
  leaderboard: Award,
  achievement: Shield,
  system: Bell,
};

const typeColors: Record<string, string> = {
  proposal: "bg-[var(--violet)]/10 text-[var(--violet)]",
  message: "bg-sky-500/10 text-sky-500",
  milestone: "bg-amber-500/10 text-amber-500",
  payment: "bg-emerald-500/10 text-emerald-500",
  review: "bg-amber-500/10 text-amber-500",
  project: "bg-[var(--electric)]/10 text-[var(--electric)]",
  leaderboard: "bg-amber-500/10 text-amber-500",
  achievement: "bg-fuchsia-500/10 text-fuchsia-500",
  system: "bg-muted text-muted-foreground",
};

function Notifications() {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [notifications, setNotifications] = useState(allNotifications);

  const filtered = useMemo(() =>
    filter === "unread" ? notifications.filter(n => !n.read) : notifications,
    [notifications, filter]
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(ns => ns.map(n => ({ ...n, read: true })));
  };

  const dismiss = (id: string) => {
    setNotifications(ns => ns.filter(n => n.id !== id));
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Notifications</h1>
          <p className="mt-1 text-muted-foreground">Stay updated on your projects and activity</p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button onClick={markAllAsRead} className="rounded-full border border-border px-4 py-2 text-sm hover:bg-accent">
              Mark all read
            </button>
          )}
          <span className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground">
            <Bell className="size-4" />
          </span>
        </div>
      </div>

      <div className="surface-card rounded-2xl overflow-hidden">
        <div className="flex border-b border-border">
          {["all", "unread"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as "all" | "unread")}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                filter === f
                  ? "text-foreground border-b-2 border-[var(--violet)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? "All" : "Unread"}
              {f === "unread" && unreadCount > 0 && (
                <span className="ml-2 rounded-full bg-[var(--violet)] text-[10px] font-bold text-white px-1.5">{unreadCount}</span>
              )}
            </button>
          ))}
        </div>

        <div className="divide-y divide-border/50 max-h-[70vh] overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <Bell className="mx-auto size-12 mb-4 opacity-50" />
              <p className="font-medium">No notifications</p>
              <p className="text-sm mt-1">You're all caught up!</p>
            </div>
          ) : (
            filtered.map((n) => (
              <NotificationItem
                key={n.id}
                notification={n}
                onRead={() => markAsRead(n.id)}
                onDismiss={() => dismiss(n.id)}
              />
            ))
          )}
        </div>

        {filtered.length > 0 && (
          <div className="p-4 border-t border-border text-center text-sm text-muted-foreground">
            End of notifications
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationItem({ notification, onRead, onDismiss }: { notification: typeof allNotifications[0]; onRead: () => void; onDismiss: () => void }) {
  const Icon = typeIcons[notification.type] || Bell;
  const colorClass = typeColors[notification.type] || "bg-muted text-muted-foreground";

  return (
    <div className={`p-4 transition-colors ${!notification.read ? "bg-accent/30" : ""}`}>
      <div className="flex items-start gap-3">
        <div className={`shrink-0 grid size-10 place-items-center rounded-xl ${colorClass}`}>
          <Icon className="size-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className={`font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>{notification.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{notification.description}</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs text-muted-foreground">{notification.time}</span>
              {!notification.read && (
                <button onClick={onRead} className="grid size-5 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="Mark as read">
                  <Check className="size-3" />
                </button>
              )}
              <button onClick={onDismiss} className="grid size-5 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="Dismiss">
                <X className="size-3" />
              </button>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <a href={notification.link} className="rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] px-3 py-1.5 text-xs font-semibold text-white">
              {notification.action}
            </a>
            <span className="text-xs text-muted-foreground">{notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}