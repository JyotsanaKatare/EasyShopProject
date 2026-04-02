
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { RiSendPlaneFill } from "react-icons/ri";

// Connection ko component ke bahar rakhein taaki baar-baar reconnect na ho
const socket = io.connect("http://localhost:8000");

function VendorChat() {

  const [inputMessage, setInputMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      const messageData = {
        text: inputMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: "Me"
      };

      socket.emit("send_message", messageData);
      setMessagesList((list) => [...list, messageData]);
      setInputMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // Received message ko "Other" label de dete hain differentiate karne ke liye
      setMessagesList((list) => [...list, { ...data, sender: "Other" }]);
    });

    return () => socket.off("receive_message");
  }, []);

  const userMsgCount = messagesList.filter(msg => msg.sender === "Other").length;

  return (
    <div className="h-125 w-full flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

      {/* Header */}
      <div className="bg-linear-to-br from-pink-500 to-pink-600 p-5 flex justify-between items-center text-white">
        <div>
          <h3 className="text-[10px] md:text-sm font-black uppercase tracking-widest">
            Customer Support
          </h3>
          <p className="text-[9px] opacity-80 font-bold flex items-center gap-1">
            <span className="h-1 w-1 bg-green-400 rounded-full animate-pulse"></span>
            Active Now
          </p>
        </div>
      </div>

      {/* Messages Display */}
      <div className="grow overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-50/30">
        {messagesList.length === 0 && (
          <div className="h-full flex items-center justify-center text-slate-300 text-xs font-bold uppercase tracking-widest">
            No messages yet
          </div>
        )}

        {messagesList.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${msg.sender === "Me" ? "items-end" : "items-start"}`}>

            <div className={`max-w-[80%] p-3 rounded-2xl text-[12px] md:text-sm font-bold shadow-sm 
              ${msg.sender === "Me"
                ? "bg-linear-to-br from-pink-500 to-pink-600 text-white rounded-tr-none"
                : "bg-white text-slate-600 rounded-tl-none border border-slate-100"}`}>
              {msg.text}
            </div>

            <span className="text-[8px] md:text-[9px] text-slate-400 font-black mt-1 uppercase">
              {msg.time}
            </span>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-50 bg-white flex items-center gap-2">
        <input
          type="text"
          value={inputMessage}
          placeholder="Type your reply..."
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 text-[11px] md:text-sm font-bold p-3 bg-slate-50 rounded-xl outline-none focus:ring-1 focus:ring-pink-500/30 "
        />
        <button
          onClick={sendMessage}
          className="bg-linear-to-br from-pink-500 to-pink-600 text-white p-3 md:px-6 rounded-2xl shadow-lg shadow-pink-100 transition-all active:scale-95 flex items-center justify-center"
        >
          <RiSendPlaneFill size={18} className="md:mr-2" />
          <span className="hidden md:block font-black text-[10px] uppercase tracking-widest">Send</span>
        </button>
      </div>
    </div>
  );
};

export default VendorChat;