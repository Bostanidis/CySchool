"use client"

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loader } from 'lucide-react';

export default function SignUp() {
    // Form states
    const [username, setUsername] = useState<string>('');
    const [fullname, setFullname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [grade, setGrade] = useState<any>(null);
    const [school, setSchool] = useState<number | null>(null);
    const [shownName, setShownName] = useState<boolean>(true);
    const { signup } = useAuth();

    interface School {
        id: number;
        greek_name: string;
        english_name: string;
        students: string[];
    }

    // Data states
    const [schools, setSchools] = useState<School[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [erroredInput, setErroredInput] = useState<any>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const router = useRouter();

    // Fetch schools on mount
    useEffect(() => {
        const fetchSchools = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get("http://localhost:8000/api/schools/schools");
                setSchools(res.data);
            } catch (err) {
                console.error("Error during school fetch", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSchools();
    }, []);

    // Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (isLoading) {
            return
        }

        setIsLoading(true)

        const classRegex = /^[ABC][0-9]{2}$/;

        if (!classRegex.test(grade)) {
            setErroredInput(grade);
            setIsLoading(false);
            console.log("incorrect format for", grade);
            return;
        }

        try {
            const credentials = {
                username,
                fullname,
                email,
                password,
                grade,
                school,
                shownName,
            };

            console.log('Submitting form with data:', credentials);

            await signup(credentials);
            router.push('/');
        } catch (err: any) {
            console.error('Signup error:', err.message || err);
            setFormError(err.message || 'Signup failed');
        } finally {
            setIsLoading(false)
        }
    };

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
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    className="focus-visible:ring-orange-500"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fullname">Full Name</Label>
                                <Input
                                    onChange={(e) => setFullname(e.target.value)}
                                    value={fullname}
                                    id="fullname"
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="focus-visible:ring-orange-500"
                                    required
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="showFullName"
                                    checked={shownName}
                                    onCheckedChange={(checked) => setShownName(Boolean(checked))}
                                />
                                <Label htmlFor="showFullName" className="text-sm font-normal">
                                    Show full name publicly
                                </Label>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label htmlFor="grade">Class</Label>
                                    <Input
                                        onChange={(e) => setGrade(e.target.value)}
                                        id="grade"
                                        type="text"
                                        placeholder="Class (B51, A23, C12)"
                                        className={`focus-visible:ring-orange-500 ${erroredInput === grade && erroredInput !== null ? "ring ring-red-500" : ""}`}
                                        required
                                    />
                                    {erroredInput === grade && erroredInput !== null && (
                                        <p className="text-sm text-red-500">Incorrect format. Must be A/B/C followed by two digits.</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="school">School</Label>
                                    <Select
                                        value={school ? school.toString() : ""}
                                        onValueChange={(value) => setSchool(parseInt(value))}
                                    >
                                        <SelectTrigger className="w-full focus:ring-orange-500">
                                            <SelectValue placeholder="Select school" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {schools.map((sch) => (
                                                <SelectItem
                                                    value={`${sch.id}`}
                                                    key={sch.id}
                                                    className="truncate"
                                                >
                                                    <span className="truncate" title={sch.greek_name}>
                                                        {sch.greek_name}
                                                    </span>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="focus-visible:ring-orange-500"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    id="password"
                                    type="password"
                                    placeholder="Create a password"
                                    className="focus-visible:ring-orange-500"
                                    required
                                />
                            </div>

                            {formError && (
                                <div className="text-red-600 mb-4" role="alert">
                                    {formError}
                                </div>
                            )}

                            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                                {isLoading ? (<Loader className='animate-spin' />) : (<p>Create Account</p>)}
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