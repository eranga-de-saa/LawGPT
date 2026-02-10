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
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          value={userRequest}
          placeholder="Ask anything"
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MessageInput;
