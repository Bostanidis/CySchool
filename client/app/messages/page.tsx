"use client"

import { useEffect, useState } from "react";
import { Send, Paperclip, Search, MoreHorizontal, Image as ImageIcon, File, Video, Plus, Phone, VideoIcon, Router, GroupIcon, UserRound, UserRoundIcon, CircleUserRound, Users } from "lucide-react";
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
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Image from "next/image";
import { useUser } from "@/contexts/userContext";
import { formatTimeAgo } from "@/utils/formatTimeAgo";


const socket = io('http://localhost:8000');

export default function Messages() {

    // Interfaces
    type Message = {
        id: string;
        sender_id: string;
        created_at: string;
        content?: any;
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
        avatar?: string;
        name?: string;
    }


    // States 
    const [input, setInput] = useState("");
    const [activeTab, setActiveTab] = useState("Messages");
    const [currentView, setCurrentView] = useState("list"); // "list" or "chat"
    const [selectedChat, setSelectedChat] = useState<any>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [people, setPeople] = useState<Conversation[]>([]);
    const [groups, setGroups] = useState<Conversation[]>([]);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedChatParticipants, setSelectedChatParticipants] = useState<any>([]);

    const { user } = useUser();

    const router = useRouter()

    // Fetching Logic
    useEffect(() => {

        if (!user) return;
        // Conversations, People, Chats, Groups
        const fetchConversations = async () => {
            try {
                const res = await api.get<Conversation[]>(`/conversations?user_id=${user?.id}`);
                setConversations(res.data);

                console.log(res.data)

                const people: Conversation[] = [];
                const groups: Conversation[] = [];

                for (const convo of res.data) {
                    if (convo.is_direct) {
                        people.push(convo);
                    } else {
                        groups.push(convo);
                    }
                }

                setPeople(people);
                setGroups(groups);
            } catch (err) {
                console.error("error getting conversation", err)
            }
        }

        fetchConversations()

    }, [user]);

    useEffect(() => {

        const fetchMessages = async () => {
            if (!selectedChat) return;

            try {
                const res = await api.get(`/messages?selectedConversationId=${selectedChat.id}`);

                setMessages(res.data);
            } catch (err) {
                console.error('Failed to fetch schools', err);
            }
        };

        fetchMessages();

    }, [selectedChat])


    // Participants Fetching
    useEffect(() => {


    }, [selectedChat])


    // Sockets and messaging logic
    useEffect(() => {
        const handleReceiveMessage = (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        socket.on('receive-message', handleReceiveMessage);

        return () => {
            socket.off('receive-message', handleReceiveMessage);
        };
    }, []);


    // Socket Messaging
    const sendMessage = async () => {
        if (!input.trim()) return;

        const messageData = {
            conversation_id: selectedChat.id,
            sender_id: user?.id,
            content: input.trim()
        };

        try {
            const res = await api.post('/messages', messageData);
            const savedMessage = res.data;

            socket.emit('send-message', savedMessage);
            setInput('');
        } catch (err) {
            console.error('Failed to send message:', err);
        }
    };



    const timelineUsers = [
        { id: 1, name: "User 1", avatar: "/api/placeholder/32/32" },
        { id: 2, name: "User 2", avatar: "/api/placeholder/32/32" },
        { id: 3, name: "User 3", avatar: "/api/placeholder/32/32" },
        { id: 4, name: "User 4", avatar: "/api/placeholder/32/32" },
        { id: 5, name: "User 5", avatar: "/api/placeholder/32/32" }
    ];

    const handleChatSelect = (chat: any) => {
        setSelectedChat(chat);

        const fetchParticipants = async () => {

            const otherParticipants = chat.participants.filter((id: string) => id !== user?.id);
            try {
                const res = await api.get('/users', {
                    params: {
                        participants: otherParticipants, // Axios automatically serializes arrays like ?participants=uuid1&participants=uuid2
                    }
                });
                setSelectedChatParticipants(res.data);
            } catch (err) {
                console.error("Error while fetching the participants", err)
            }

        }

        fetchParticipants()

        setCurrentView("chat");
    };

    const handleBackClick = () => {
        setCurrentView("list");
        setSelectedChat(null);
    };

    const handleKeyDown = (event: any) => {
        if (event.key === "Enter") {
            sendMessage()
        }
    }

    const fileStats = [
        { type: "Documents", count: 231, color: "bg-teal-500", icon: File },
        { type: "Photos", count: 45, color: "bg-orange-400", icon: ImageIcon },
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
                                            <SelectValue placeholder="Select a friend" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
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
                                                {group.avatar ? <Image src={group.avatar} alt="Group avatar" /> : <Users />}
                                            </div>
                                            <div className="flex-1 min-w-0 ml-2">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {group.name ? `${group.name}` : `Group`}
                                                </p>
                                                {/* <p className="text-xs text-gray-500">{group.time}</p> */}
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
                                    {selectedChatParticipants[0]?.avatar ? (
                                        <Image width={64} height={64} alt="user profile picture" src={selectedChatParticipants[0]?.avatar} />
                                    ) : (<UserRound width={32} height={32} />)}
                                    <div>
                                        <h1 className="text-lg font-semibold text-gray-900">
                                            {selectedChat?.name || "Chat"}
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
                                    <div className={`flex items-end space-x-3 ${msg.sender_id === user?.id ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                        {selectedChatParticipants[0]?.avatar ? (
                                            <Image width={64} height={64} alt="user profile picture" src={selectedChatParticipants[0]?.avatar} />
                                        ) : (<CircleUserRound width={32} height={32} className="flex-shrink-0" />)}
                                        <div className={`flex flex-col ${msg.sender_id === user?.id ? 'items-end' : 'items-start'} max-w-xs lg:max-w-md`}>
                                            {msg.created_at && (
                                                <span className="text-xs text-gray-500 mb-1">{formatTimeAgo(msg.created_at)}</span>
                                            )}
                                            <div className={`px-4 py-2 rounded-lg ${msg.sender_id === user?.id
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
                                                        <p className="text-sm mb-2">{msg.content}</p>
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
                                                    <p className="text-sm">{msg.content}</p>
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
                                    <ImageIcon className="w-5 h-5" />
                                </button>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
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
                            <h3 className="font-semibold text-gray-900">{selectedChat?.name || "Chat"}</h3>
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