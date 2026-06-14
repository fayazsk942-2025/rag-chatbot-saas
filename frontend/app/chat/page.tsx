"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Message = {
  role: "user" | "bot";
  content: string;
};

type Chat = {
  id: string;
  title: string;
};

export default function ChatPage() {
  const router = useRouter();

  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  // 🔐 Auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");

    // dummy chat history (later from backend)
    setChats([
      { id: "1", title: "AI Interview Prep" },
      { id: "2", title: "RAG Project Help" },
    ]);
  }, []);

  // 🧠 select chat
  const openChat = (chatId: string) => {
    setActiveChat(chatId);

    // later replace with API call:
    setMessages([
      { role: "bot", content: "Hello! How can I help you?" },
    ]);
  };

  // ➕ new chat
  const newChat = () => {
    const newId = Date.now().toString();

    const newChatObj = {
      id: newId,
      title: "New Chat",
    };

    setChats([newChatObj, ...chats]);
    setActiveChat(newId);
    setMessages([]);
  };

  // ❌ delete chat
  const deleteChat = (id: string) => {
    setChats(chats.filter((c) => c.id !== id));

    if (activeChat === id) {
      setActiveChat(null);
      setMessages([]);
    }
  };

  // 💬 send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // 🔥 backend will replace this later
      const botMsg: Message = {
        role: "bot",
        content: "This is a mock response (connect backend later)",
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, botMsg]);
        setLoading(false);
      }, 800);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">

      {/* 📂 SIDEBAR */}
      <div className="w-64 border-r p-3 flex flex-col">

        <button
          onClick={newChat}
          className="bg-blue-600 text-white p-2 rounded mb-3"
        >
          + New Chat
        </button>

        <div className="flex-1 overflow-y-auto space-y-2">

          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-2 rounded cursor-pointer flex justify-between items-center ${
                activeChat === chat.id ? "bg-gray-200" : ""
              }`}
            >
              <span onClick={() => openChat(chat.id)}>
                {chat.title}
              </span>

              <button
                onClick={() => deleteChat(chat.id)}
                className="text-red-500"
              >
                x
              </button>
            </div>
          ))}

        </div>

        {/* Profile / Home */}
        <button
          onClick={() => router.push("/home")}
          className="mt-3 bg-gray-100 p-2 rounded"
        >
          Back to Dashboard
        </button>

      </div>

      {/* 💬 CHAT AREA */}
      <div className="flex-1 flex flex-col">

        {/* messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">

          {!activeChat ? (
            <div className="text-gray-500 text-center mt-20">
              Select a chat or create new one 🚀
            </div>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 max-w-md rounded ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-200 mr-auto"
                }`}
              >
                {msg.content}
              </div>
            ))
          )}

          {loading && (
            <div className="text-gray-500">Bot is typing...</div>
          )}

        </div>

        {/* input */}
        <div className="p-3 border-t flex gap-2">

          <input
            className="flex-1 border p-2 rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={!activeChat}
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 rounded"
            disabled={!activeChat}
          >
            Send
          </button>

        </div>

      </div>
    </div>
  );
}