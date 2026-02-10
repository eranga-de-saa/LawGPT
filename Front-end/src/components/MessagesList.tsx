import type Message from "./classes/Message";

interface Props {
  messages: Message[];
}

function MessagesList({ messages }: Props) {
  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          <strong>{message.role === "user" ? "User" : "Assistant"}:</strong>{" "}
          {message.content}
        </div>
      ))}
    </div>
  );
}

export default MessagesList;
