
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { HiX } from "react-icons/hi";
import { RiSendPlaneFill } from "react-icons/ri";

const socket = io.connect("http://localhost:8000");

function UserChat({ isOpen, setIsOpen }) {

    const [inputMessage, setInputMessage] = useState("");
    const [messagesList, setMessagesList] = useState([]);
    
    // msg bhejna
    const sendMessage = () => {
        if (inputMessage.trim() !== "") {
            const messageData = {
                text: inputMessage,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                sender: "User" // Vendor side par ye "Other" dikhega
            };

            socket.emit("send_message", messageData);
            setMessagesList((list) => [...list, messageData]);
            setInputMessage("");
        }
    };
 
    // msg sunna
    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessagesList((list) => [...list, { ...data, sender: "Vendor" }]);
        });
        return () => socket.off("receive_message");
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-6 right-6 z-9999">
            {/* 1. Floating Button */}
            {/* <button
                onClick={() => setIsOpen(false)}
                className="bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-2xl transition-all active:scale-90 flex items-center justify-center"
            >
                {isOpen ? <HiX size={28} /> : <HiOutlineChatAlt2 size={28} />}
            </button> */}

            {/* 2. Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-999 w-72 md:w-80 flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-5">

                    {/* Header */}
                    <div className="bg-pink-500 p-4 flex justify-between items-center text-white">

                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-widest">
                                Support
                            </h3>
                            <p className="text-[9px] opacity-80 font-bold">
                                Online
                            </p>
                        </div>

                        <button
                            onClick={() =>
                                setIsOpen(false)} className="hover:rotate-90 transition-all">
                            <HiX size={20} />
                        </button>
                    </div>

                    {/* Message Area */}
                    <div className="h-80 overflow-y-auto p-4 space-y-3 bg-slate-50/30">
                        {messagesList.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex flex-col ${msg.sender === "User" ? "items-end" : "items-start"}`}>

                                <div className={`max-w-[85%] p-3 rounded-2xl text-xs font-bold 
                                  ${msg.sender === "User"
                                        ? "bg-pink-500 text-white rounded-tr-none"
                                        : "bg-white text-slate-600 border border-slate-100 rounded-tl-none"
                                    }`}>
                                    {msg.text}
                                </div>

                                <span className="text-[8px] text-slate-400 font-black mt-1 uppercase">
                                    {msg.time}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-slate-50 flex gap-2">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Type a message..."
                            className="flex-1 text-[11px] font-bold p-3 bg-slate-50 rounded-xl outline-none focus:ring-1 focus:ring-pink-500/30"
                        />
                        {/* <button
                            onClick={sendMessage}
                            className="bg-pink-500 text-white px-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all"
                        >
                            Send
                        </button> */}

                        {/* send button */}
                        <button
                            onClick={sendMessage}
                            className="bg-pink-500 text-white p-3 rounded-xl shadow-lg shadow-pink-100 active:scale-90 transition-all">
                            <RiSendPlaneFill size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserChat;