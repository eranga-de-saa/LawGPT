import { type FormEvent, type ChangeEvent, useState } from "react";

interface Props {
  onSendMessage: (message: string) => void;
}

function MessageInput({ onSendMessage }: Props) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault(); // Prevents the default page reload
    onSendMessage(userRequest); // Call the callback with the user request
    setUserRequest(""); // Clear the input field after submission
  }

  const [userRequest, setUserRequest] = useState("");

  // Handler for input change
  function handleChange(event: ChangeEvent) {
    setUserRequest(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <label>
        <input
          type="text"
          value={userRequest}
          placeholder="Ask anything"
          onChange={handleChange}
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}

export default MessageInput;
