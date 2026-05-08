import { useRef, useState } from "react";
import { useAuthStore } from '../store/useAuthStore'



export default function ProfilePage() {
    const [preview, setPreview] = useState(null);
    const fileRef = useRef(null);
    const { updateProfile,isUpdating } = useAuthStore();

    const { authUser } = useAuthStore();

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64image = reader.result;
            setPreview(base64image);
            await updateProfile({ profilePic: base64image })
        }

    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-10 w-full max-w-sm shadow-sm">

                {/* Logo */}
                <div className="w-9 h-9 bg-gray-900 rounded-lg mb-5" />

                {/* Header */}
                <h1 className="text-xl font-semibold text-gray-900 mb-1">Profile</h1>
                <p className="text-sm text-gray-400 mb-7">Your personal information.</p>

                {/* Avatar */}
                <div className="flex justify-center mb-7">
                    <div className="relative w-fit">
                        <div
                            onClick={() => fileRef.current.click()}
                            className="w-20 h-20 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center cursor-pointer group"
                        >
                            {preview || authUser.profilePic ? (
                                <img
                                    src={preview || authUser.profilePic}
                                    alt="avatar"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-2xl font-semibold text-gray-400">
                                    {preview || authUser.fullname.charAt(0)}
                                </span>
                            )}

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                    <circle cx="12" cy="13" r="4" />
                                </svg>
                            </div>
                        </div>

                        {/* Small edit badge */}
                        <div
                            onClick={() => fileRef.current.click()}
                            className="absolute bottom-0 right-0 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center cursor-pointer border-2 border-white"
                        >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                        </div>

                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                {isUpdating && (<p className='text-gray-500 text-sm'>Updating Profile...</p>)}

                {/* Fields */}
                <div className="flex flex-col gap-4">

                    {/* Full Name */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                            Full name
                        </label>
                        <input
                            type="text"
                            value={authUser.fullname}
                            readOnly
                            className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg outline-none bg-gray-50 text-gray-500 cursor-default"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                            Email address
                        </label>
                        <input
                            type="email"
                            value={authUser.email}
                            readOnly
                            className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg outline-none bg-gray-50 text-gray-500 cursor-default"
                        />
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 mt-7 pt-5 flex items-center gap-2 text-gray-400">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span className="text-xs">
                        Member since{" "}
                        <span className="text-gray-600 font-medium">{authUser.createdAt?.split("T")[0]}</span>
                    </span>
                </div>

            </div>
        </div>
    );
}