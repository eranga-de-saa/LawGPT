import { useState, useEffect } from "react";
import MessageInput from "./components/MessageInput";
import MessagesList from "./components/MessagesList";
import type Message from "./classes/Message";
import sendMessage from "./services/messages.service";
import type QueryMessage from "./classes/QueryMessage";
import type Response from "./classes/Response";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  function addMessage(userRequest: string) {
    let userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: userRequest,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    sendMessage({ query: userRequest }).then((response: Response) => {
      let assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.reply,
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl bg-white rounded border p-4 flex flex-col gap-4">
        <MessagesList messages={messages} />
        <MessageInput onSendMessage={addMessage} />
      </div>
    </div>
  );
}

export default App;
