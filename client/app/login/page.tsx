import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function Login() {
    return (
        <div className="h-screen bg-green-100 flex items-center justify-center p-0 overflow-hidden">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full h-full max-w-none flex">
                {/* Left side - Login form */}
                <div className="w-1/2 p-8 flex flex-col justify-center">
                    <div className="max-w-sm mx-auto w-full space-y-6">
                        {/* Logo */}
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                                <Image width={32} height={32} alt="CySchool Logo" src="/CySchool1.png" />
                            </div>
                            <span className="text-lg font-semibold text-gray-800">CySchool</span>
                        </div>

                        {/* Header */}
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
                            <p className="text-sm text-gray-600">Please enter your details.</p>
                        </div>

                        {/* Form */}
                        <form className="space-y-4">
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
                                    placeholder="••••••••"
                                    className="focus-visible:ring-orange-500"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="remember" />
                                    <Label htmlFor="remember" className="text-sm font-normal">
                                        Remember for 30 days
                                    </Label>
                                </div>
                                <a href="#" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
                                    Forgot password
                                </a>
                            </div>

                            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                                Sign in
                            </Button>
                        </form>

                        {/* Sign up link */}
                        <div className="text-center text-sm">
                            <span className="text-gray-600">Don't have an account? </span>
                            <a href="/signup" className="text-orange-500 hover:text-orange-600 font-medium">
                                Sign up
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