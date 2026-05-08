import React, { useState, useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import { formatMessageTime } from '../lib/utils.js'

const ChatContainer = () => {
  const { selectedUser, sendMessage, messages, getMessages, subscribeToMessages, unSubscribeToMessages } = useChatStore();
  const { authUser, onlineUsers } = useAuthStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const messageEndRef = React.useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
    subscribeToMessages();
    return () => { unSubscribeToMessages(); }
  }, [selectedUser, getMessages, subscribeToMessages, unSubscribeToMessages]);

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files?.[0])
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => { setImagePreview(reader.result); };
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText("");
      setImagePreview(null);
      setSelectedFile(null);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }

  // No user selected
  if (!selectedUser) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 border-l border-slate-200 min-h-0">
        <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-md">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <h2 className="text-base font-semibold text-slate-800 mb-1">Welcome to ChatApp</h2>
        <p className="text-sm text-slate-400 text-center px-6">Select a conversation to start messaging.</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-white border-l border-slate-200 min-h-0 overflow-hidden">

      {/* Chat Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 bg-white shrink-0">
        <div className="shrink-0">
          {selectedUser.profilePic ? (
            <img
              src={selectedUser.profilePic}
              alt={selectedUser.fullname}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-100"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
              {selectedUser.fullname.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 truncate">{selectedUser.fullname}</p>
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${onlineUsers.includes(selectedUser._id) ? "bg-emerald-500" : "bg-slate-300"}`} />
            <p className={`text-xs font-medium ${onlineUsers.includes(selectedUser._id) ? "text-emerald-600" : "text-slate-400"}`}>
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2.5 bg-slate-50 min-h-0">
        {messages.map((each) => (
          <div
            key={each._id}
            className={`flex items-end gap-2 max-w-[80%] ${each.senderId === authUser._id ? "self-end flex-row-reverse" : ""}`}
            ref={messageEndRef}
          >
            {each.senderId !== authUser._id && (
              <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-semibold text-white shrink-0">
                {selectedUser.fullname.charAt(0)}
              </div>
            )}
            <div className="gap-1.5 flex-col flex">
              {each.image && (
                <img src={each.image} alt="" className="w-[180px] sm:w-[200px] rounded-xl" />
              )}
              {each.text && (
                <div className={
                  each.senderId === authUser._id
                    ? "bg-indigo-600 text-white text-sm px-3.5 py-2 rounded-2xl rounded-br-sm shadow-sm"
                    : "bg-white border border-slate-200 text-slate-700 text-sm px-3.5 py-2 rounded-2xl rounded-bl-sm shadow-sm"
                }>
                  {each.text}
                </div>
              )}
              <div className={`text-xs text-slate-400 ${each.senderId === authUser._id ? "text-right" : "text-left"}`}>
                {formatMessageTime(each.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="px-3 py-2.5 sm:px-5 sm:py-3 border-t border-slate-200 bg-white shrink-0">
        {selectedFile && (
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-1.5 text-xs text-indigo-700 font-medium max-w-[200px] truncate">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.41 17.41a2 2 0 0 1-2.83-2.83l8.49-8.49" />
              </svg>
              <span className="truncate">{selectedFile.name}</span>
            </div>
            <button onClick={() => { setSelectedFile(null); setImagePreview(null); }} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-50 transition-all">
          <label className="cursor-pointer text-slate-400 hover:text-indigo-500 transition-colors shrink-0 p-1">
            <input type="file" className="hidden" onChange={handleImageChange} />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.41 17.41a2 2 0 0 1-2.83-2.83l8.49-8.49" />
            </svg>
          </label>

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage(e)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-300 outline-none min-w-0"
          />

          <button
            onClick={handleSendMessage}
            className="w-8 h-8 bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-lg flex items-center justify-center transition-all shrink-0"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  )
}

export default ChatContainer