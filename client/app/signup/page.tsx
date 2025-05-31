"use client"


import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { handleSignup } from '@/utils/authFunctions';

export default function SignUp() {


    interface School {
        id: number;
        greek_name: string;
        english_name: string;
        students: string[];
    }

    // States
    const [schools, setSchools] = useState<School[]>([])
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {

        const fetchSchools = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get("http://localhost:8000/api/schools")
                setSchools(res.data)
            } catch (err) {
                console.error("Error during school fetch", err)
            } finally {
                setIsLoading(false);
            }
        };

        fetchSchools()

    }, [])


    return (
        <div className="h-screen bg-green-100 flex items-center justify-center p-0 overflow-hidden">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full h-full max-w-none flex">
                {/* Left side - Sign up form */}
                <div className="w-1/2 p-4 flex flex-col justify-center overflow-y-auto">
                    <div className="max-w-sm mx-auto w-full space-y-6 max-h-full ">
                        {/* Logo */}
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                                <Image width={32} height={32} alt="CySchool Logo" src="/CySchool1.png" />
                            </div>
                            <span className="text-lg font-semibold text-gray-800">CySchool</span>
                        </div>

                        {/* Header */}
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
                            <p className="text-sm text-gray-600">Please enter your details to sign up.</p>
                        </div>

                        {/* Form */}
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    className="focus-visible:ring-orange-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fullname">Full Name</Label>
                                <Input
                                    id="fullname"
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="focus-visible:ring-orange-500"
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox id="showFullName" />
                                <Label htmlFor="showFullName" className="text-sm font-normal">
                                    Show full name publicly
                                </Label>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label htmlFor="grade">Grade</Label>
                                    <Select>
                                        <SelectTrigger className="w-full focus:ring-orange-500">
                                            <SelectValue placeholder="Select grade" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="7">A Gymnasium</SelectItem>
                                            <SelectItem value="8">B Gymnasium</SelectItem>
                                            <SelectItem value="9">C Gymnasium</SelectItem>
                                            <SelectItem value="10">A Lyceum</SelectItem>
                                            <SelectItem value="11">B Lyceum</SelectItem>
                                            <SelectItem value="12">C Lyceum</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="school">School</Label>
                                    <Select>
                                        <SelectTrigger className="w-full focus:ring-orange-500">
                                            <SelectValue placeholder="Select school" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {schools.map((school) => {
                                                return (
                                                    <SelectItem
                                                        value={`${school.id}`}
                                                        key={school.id}
                                                        className="truncate"
                                                    >
                                                        <span className="truncate" title={school.greek_name}>
                                                            {school.greek_name}
                                                        </span>
                                                    </SelectItem>
                                                )
                                            })}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="focus-visible:ring-orange-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Create a password"
                                    className="focus-visible:ring-orange-500"
                                />
                            </div>

                            <Button onClick={handleSignup} type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                                Create account
                            </Button>
                        </form>

                        {/* Sign in link */}
                        <div className="text-center text-sm">
                            <span className="text-gray-600">Already have an account? </span>
                            <a href="/login" className="text-orange-500 hover:text-orange-600 font-medium">
                                Sign in
                            </a>
                        </div>

                        {/* Copyright */}
                        <div className="text-xs text-gray-500 text-center">
                            © CySchool 2024
                        </div>
                    </div>
                </div>

                {/* Right side - Image */}
                <div className="w-1/2 bg-green-100 flex items-center justify-center p-0">
                    <div className="w-full h-full">
                        <img
                            src="/limassol.png"
                            alt="Limassol cityscape"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}