import { useState } from "react";

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
    if (!input.trim() || loading) return;

    const userMessage = input.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://student-support-chatbot-d4jr.onrender.com/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Backend request failed");
      }

      const data = await response.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: data.reply,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: "Sorry, I couldn't get a response.",
          },
        ]);
      }
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Sorry, I couldn't get a response.",
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

        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.role === "user" ? "user-message" : "bot-message"
              }`}
            >
              {message.role === "bot" && (
                <div className="bot-icon">🤖</div>
              )}

              <div className="message-text">
                {message.text.replace(/\*\*/g, "")}
              </div>
            </div>
          ))}

          {loading && (
            <div className="message bot-message">
              <div className="bot-icon">🤖</div>
              <div className="message-text">
                Thinking...
              </div>
            </div>
          )}
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />

          <button onClick={sendMessage} disabled={loading}>
            {loading ? "..." : "Send"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;