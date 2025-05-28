import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SignUp() {
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
                                        <SelectTrigger className="focus:ring-orange-500">
                                            <SelectValue placeholder="Select grade" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="7">Grade 7</SelectItem>
                                            <SelectItem value="8">Grade 8</SelectItem>
                                            <SelectItem value="9">Grade 9</SelectItem>
                                            <SelectItem value="10">Grade 10</SelectItem>
                                            <SelectItem value="11">Grade 11</SelectItem>
                                            <SelectItem value="12">Grade 12</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="school">School</Label>
                                    <Select>
                                        <SelectTrigger className="focus:ring-orange-500">
                                            <SelectValue placeholder="Select school" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {/* Add your school options here */}
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

                            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
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