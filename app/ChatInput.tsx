"use client";
import React, { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import fetcher from "../utils/fetcherMessages";
import useSWR from "swr";

const ChatInput = () => {
  const [Input, setInput] = useState("");
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);

  console.log(messages);

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!Input) return;

    const messageToSend = Input;

    setInput("");
    const id = uuid();
    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: "jhonned01",
      profilePic: "https://avatars.githubusercontent.com/u/2254731?v=4",
      email: "jhonned01@gmail.com",
    };

    const uploadMessageToUpstash = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      }).then((res) => res.json());

      return [data.message, ...messages!];
    };

    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  };
  return (
    <form
      onSubmit={addMessage}
      className="fixed bg-white bottom-0 w-full flex px-10  py-5 space-x-2 border-t border-gray-100 "
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
