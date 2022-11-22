import React from "react";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

const HomePage = () => {
  return (
    <main>
      {/* massagelInk */}
      <MessageList />

      {/* ChatInput */}

      <ChatInput />
    </main>
  );
};

export default HomePage;
