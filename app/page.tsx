import { unstable_getServerSession } from "next-auth";
import React from "react";
import { Message } from "../typings";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import { Provider } from "./providers";

const HomePage = async () => {
  const data = await fetch(
    `${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessages`
  ).then((res) => res.json());

  const messages: Message[] = data.messages;

  const session = await unstable_getServerSession();

  console.log(session);

  return (
    <Provider session={session}>
      <main>
        {/* massagelInk */}
        <MessageList initialMessage={messages} />

        {/* ChatInput */}

        <ChatInput session={session} />
      </main>
    </Provider>
  );
};

export default HomePage;
