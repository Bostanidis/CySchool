import { BookUser } from "lucide-react";

export default function ClassmatesPage() {
    // Sample data - replace with your actual data fetching
    const classmates = [
        { id: 1, name: "Marnie Richards", year: "Year A1", avatar: "/api/placeholder/60/60", isOnline: true },
        { id: 2, name: "Millie Barker", year: "Year A2", avatar: "/api/placeholder/60/60", isOnline: false },
        { id: 3, name: "Willie Simon", year: "Year A3", avatar: "/api/placeholder/60/60", isOnline: true },
        { id: 4, name: "Tommy Abbott", year: "Year A4", avatar: "/api/placeholder/60/60", isOnline: false },
        { id: 5, name: "Georgia Hart", year: "Year B1", avatar: "/api/placeholder/60/60", isOnline: true },
        { id: 6, name: "Ine Osborne", year: "Year B2", avatar: "/api/placeholder/60/60", isOnline: false },
        { id: 7, name: "Craig Carpenter", year: "Year B3", avatar: "/api/placeholder/60/60", isOnline: true },
        { id: 8, name: "Joe Hines", year: "Year B4", avatar: "/api/placeholder/60/60", isOnline: false },
        { id: 9, name: "Rodney Schultz", year: "Year C1", avatar: "/api/placeholder/60/60", isOnline: true },
        { id: 10, name: "Elmer Lynch", year: "Year C2", avatar: "/api/placeholder/60/60", isOnline: false },
        { id: 11, name: "Hedda Robbins", year: "Year C3", avatar: "/api/placeholder/60/60", isOnline: true },
        { id: 12, name: "Claudia Brown", year: "Year C4", avatar: "/api/placeholder/60/60", isOnline: false },
    ];

    return (
        <div className="flex h-full bg-gray-50">
            {/* Main Content Area */}
            <div className="flex-1 p-6">
                <div className="bg-white rounded-lg shadow-sm h-full">
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
                                                    {student.name.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                        </div>
                                        {student.isOnline && (
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                        )}
                                    </div>
                                    <h3 className="font-medium text-gray-900 text-sm text-center mb-1">
                                        {student.name}
                                    </h3>
                                    <p className="text-xs text-gray-500">{student.year}</p>
                                </div>
                            ))}
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