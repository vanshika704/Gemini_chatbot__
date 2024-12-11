// import { useState } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// function App() {
//   const [userInput, setUserInput] = useState("");
//   const [botResponse, setBotResponse] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const genAI = new GoogleGenerativeAI("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!userInput.trim()) return;
//     setIsLoading(true);
//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//       const result = await model.generateContent(userInput);
//       const generatedText = result.response.text();

//       setBotResponse(generatedText);
//     } catch (error) {
//       console.error("Error:", error);
//       setBotResponse("An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//     setUserInput("");
//   };

//   return (
//     <>
//       <div
//         style={{
//           fontFamily: "'Arial', sans-serif",
//           maxWidth: "500px",
//           margin: "150px auto",
//           padding: "20px",
//           borderRadius: "10px",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//           backgroundColor: "#f8f9fa",
//         }}
//       >
//         <h1
//           style={{
//             textAlign: "center",
//             marginBottom: "20px",
//             color: "#495057",
//           }}
//         >
//           Gemini Chatbot
//         </h1>
//         <div
//           style={{
//             border: "1px solid #ced4da",
//             borderRadius: "8px",
//             padding: "10px",
//             minHeight: "200px",
//             marginBottom: "15px",
//             backgroundColor: "#ffffff",
//             overflowY: "auto",
//           }}
//         >
//           <div
//             style={{
//               marginBottom: "10px",
//               padding: "10px",
//               backgroundColor: "#506274FF",
//               borderRadius: "8px",
//               color: "white",
//             }}
//           >
//             <strong>Bot:</strong>{" "}
//             <p>{botResponse || "Hi! How can I help you today?"}</p>
//           </div>
//         </div>
//         <form
//           style={{
//             display: "flex",
//             gap: "10px",
//           }}
//           onSubmit={handleSubmit}
//         >
//           <input
//             type="text"
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//             placeholder="Type your message..."
//             style={{
//               flexGrow: 1,
//               padding: "10px",
//               borderRadius: "8px",
//               border: "1px solid #6F7173FF",
//               outline: "none",
//               fontSize: "16px",
//             }}
//           />
//           <button
//             type="submit"
//             style={{
//               padding: "10px 20px",
//               borderRadius: "8px",
//               border: "none",
//               backgroundColor: "#007bff",
//               color: "#ffffff",
//               fontSize: "16px",
//               cursor: "pointer",
//             }}
//             disabled={isLoading}
//           >
//             {isLoading ? "Loading..." : "Send"}
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default App;
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]); // To track all messages
  const [isLoading, setIsLoading] = useState(false);
  const genAI = new GoogleGenerativeAI("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add sender's message
    setMessages((prev) => [...prev, { sender: "user", text: userInput }]);
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(userInput);
      const generatedText = result.response.text();

      // Add bot's response
      setMessages((prev) => [...prev, { sender: "bot", text: generatedText }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "An error occurred. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }

    setUserInput("");
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        maxWidth: "50vw",
        margin: "0 auto",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#6D6E6F1F",
      }}
    >
      
      <header
        style={{
          backgroundColor: "#10a37f",
          color: "white",
          padding: "10px 20px",
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Gemini Chatbot
      </header>

      {/* Chat Window */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          backgroundColor: "#F6F2F2CB",
        }}
      >
        {/* Centered Image when there are no messages */}
        {messages.length === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <img
              src="src/assets/200e8d139737079.6234b0487404d.gif"
              alt="Welcome"
              style={{ borderRadius: "50%", marginBottom: "20px" }}
            />
            <p style={{ color: "#6b7280", fontSize: "16px" }}>
              Hi! Start a conversation with me.
            </p>
          </div>
        )}

        {/* Display Messages */}
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              alignSelf: message.sender === "user" ? "flex-end" : "flex-start",
              maxWidth: "70%",
              padding: "10px",
              borderRadius: "12px",
              backgroundColor:
                message.sender === "user" ? "#10a37f" : "#e5e7eb",
              color: message.sender === "user" ? "#ffffff" : "#111827",
            }}
          >
            {message.text}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
          padding: "10px 20px",
          backgroundColor: "#f9fafb",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "12px",
            border: "1px solid #d1d5db",
            fontSize: "16px",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#10a37f",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default App;
