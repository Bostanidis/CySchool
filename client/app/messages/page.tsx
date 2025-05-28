"use client"

import { useEffect, useState } from "react";
import { Send, Paperclip, Search, MoreHorizontal, File, Image, Video, Plus, Phone, VideoIcon } from "lucide-react";
import { io } from 'socket.io-client';
import axios from "axios"


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const socket = io('http://localhost:8000');

export default function Messages() {

    // Interfaces
    type Message = {
        id: string;
        sender: string;
        time: string;
        text?: string;
        avatar?: string;
        isOwn?: boolean;
        hasAudio?: boolean;
        hasFile?: boolean;
        fileName?: string;
        fileType?: string;
    };

    type Conversation = {
        id: string;
        is_direct: boolean;
        participants: string[];
        created_at?: string;
    }


    // States 
    const [input, setInput] = useState("");
    const [activeTab, setActiveTab] = useState("Messages");
    const [currentView, setCurrentView] = useState("list"); // "list" or "chat"
    const [selectedChat, setSelectedChat] = useState<any>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [people, setPeople] = useState<Conversation[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get<Message[]>('http://localhost:8000/api/messages');
                setMessages(res.data);
            } catch (err) {
                console.error("error parsing messages", err)
            }
        };
        fetchMessages();
    }, []);



    useEffect(() => {
        const handleReceiveMessage = (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        socket.on('receive-message', handleReceiveMessage);

        return () => {
            socket.off('receive-message', handleReceiveMessage); // 🔒 Clean up listener
        };
    }, []);

    const sendMessage = () => {
        socket.emit('send-message', input);
        setInput('');
    }

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get<Conversation[]>('http://localhost:8000/api/conversations');
                setPeople(res.data);
            } catch (err) {
                console.error("error getting conversation", err)
            }
        }
        getConversations()
    }, [])


    const timelineUsers = [
        { id: 1, name: "User 1", avatar: "/api/placeholder/32/32" },
        { id: 2, name: "User 2", avatar: "/api/placeholder/32/32" },
        { id: 3, name: "User 3", avatar: "/api/placeholder/32/32" },
        { id: 4, name: "User 4", avatar: "/api/placeholder/32/32" },
        { id: 5, name: "User 5", avatar: "/api/placeholder/32/32" }
    ];

    // const people = [
    //     {
    //         id: 1,
    //         name: "Brand Practice - Kristin Watson",
    //         time: "11:30 AM - 12:00 PM",
    //         avatar: "/api/placeholder/32/32"
    //     },
    //     {
    //         id: 2,
    //         name: "Brand Practice - Bessie Cooper",
    //         time: "11:30 AM - 12:00 PM",
    //         avatar: "/api/placeholder/32/32"
    //     },
    //     {
    //         id: 3,
    //         name: "Brand Practice - Robert Foxn",
    //         time: "11:30 AM - 12:00 PM",
    //         avatar: "/api/placeholder/32/32"
    //     },
    //     {
    //         id: 4,
    //         name: "Brand Practice - Marvin McKinney",
    //         time: "11:30 AM - 12:00 PM",
    //         avatar: "/api/placeholder/32/32"
    //     }
    // ];

    const groups = [
        {
            id: 1,
            name: "GPT-5, Research Book 0.5",
            time: "11:30 AM - 12:00 PM",
            avatars: ["/api/placeholder/32/32", "/api/placeholder/32/32"]
        },
        {
            id: 2,
            name: "Deepfake AI",
            time: "11:30 AM - 12:00 PM",
            avatars: ["/api/placeholder/32/32", "/api/placeholder/32/32"]
        },
        {
            id: 3,
            name: "Future of ai revolution",
            time: "11:30 AM - 12:00 PM",
            avatars: ["/api/placeholder/32/32", "/api/placeholder/32/32"]
        }
    ];

    const handleChatSelect = (chat: any) => {
        setSelectedChat(chat);
        setCurrentView("chat");
    };

    const handleBackClick = () => {
        setCurrentView("list");
        setSelectedChat(null);
    };

    const fileStats = [
        { type: "Documents", count: 231, color: "bg-teal-500", icon: File },
        { type: "Photos", count: 45, color: "bg-orange-400", icon: Image },
        { type: "Movies", count: "", color: "bg-blue-500", icon: Video },
        { type: "Others", count: "19 files, 2GB MB", color: "bg-red-400", icon: Plus }
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Main Area */}
            <div className="flex-1 flex flex-col">
                {currentView === "list" ? (
                    // People and Groups List View
                    <>
                        {/* Header */}
                        <div className="bg-white border-b border-gray-200 px-6 py-4">
                            <h1 className="text-lg font-semibold text-gray-900">Messages</h1>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {/* Time Machine Section */}
                            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Create a group</h2>
                                <div className="flex items-center space-x-3">
                                    <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                                        <Plus className="w-5 h-5 text-gray-600" />
                                    </button>
                                    {timelineUsers.map((user, index) => (
                                        <div key={user.id} className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                                    ))}
                                </div>
                            </div>

                            {/* People Section */}
                            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
                                <div className="flex gap-4 items-center">
                                    <h2 className="text-lg font-semibold text-gray-900">People</h2>
                                    <Select>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a fruit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Fruits</SelectLabel>
                                                { }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-3">
                                    {people.map((person) => (
                                        <div
                                            key={person.id}
                                            className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                                            onClick={() => handleChatSelect(person)}
                                        >
                                            <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Group Messages Section */}
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Group message</h2>
                                <div className="space-y-3">
                                    {groups.map((group) => (
                                        <div
                                            key={group.id}
                                            className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                                            onClick={() => handleChatSelect(group)}
                                        >
                                            <div className="flex -space-x-2">
                                                {group.avatars.map((avatar, index) => (
                                                    <div key={index} className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white"></div>
                                                ))}
                                            </div>
                                            <div className="flex-1 min-w-0 ml-2">
                                                <p className="text-sm font-medium text-gray-900 truncate">{group.name}</p>
                                                <p className="text-xs text-gray-500">{group.time}</p>
                                            </div>
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    // Chat View
                    <>
                        {/* Chat Header */}
                        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <button
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                    onClick={handleBackClick}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                    <div>
                                        <h1 className="text-lg font-semibold text-gray-900">
                                            {selectedChat?.name || "Kristin Watson"}
                                        </h1>
                                        <p className="text-xs text-gray-500">Last seen 5 min</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                                    <Phone className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                                    <VideoIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id}>
                                    <div className={`flex items-start space-x-3 ${msg.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                        <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                                        <div className={`flex flex-col ${msg.isOwn ? 'items-end' : 'items-start'} max-w-xs lg:max-w-md`}>
                                            {msg.time && (
                                                <span className="text-xs text-gray-500 mb-1">{msg.time}</span>
                                            )}
                                            <div className={`px-4 py-2 rounded-lg ${msg.isOwn
                                                ? 'bg-teal-500 text-white'
                                                : 'bg-white text-gray-900 border border-gray-200'
                                                }`}>
                                                {msg.hasAudio ? (
                                                    <div className="flex items-center space-x-2">
                                                        <button className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                                            <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent ml-0.5"></div>
                                                        </button>
                                                        <div className="flex-1 flex items-center space-x-1">
                                                            {Array.from({ length: 20 }).map((_, i) => (
                                                                <div key={i} className={`w-0.5 bg-white bg-opacity-60 rounded-full ${i < 8 ? 'h-2' : i < 12 ? 'h-3' : i < 16 ? 'h-2' : 'h-1'
                                                                    }`}></div>
                                                            ))}
                                                        </div>
                                                        <span className="text-xs text-white">0:30</span>
                                                    </div>
                                                ) : msg.hasFile ? (
                                                    <div>
                                                        <p className="text-sm mb-2">{msg.text}</p>
                                                        <div className="bg-purple-100 rounded-lg p-3 flex items-center space-x-3">
                                                            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                                                                <File className="w-4 h-4 text-white" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="text-sm font-medium text-gray-900">{msg.fileName}</p>
                                                                <p className="text-xs text-gray-500">{msg.fileType}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className="text-sm">{msg.text}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Typing indicator */}
                            <div className="flex items-center space-x-2 text-gray-500">
                                <span className="text-sm">Kristin is typing</span>
                                <div className="flex space-x-1">
                                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="bg-white border-t border-gray-200 p-4">
                            <div className="flex items-center space-x-3">
                                <button className="p-2 text-gray-400 hover:text-gray-600">
                                    <Plus className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-600">
                                    <Paperclip className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-600">
                                    <Image className="w-5 h-5" />
                                </button>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder=""
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    />
                                </div>
                                <button
                                    className="p-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                                    onClick={sendMessage}
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Right Sidebar - Only show in chat view */}
            {currentView === "chat" && (
                <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
                    {/* Profile Section */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3"></div>
                            <h3 className="font-semibold text-gray-900">{selectedChat?.name || "Kristin Watson"}</h3>
                            <p className="text-sm text-gray-500">@watson.kristin</p>
                        </div>
                    </div>

                    {/* Shared Files Section */}
                    <div className="flex-1 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-gray-900">Shared files</h4>
                            <button className="text-teal-500 hover:text-teal-600">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </div>

                        {/* File Statistics */}
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">All files</span>
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg font-semibold text-gray-900">231</span>
                                    <span className="text-lg font-semibold text-gray-900">45</span>
                                </div>
                            </div>
                        </div>

                        {/* File Types */}
                        <div className="space-y-1">
                            <div className="flex items-center justify-between py-1 text-sm text-gray-600 mb-2">
                                <span>File type</span>
                            </div>

                            {fileStats.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <div key={index} className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-2 -mx-2">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center`}>
                                                <IconComponent className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{item.type}</span>
                                        </div>
                                        <div className="text-right">
                                            {typeof item.count === 'number' ? (
                                                <span className="text-sm font-semibold text-gray-900">{item.count}</span>
                                            ) : (
                                                <span className="text-xs text-gray-500">{item.count}</span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}