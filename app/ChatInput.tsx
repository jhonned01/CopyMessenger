"use client";
import React, { FormEvent, useState } from "react";

const ChatInput = () => {
  const [Input, setInput] = useState("");

  const addMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!Input) return;

    const messageToSend = Input;

    setInput("");
  };
  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 w-full flex px-10  py-5 space-x-2 border-t border-gray-100 "
    >
      <input
        type="text"
        value={Input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter message here ..."
        className="flex-1 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={!Input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  disabled:opacity-50 disabled:cursor-not-allowed
       "
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;