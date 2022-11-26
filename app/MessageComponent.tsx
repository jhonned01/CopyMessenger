import Image from "next/image";
import { type } from "os";
import React from "react";
import { Message } from "../typings";

type Props = {
  mesagge: Message;
};

const MessageComponent = ({ mesagge }: Props) => {
  const isUser = true;
  return (
    <div className={`flex w-fit ${isUser && "ml-auto"}`}>
      <div className={`flex-shrink-0 ${isUser && "order-2"}`}>
        <Image
          src={mesagge.profilePic}
          alt="Profile Picture"
          width={50}
          height={10}
          className="rounded-full mx-2"
        />
      </div>

      <div>
        <p
          className={`text-[0.65rem] px-[2px] pb-[2px] ${
            isUser ? "text-blue-400 text-right" : "text-red-400 text-left"
          }`}
        >
          {mesagge.message}
        </p>
        <div className="flex items-end ">
          <div
            className={`px-3 py-2 rounded-lg w-fit text-white bg-red-400 ${
              isUser ? "bg-blue-400 ml-auto order-3" : "bg-red-400"
            }`}
          >
            <p>{mesagge.message}</p>
          </div>
          <p
            className={`text-[0.65rem] italic px-2 text-gray-300 ${
              isUser && "text-right"
            }`}
          >
            {new Date(mesagge.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;