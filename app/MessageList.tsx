"use client";
import React, { useEffect } from "react";
import useSWR from "swr";
import fetcher from "../utils/fetcherMessages";
import { Message } from "../typings";
import MessageComponent from "./MessageComponent";
import { clientPusher } from "../pusher";

type Props = {
  initialMessage: Message[];
};

const MessageList = ({ initialMessage }: Props) => {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher);

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");
    channel.bind("newMessage", async (data: Message) => {
      // if you send the message , no need update cache
      if (messages?.find((message) => message.id === data.id)) return;

      if (!messages) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        });
      }
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, mutate, clientPusher]);

  return (
    <div className="space-y-5 px-5 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {(messages || initialMessage)?.map((message) => (
        <MessageComponent key={message.id} mesagge={message} />
      ))}
    </div>
  );
};

export default MessageList;
