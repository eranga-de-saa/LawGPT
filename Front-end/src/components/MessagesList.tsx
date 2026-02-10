import type Message from "./classes/Message";

interface Props {
  messages: Message[];
}

function MessagesList({ messages }: Props) {
  return (
    <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`p-2 rounded ${
            message.role === "user"
              ? "bg-blue-100 self-end"
              : "bg-gray-100 self-start"
          }`}
        >
          <strong>{message.role === "user" ? "User" : "Assistant"}:</strong>{" "}
          {message.content}
        </div>
      ))}
    </div>
  );
}

export default MessagesList;
