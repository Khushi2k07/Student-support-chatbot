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
      { role: "user", text: userMessage },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://student-support-chatbot-d4jr.onrender.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: data.reply },
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
          text: "⚠️ Backend connection failed. Please make sure the backend is running.",
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
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          height: "90vh",
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 10px 35px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#2563eb",
            color: "white",
            padding: "22px",
            textAlign: "center",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "28px" }}>
            🎓 Student Support Chatbot
          </h1>

          <p style={{ margin: "8px 0 0", opacity: 0.9 }}>
            Your AI-powered student assistant
          </p>

          <div style={{ marginTop: "8px", fontSize: "14px" }}>
            🟢 Online
          </div>
        </div>

        {/* Chat Area */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
            background: "#f8fafc",
          }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  message.role === "user" ? "flex-end" : "flex-start",
                marginBottom: "15px",
              }}
            >
              <div
                style={{
                  maxWidth: "75%",
                  padding: "12px 16px",
                  borderRadius: "15px",
                  background:
                    message.role === "user" ? "#2563eb" : "white",
                  color: message.role === "user" ? "white" : "#1f2937",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.5",
                }}
              >
                {message.role === "bot" && (
                  <div style={{ marginBottom: "5px" }}>🤖</div>
                )}

                {message.text}
              </div>
            </div>
          ))}

          {loading && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginBottom: "15px",
              }}
            >
              <div
                style={{
                  background: "white",
                  padding: "12px 16px",
                  borderRadius: "15px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                🤖 Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            padding: "15px",
            background: "white",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <input
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              fontSize: "16px",
              outline: "none",
            }}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            style={{
              padding: "0 22px",
              border: "none",
              borderRadius: "10px",
              background: loading ? "#94a3b8" : "#2563eb",
              color: "white",
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;