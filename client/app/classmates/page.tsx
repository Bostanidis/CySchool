"use client"

import { useUser } from "@/contexts/userContext";
import api from "@/lib/axios";
import { BookUser } from "lucide-react";
import { useEffect, useState } from "react";

export default function ClassmatesPage() {

    // Interfaces
    interface User {
        id: string;
        username: string;
        grade: string;
        friends: string[];
        avatar: string;
        school: number;
        isOnline: boolean;
    }

    // States
    const [classmates, setClassmates] = useState<User[]>([]);
    const [schoolers, setSchoolers] = useState<User[]>([]);
    const { user } = useUser();


    useEffect(() => {
        const fetchClassmates = async () => {
            try {
                const school = user?.school;
                const grade = user?.grade;

                const response = await api.get(`/classmates?school=${school}&grade=${grade}`);

                console.log("FETCHING CLASSMATES");
                console.log(response);

                setClassmates(response.data.classmates);
                setSchoolers(response.data.schoolers);
            } catch (err) {
                console.error("Error fetching classmates:", err);
            }
        };

        fetchClassmates();
    }, [user]);


    return (
        <div className="flex h-full bg-gray-50">
            {/* Main Content Area */}
            <div className="flex-1 p-6">
                <div className="bg-white rounded-lg shadow-sm h-full flex flex-col gap-8">

                    <div className="">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                                <BookUser className="text-orange-400" />
                                <h1>STUDENTS</h1>
                            </div>
                        </div>

                        {/* Students Grid */}
                        <div className="p-6">
                            <div className="grid grid-cols-4 gap-6">
                                {classmates.map((student) => (
                                    <div key={student.id} className="flex flex-col items-center group cursor-pointer">
                                        <div className="relative mb-3">
                                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-blue-400 transition-colors">
                                                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                                    <span className="text-white font-semibold text-lg">
                                                        {student.username.split(' ').map(n => n[0]).join('')}
                                                    </span>
                                                </div>
                                            </div>
                                            {student.isOnline && (
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                            )}
                                        </div>
                                        <h3 className="font-medium text-gray-900 text-sm text-center mb-1">
                                            {student.username}
                                        </h3>
                                        <p className="text-xs text-gray-500">{student.grade}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* Schoolers */}
                    <div className="">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                                <BookUser className="text-orange-400" />
                                <h1>SCHOOL</h1>
                            </div>
                        </div>

                        {/* Students Grid */}
                        <div className="p-6">
                            <div className="grid grid-cols-4 gap-6">
                                {schoolers.map((student) => (
                                    <div key={student.id} className="flex flex-col items-center group cursor-pointer">
                                        <div className="relative mb-3">
                                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-blue-400 transition-colors">
                                                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                                    <span className="text-white font-semibold text-lg">
                                                        {student.username.split(' ').map(n => n[0]).join('')}
                                                    </span>
                                                </div>
                                            </div>
                                            {student.isOnline && (
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                            )}
                                        </div>
                                        <h3 className="font-medium text-gray-900 text-sm text-center mb-1">
                                            {student.username}
                                        </h3>
                                        <p className="text-xs text-gray-500">{student.grade}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Sidebar - Empty space for future content */}
            <div className="w-80 p-6 pl-0">
                <div className="bg-white rounded-lg shadow-sm h-full p-6">
                    {/* This space is reserved for charts, seating charts, etc. */}
                    <div className="h-full flex items-center justify-center text-gray-400">
                        <p>Reserved space for future content</p>
                    </div>
                </div>
            </div>
        </div>
    );
}