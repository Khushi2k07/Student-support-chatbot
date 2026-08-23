import { useState } from "react";
import "./App.css";

const API_URL = "https://student-support-chatbot-backend.onrender.com/api/chat";

function App() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hello! 👋 I'm your Student Support Assistant. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const text = input.trim();

    if (!text || loading) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: (data.reply || "Sorry, I couldn't get a response.")
  .replace(/\*\*/g, "")
  .replace(/^###\s*/gm, "")
  .replace(/^##\s*/gm, "")
  .replace(/^#\s*/gm, "")
  .replace(/^[-*]\s+/gm, "• "),
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="app">
      <div className="chat-container">

        <header className="chat-header">
          <h1>🎓 Student Support Chatbot</h1>
          <p>Your AI-powered student assistant</p>

          <div className="online-status">
            <span className="online-dot"></span>
            Online
          </div>
        </header>

        <main className="chat-area">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-row ${message.role}`}
            >
              <div className="avatar">
                {message.role === "bot" ? "🤖" : "👤"}
              </div>

              <div className="message">
                {message.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="message-row bot">
              <div className="avatar">🤖</div>
              <div className="message typing">
                Thinking...
              </div>
            </div>
          )}
        </main>

        <div className="input-area">
          <input
            type="text"
            value={input}
            placeholder="Ask me anything..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />

          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;