import type { Message } from "../classes/Message";

interface Props {
  messages: Message[];
  isLoading: boolean;
}

function MessagesList({ messages, isLoading }: Props) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[75%] rounded-lg px-4 py-2 text-sm leading-relaxed ${
              message.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-900"
            }`}
          >
            <strong>{message.role === "user" ? "User" : "Assistant"}:</strong>{" "}
            {message.content}
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-gray-200 rounded-lg px-4 py-2 text-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150" />
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300" />
          </div>
        </div>
      )}
    </div>
  );
}

export default MessagesList;
