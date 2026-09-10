import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Send, Paperclip, Smile, Mic, MoreVertical, Search, Briefcase } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export const Route = createFileRoute("/messages/$conversationId")({
  head: ({ params }) => ({
    meta: [
      { title: "Messages | Orbitwork" },
      { name: "description", content: "Chat with freelancers and clients" },
    ],
  }),
  component: Messages,
});

const mockConversations = [
  {
    id: "1",
    name: "Aarav Sharma",
    avatar: "AS",
    role: "Full Stack Developer",
    project: "Restaurant Website",
    projectId: "restaurant-site",
    lastMessage: "I've completed the homepage design and sent it for review",
    time: "2h ago",
    unread: 2,
    online: true,
    messages: [
      { id: 1, sender: "them", text: "Hi! Thanks for hiring me. I'll start with the discovery phase today.", time: "2024-01-15 09:30" },
      { id: 2, sender: "me", text: "Great! I've attached the brand guidelines and current site analytics.", time: "2024-01-15 09:45", attachments: ["brand-guidelines.pdf", "analytics.pdf"] },
      { id: 3, sender: "them", text: "Perfect. I'll review these and send discovery questions by EOD.", time: "2024-01-15 10:00" },
      { id: 4, sender: "them", text: "Discovery questions sent. Please review when you have a moment.", time: "2024-01-15 16:30", attachments: ["discovery-questions.docx"] },
      { id: 5, sender: "me", text: "Looks good. Let's proceed with the design phase.", time: "2024-01-15 17:00" },
      { id: 6, sender: "them", text: "Design system is ready for review. I've created a Figma file with all components.", time: "2024-01-28 14:20", attachments: ["design-system.fig"] },
      { id: 7, sender: "me", text: "Looks fantastic! One small tweak - can we make the primary button slightly more prominent?", time: "2024-01-29 09:45" },
      { id: 8, sender: "them", text: "Done! Updated the Figma file. Moving into frontend development now.", time: "2024-01-29 10:30" },
      { id: 9, sender: "them", text: "I've completed the homepage design and sent it for review", time: "2024-02-05 11:00", attachments: ["homepage-design.fig"] },
    ]
  },
  {
    id: "2",
    name: "Sarah Lindqvist",
    avatar: "SL",
    role: "UI/UX Designer",
    project: "Brand Identity System",
    projectId: "brand-system",
    lastMessage: "Here are the logo concepts for your review",
    time: "5h ago",
    unread: 0,
    online: false,
    messages: [
      { id: 1, sender: "them", text: "Hi! Excited to work on your brand identity. I'll start with the strategy phase.", time: "2024-01-10 10:00" },
      { id: 2, sender: "me", text: "Welcome aboard! Here's our brief and competitor analysis.", time: "2024-01-10 10:15", attachments: ["brand-brief.pdf"] },
      { id: 3, sender: "them", text: "Thanks! I'll have initial concepts by Friday.", time: "2024-01-10 10:30" },
      { id: 4, sender: "them", text: "Here are the logo concepts for your review", time: "2024-01-14 15:00", attachments: ["logo-concepts.fig"] },
    ]
  },
  {
    id: "3",
    name: "Daniel Ruiz",
    avatar: "DR",
    role: "AI Engineer",
    project: "AI Support Agent",
    projectId: "ai-support-agent",
    lastMessage: "The RAG pipeline is ready for testing",
    time: "1d ago",
    unread: 1,
    online: true,
    messages: [
      { id: 1, sender: "them", text: "Starting work on the RAG pipeline. Will need access to your docs.", time: "2024-01-20 09:00" },
      { id: 2, sender: "me", text: "I've shared the Notion workspace with 400+ help articles.", time: "2024-01-20 09:15" },
      { id: 3, sender: "them", text: "The RAG pipeline is ready for testing", time: "2024-01-24 16:00" },
    ]
  },
];

function Messages() {
  const { conversationId } = Route.useParams();
  const [conversations] = useState(mockConversations);
  const conversation = conversations.find(c => c.id === conversationId) || conversations[0];
  const [newMessage, setNewMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    conversation.messages.push({
      id: Date.now(),
      sender: "me",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    setNewMessage("");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Conversations List */}
      <aside className={`${showSidebar ? "block" : "hidden"} lg:block w-80 border-r border-border flex flex-col`}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-display font-semibold">Messages</h2>
          <button className="lg:hidden p-2" onClick={() => setShowSidebar(false)}>
            <ArrowLeft className="size-5" />
          </button>
        </div>
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              placeholder="Search conversations..."
              className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[var(--violet)]"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-border/50">
          {conversations.map((c) => (
            <Link
              key={c.id}
              to={`/messages/${c.id}`}
              className={`flex items-start gap-3 p-3 hover:bg-accent/50 transition-colors ${
                conversationId === c.id ? "bg-accent/50" : ""
              }`}
            >
              <div className="relative shrink-0">
                <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-[var(--violet)] to-[var(--electric)] text-sm font-bold text-white">{c.avatar}</span>
                {c.online && <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 border-2 border-background" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.time}</p>
                </div>
                <p className="text-xs text-muted-foreground truncate">{c.role}</p>
                <p className="mt-1 text-sm text-muted-foreground truncate">{c.lastMessage}</p>
                <p className="text-xs text-[var(--electric)]">{c.project}</p>
              </div>
              {c.unread > 0 && (
                <span className="shrink-0 mt-1 grid size-5 place-items-center rounded-full bg-[var(--violet)] text-[10px] font-bold text-white">{c.unread}</span>
              )}
            </Link>
          ))}
        </div>
      </aside>

      {/* Mobile Sidebar Toggle */}
      <button className="lg:hidden fixed bottom-4 left-4 z-50 rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] p-3 shadow-lg" onClick={() => setShowSidebar(true)}>
        <svg className="size-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      </button>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <header className="flex items-center gap-4 p-4 border-b border-border bg-background/80 backdrop-blur sticky top-0 z-10">
          <Link to="/messages" className="lg:hidden p-2">
            <ArrowLeft className="size-5" />
          </Link>
          <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-[var(--violet)] to-[var(--electric)] text-sm font-bold text-white">{conversation.avatar}</span>
          <div className="flex-1 min-w-0">
            <Link to={`/freelancers/${conversationId}`} className="font-medium truncate block">{conversation.name}</Link>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{conversation.role}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                {conversation.online ? <span className="size-1.5 rounded-full bg-emerald-500" /> : null}
                {conversation.online ? "Online" : "Offline"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to={`/project/${conversation.projectId}`} className="hidden sm:flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs hover:bg-accent">
              <Briefcase className="size-3" /> {conversation.project}
            </Link>
            <button className="grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"><MoreVertical className="size-4" /></button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5" ref={messagesEndRef}>
          {conversation.messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} conversation={conversation} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t border-border p-4 bg-background/80 backdrop-blur">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                rows={1}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-[var(--violet)] resize-none pr-12"
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              />
              <div className="absolute right-2 bottom-2 flex items-center gap-1">
                <button className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-accent"><Paperclip className="size-4" /></button>
                <button className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-accent"><Smile className="size-4" /></button>
                <button className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-accent"><Mic className="size-4" /></button>
              </div>
            </div>
            <button onClick={sendMessage} disabled={!newMessage.trim()} className="grid size-10 place-items-center rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--electric)] text-white disabled:opacity-50 shrink-0">
              <Send className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message, conversation }: { message: { id: number; sender: "me" | "them"; text: string; time: string; attachments?: string[]; name?: string; avatar?: string }; conversation: { avatar: string; name: string } }) {
  const isOwn = message.sender === "me";
  return (
    <div className={`flex gap-3 ${isOwn ? "flex-row-reverse" : ""}`}>
      {!isOwn && (
        <span className="shrink-0 grid size-8 place-items-center rounded-full bg-muted text-white font-medium text-xs">
          {conversation.avatar}
        </span>
      )}
      <div className={`flex-1 max-w-[70%] ${isOwn ? "text-right" : ""}`}>
        <div className={`inline-flex flex-col ${isOwn ? "items-end" : "items-start"} gap-1`}>
          {!isOwn && <span className="text-xs font-medium text-muted-foreground ml-1">{conversation.name}</span>}
          <div className={`rounded-2xl p-3 ${isOwn ? "bg-gradient-to-br from-[var(--violet)] to-[var(--electric)] text-white" : "bg-muted text-foreground"}`}>
            <p className="text-sm">{message.text}</p>
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {message.attachments.map((a) => (
                  <span key={a} className={`rounded-full px-2 py-1 text-[10px] ${isOwn ? "bg-white/20 text-white" : "bg-background text-muted-foreground"}`}>
                    {a}
                  </span>
                ))}
              </div>
            )}
          </div>
          <span className="text-[10px] text-muted-foreground">{message.time}</span>
        </div>
      </div>
      {isOwn && (
        <span className="shrink-0 grid size-8 place-items-center rounded-full bg-gradient-to-br from-[var(--violet)] to-[var(--electric)] text-white font-medium text-xs">
          You
        </span>
      )}
    </div>
  );
}