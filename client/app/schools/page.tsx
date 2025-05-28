'use client';

import { useState, useEffect } from 'react';
import { Search, GraduationCap, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface School {
  id: number;
  greek_name: string;
  english_name: string;
  students: string[];
}

export default function SchoolsPage() {

  // States
  const [schools, setSchools] = useState<School[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Router
  const router = useRouter();

  // Fetch schools from API
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/schools');
        if (!response.ok) {
          throw new Error('Failed to fetch schools');
        }
        const data = await response.json();
        setSchools(data);
        setFilteredSchools(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  // Filter schools based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSchools(schools);
    } else {
      const filtered = schools.filter(school =>
        school.english_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.greek_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSchools(filtered);
    }
  }, [searchQuery, schools]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-8"></div>
            <div className="h-12 bg-gray-300 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Schools</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Schools Directory</h1>
          <p className="text-gray-600">Browse and search through all schools in Cyprus</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search schools by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing {filteredSchools.length} of {schools.length} schools
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Schools Grid */}
        {filteredSchools.length === 0 ? (
          <div className="text-center py-12">
            <GraduationCap className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No schools found</h3>
            <p className="text-gray-500">
              {searchQuery ? 'Try adjusting your search terms' : 'No schools available'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchools.map((school) => (
              <SchoolCard key={school.id} school={school} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SchoolCard({ school }: { school: School }) {

  const router = useRouter();

  // Determine school type based on name
  const getSchoolType = (name: string) => {
    if (name.toLowerCase().includes('γυμνάσιο') || name.toLowerCase().includes('gymnasium')) {
      return 'Gymnasium';
    } else if (name.toLowerCase().includes('λύκειο') || name.toLowerCase().includes('lyceum')) {
      return 'Lyceum';
    } else if (name.toLowerCase().includes('τεσεκ') || name.toLowerCase().includes('tesek')) {
      return 'TESEK';
    }
    return 'School';
  };

  const schoolType = getSchoolType(school.english_name);
  const studentCount = school.students ? school.students.length : 0;

  // Color scheme based on school type
  const getColorScheme = (type: string) => {
    switch (type) {
      case 'Gymnasium':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'text-blue-600',
          badge: 'bg-blue-100 text-blue-800'
        };
      case 'Lyceum':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'text-green-600',
          badge: 'bg-green-100 text-green-800'
        };
      case 'TESEK':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          icon: 'text-purple-600',
          badge: 'bg-purple-100 text-purple-800'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          icon: 'text-gray-600',
          badge: 'bg-gray-100 text-gray-800'
        };
    }
  };

  const colors = getColorScheme(schoolType);

  return (
    <button onClick={() => {
      router.push(`/schools/${school.id}`)
    }} className={`${colors.bg} ${colors.border} h-60 flex justify-between flex-col border rounded-lg p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer group`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${colors.bg} ${colors.border} border group-hover:scale-110 transition-transform duration-200`}>
          <GraduationCap className={`h-6 w-6 ${colors.icon}`} />
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors.badge}`}>
          {schoolType}
        </span>
      </div>

      {/* School Names */}
      <div className="mb-4 text-left">
        <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1 group-hover:text-blue-600 transition-colors">
          {school.english_name}
        </h3>
        <p className="text-sm text-gray-600 leading-tight">
          {school.greek_name}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center text-sm text-gray-500">
          <Users className="h-4 w-4 mr-1" />
          <span>{studentCount} students</span>
        </div>
        <div className="text-xs text-gray-400">
          ID: {school.id}
        </div>
      </div>
    </button>
  );
}