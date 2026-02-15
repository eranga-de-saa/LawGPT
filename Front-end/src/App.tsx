import { useState } from "react";
import MessageInput from "./components/MessageInput";
import MessagesList from "./components/MessagesList";
import type { Message } from "./classes/Message";
import sendMessage from "./services/messages.service";
import type { Response } from "./classes/Response";
import PromptSuggestions from "./components/PromptSuggestions";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function addMessage(userRequest: string) {
    let userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: userRequest,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setIsLoading(true);

    sendMessage({ query: userRequest })
      .then((response: Response) => {
        let assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: response.reply,
        };
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl h-[90vh] bg-white rounded-xl shadow-lg flex flex-col">
        <header className="px-6 py-4 border-b text-lg font-semibold">
          LawGPT - Your Legal Assistant
        </header>
        {messages.length === 0 ? (
          <PromptSuggestions onSelect={addMessage} />
        ) : (
          <MessagesList messages={messages} isLoading={isLoading} />
        )}
        {/* <MessagesList messages={messages} isLoading={isLoading} /> */}
        <MessageInput onSendMessage={addMessage} />
      </div>
    </div>
  );
}

export default App;
