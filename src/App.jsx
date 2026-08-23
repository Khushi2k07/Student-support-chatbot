* {
  box-sizing: border-box;
}

html,
body,
#root {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100%;
  font-family: Arial, Helvetica, sans-serif;
}

body {
  background: #eef3f9;
}

/* MAIN APP */

.app {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

/* CHATBOT BOX */

.chat-container {
  width: 100%;
  max-width: 950px;
  height: 90vh;
  max-height: 850px;
  background: #f5f7fa;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
}

/* HEADER */

.chat-header {
  background: #2864e8;
  color: white;
  text-align: center;
  padding: 30px 20px;
  flex-shrink: 0;
}

.chat-header h1 {
  margin: 0;
  font-size: 38px;
  font-weight: 700;
}

.chat-header p {
  margin: 8px 0 14px;
  font-size: 24px;
}

.online-status {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9px;
  font-size: 20px;
}

.online-dot {
  display: inline-block;
  width: 19px;
  height: 19px;
  background: #48e88a;
  border-radius: 50%;
}

/* MESSAGES AREA */

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 30px;
  background: #f5f7fa;
}

/* MESSAGE */

.message {
  max-width: 78%;
  padding: 20px 25px;
  margin-bottom: 20px;
  border-radius: 22px;
  font-size: 21px;
  line-height: 1.55;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  word-wrap: break-word;
  white-space: pre-wrap;
}

/* USER MESSAGE */

.user-message {
  margin-left: auto;
  background: #2864e8;
  color: white;
  border-bottom-right-radius: 6px;
}

/* BOT MESSAGE */

.bot-message {
  margin-right: auto;
  background: white;
  color: #111827;
  border-bottom-left-radius: 6px;
}

/* BOT ICON */

.bot-icon {
  text-align: center;
  font-size: 24px;
  margin-bottom: 8px;
}

/* MESSAGE TEXT */

.message-text {
  word-wrap: break-word;
}

/* INPUT AREA */

.input-area {
  display: flex;
  gap: 14px;
  padding: 18px 22px;
  background: white;
  flex-shrink: 0;
}

.input-area input {
  flex: 1;
  height: 62px;
  border: none;
  border-radius: 16px;
  background: #333333;
  color: white;
  padding: 0 20px;
  font-size: 21px;
  outline: none;
}

.input-area input::placeholder {
  color: #9ca3af;
}

.input-area button {
  width: 125px;
  height: 62px;
  border: none;
  border-radius: 16px;
  background: #2864e8;
  color: white;
  font-size: 21px;
  cursor: pointer;
  transition: 0.2s;
}

.input-area button:hover {
  background: #1d55cf;
}

.input-area button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* SCROLLBAR */

.messages::-webkit-scrollbar {
  width: 10px;
}

.messages::-webkit-scrollbar-track {
  background: #e5e7eb;
}

.messages::-webkit-scrollbar-thumb {
  background: #9ca3af;
  border-radius: 10px;
}

/* MOBILE */

@media (max-width: 700px) {
  .app {
    padding: 8px;
  }

  .chat-container {
    height: 96vh;
    border-radius: 20px;
  }

  .chat-header {
    padding: 22px 12px;
  }

  .chat-header h1 {
    font-size: 28px;
  }

  .chat-header p {
    font-size: 18px;
  }

  .online-status {
    font-size: 18px;
  }

  .message {
    max-width: 88%;
    font-size: 18px;
    padding: 16px;
  }

  .messages {
    padding: 18px;
  }

  .input-area {
    padding: 12px;
  }

  .input-area input {
    height: 56px;
    font-size: 17px;
  }

  .input-area button {
    width: 90px;
    height: 56px;
    font-size: 17px;
  }
}