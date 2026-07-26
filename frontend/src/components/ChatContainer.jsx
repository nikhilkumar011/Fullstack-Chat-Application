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
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-violet-50/40 min-h-0 px-6">
        <div className="relative w-16 h-16 mb-5">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 blur-lg opacity-40" />
          <div className="relative w-16 h-16 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-3xl flex items-center justify-center shadow-lg shadow-violet-500/30">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        </div>
        <h2 className="text-lg font-bold text-slate-800 mb-1.5 tracking-tight">Welcome to ChatApp</h2>
        <p className="text-sm text-slate-400 text-center max-w-[240px]">Pick a conversation from the list to start messaging.</p>
      </div>
    )
  }

  return (
    <div className="flex-1 h-full flex flex-col bg-slate-50 overflow-hidden min-w-0">

      {/* Chat Header */}
      <div className="flex items-center gap-3 px-4 sm:px-5 py-3 border-b border-slate-200/70 bg-white/80 backdrop-blur-md shrink-0 sticky top-0 z-10">
        <div className="shrink-0 relative p-[2px] rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400">
          {selectedUser.profilePic ? (
            <img
              src={selectedUser.profilePic}
              alt={selectedUser.fullname}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-white"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-white text-sm font-semibold ring-2 ring-white">
              {selectedUser.fullname.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 truncate">{selectedUser.fullname}</p>
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${onlineUsers.includes(selectedUser._id) ? "bg-emerald-500 shadow-[0_0_5px_1px_rgba(16,185,129,0.6)]" : "bg-slate-300"}`} />
            <p className={`text-xs font-medium ${onlineUsers.includes(selectedUser._id) ? "text-emerald-600" : "text-slate-400"}`}>
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      {/* Messages Area */}
      <div
        className="flex-1 overflow-y-auto px-3 sm:px-5 py-4 flex flex-col gap-3 min-h-0"
        style={{
          backgroundColor: '#F8F8FC',
          backgroundImage: `
            radial-gradient(circle at 12% 8%, rgba(139,92,246,0.12), transparent 38%),
            radial-gradient(circle at 88% 20%, rgba(217,70,239,0.09), transparent 35%),
            radial-gradient(circle at 50% 100%, rgba(34,211,238,0.10), transparent 42%),
            radial-gradient(rgba(148,163,184,0.4) 1px, transparent 1px)
          `,
          backgroundSize: 'auto, auto, auto, 24px 24px',
        }}
      >
        {messages.map((each) => (
          <div
            key={each._id}
            className={`flex items-end gap-2 max-w-[85%] sm:max-w-[70%] ${each.senderId === authUser._id ? "self-end flex-row-reverse" : "self-start"}`}
            ref={messageEndRef}
          >
            {each.senderId !== authUser._id && (
              <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-[11px] font-semibold text-white shrink-0 mb-0.5">
                {selectedUser.fullname.charAt(0)}
              </div>
            )}
            <div className="gap-1.5 flex-col flex min-w-0">
              {each.image && (
                <img src={each.image} alt="" className="w-[180px] sm:w-[220px] rounded-2xl shadow-sm ring-1 ring-black/5" />
              )}
              {each.text && (
                <div className={
                  each.senderId === authUser._id
                    ? "bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-md shadow-sm shadow-violet-500/20 break-words"
                    : "bg-white border border-slate-200/80 text-slate-700 text-sm px-4 py-2.5 rounded-2xl rounded-bl-md shadow-sm break-words"
                }>
                  {each.text}
                </div>
              )}
              <div className={`text-[10.5px] text-slate-400 font-medium ${each.senderId === authUser._id ? "text-right" : "text-left"}`}>
                {formatMessageTime(each.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="px-3 py-3 sm:px-5 sm:py-4 bg-white border-t border-slate-200/70 shrink-0">
        {selectedFile && (
          <div className="flex items-center gap-2 mb-2.5 px-1">
            <div className="flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-lg px-3 py-1.5 text-xs text-violet-700 font-medium max-w-[220px]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.41 17.41a2 2 0 0 1-2.83-2.83l8.49-8.49" />
              </svg>
              <span className="truncate">{selectedFile.name}</span>
            </div>
            <button onClick={() => { setSelectedFile(null); setImagePreview(null); }} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 bg-slate-100/80 border border-transparent rounded-2xl px-3 py-2 focus-within:bg-white focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100 transition-all">
          <label className="cursor-pointer text-slate-400 hover:text-violet-500 transition-colors shrink-0 p-1.5 rounded-full hover:bg-violet-50">
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
            className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none min-w-0"
          />

          <button
            onClick={handleSendMessage}
            className="w-9 h-9 bg-gradient-to-br from-violet-600 to-fuchsia-600 hover:shadow-lg hover:shadow-violet-500/30 active:scale-90 rounded-xl flex items-center justify-center transition-all shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
