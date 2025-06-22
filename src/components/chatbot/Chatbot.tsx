import React, { useState } from "react";
import { Icon } from "../navigation_rail/NavigationRail";

const OPENAI_API_KEY = "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";


export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages: { role: "user" | "assistant"; content: string }[] = [
        ...messages,
        { role: "user", content: input },
      ];      
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini", // or "gpt-3.5-turbo"
            messages: newMessages,
            max_tokens: 150,
          }),
        });
      
        const data = await response.json();
        console.log("OpenAI raw response:", data); // <--- Add this line
      
        if (!data.choices || !data.choices.length) {
          throw new Error("No response from OpenAI.");
        }
      
        const assistantReply = data.choices[0].message.content;
        setMessages([...newMessages, { role: "assistant", content: assistantReply }]);
      } catch (error) {
        console.error("OpenAI API error:", error);
        setMessages([...newMessages, { role: "assistant", content: "Sorry, something went wrong." }]);
      }
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, backgroundColor: "var(--md-sys-color-surface-container-lowest)", borderRadius: 26 }}>
      <h2>Chatbot</h2>
      <div style={{ minHeight: 300, backgroundColor: "var(--md-sys-color-surface-container-low)", borderRadius: 26, padding: 10, overflowY: "auto" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 10, textAlign: msg.role === "user" ? "right" : "left" }}>
            <div
              style={{
                display: "inline-block",
                backgroundColor: msg.role === "user" ? "#007bff" : "#e5e5ea",
                color: msg.role === "user" ? "white" : "black",
                padding: "8px 12px",
                borderRadius: 20,
                maxWidth: "80%",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <p>Loading...</p>}
      </div>

      <form onSubmit={sendMessage} style={{ marginTop: 10, display: "flex", borderRadius: "24px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{ flexGrow: 1, padding: 12, fontSize: 16 }}
          disabled={loading}
        />
        <button type="submit" disabled={loading} style={{ padding: "10px", borderRadius: "56px", marginLeft: 10 }}>
          <Icon label="" iconName="send" />
        </button>
      </form>
    </div>
  );
}
