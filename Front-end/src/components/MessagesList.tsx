import type Message from "./classes/Message";

interface Props {
  messages: Message[];
}

function MessagesList({ messages }: Props) {
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
    </div>
  );
}

export default MessagesList;
