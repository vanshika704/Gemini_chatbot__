
import { useState } from "react";
import axios from "axios";

function App() {
  const [userInput, setUserInput] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta2/models/gemini-pro:generateText",
        {
          prompt: userInput,
          temperature: 0.7,
          maxOutputTokens: 200,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.REACT_APP_API_KEY}`, // Use environment variables for the API key
          },
        }
      );
      setBotResponse(response.data?.candidates[0]?.output || "No response from API.");
    } catch (error) {
      console.error("Error:", error);
      setBotResponse("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
    setUserInput("");
  };

  return (<>
    <div style={styles.container}>
      <h1 style={styles.header}>Gemini Chatbot</h1>
      <div style={styles.chatWindow}>
        <div style={styles.botMessage}>
          <strong>Bot:</strong> <p>{botResponse || "Hi! How can I help you today?"}</p>
        </div>
      </div>
      <form style={styles.inputArea} onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={isLoading}>
          {isLoading ? "Loading..." : "Send"}
        </button>
      </form>
    </div></>
  );
}

const styles = {
 
  container: {
    fontFamily: "'Arial', sans-serif",
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#f8f9fa",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#495057",
  },
  chatWindow: {
    border: "1px solid #ced4da",
    borderRadius: "8px",
    padding: "10px",
    minHeight: "200px",
    marginBottom: "15px",
    backgroundColor: "#ffffff",
    overflowY: "auto",
  },
  botMessage: {
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#506274FF",
    borderRadius: "8px",
    color: "white"
  },
  inputArea: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flexGrow: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #6F7173FF",
    outline: "none",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#ffffff",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default App;
