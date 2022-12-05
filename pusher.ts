import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: "1519934",
  key: "31b3a58a83443cecd5b6",
  secret: "94a9aa5a4c44ec20fdb8",
  cluster: "us2",
  useTLS: true,
});

export const clientPusher = new ClientPusher("", {
  cluster: "us2",
  forceTLS: true,
});
