import { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to the conversation
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    try {
      // Use the correct Gemini API endpoint and the API key
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=", // Replace YOUR_API_KEY
        {
          contents: [
            {
              parts: [
                {
                  text: input, // The user's input message
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json", // Content type as JSON
          },
        }
      );

      // Get the bot's response from the API response
      const botResponse = response.data.contents[0].parts[0].text;

      // Add bot response to the conversation
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    } catch (error) {
      console.error("Error fetching response from Gemini API", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    }

    setInput(""); // Clear input field
  };

  return (
    <div style={{ maxWidth: "400px", fontFamily: "Arial", margin: "auto" }}>
      <h2>Chatbot</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              margin: "5px 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px",
                borderRadius: "10px",
                background: msg.sender === "user" ? "#65786BFF" : "#545151FF",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "calc(100% - 70px)", padding: "10px" }}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          style={{
            width: "60px",
            padding: "10px",
            background: "#3F5267FF",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
