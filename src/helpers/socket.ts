import io from "socket.io-client";

const socket = io("https://no-chat-back-node-js.vercel.app");
//const socket = io("http://localhost");

export const socketMessage = socket.on("newMessage", (newMessage) => {
  console.log(newMessage);
});
