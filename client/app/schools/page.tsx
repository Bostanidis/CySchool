"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  School,
  MapPin,
  Users,
  GraduationCap,
  BookOpen,
  Filter,
  Grid,
  List,
  LoaderPinwheel,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Schools() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [language, setLanguage] = useState("GR");
  const [isLoading, setIsLoading] = useState(true);

  type School = {
    id: string;
    english_name: string;
    greek_name: string;
    students: string[];
  };

  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    const fetchSchools = async () => {
      if (!isLoading) {
        setIsLoading(true);
      }

      try {
        console.log("Starting fetch request...");

        const res = await fetch("http://localhost:8000/api/schools", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Response status:", res.status);
        console.log("Response ok:", res.ok);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Received data:", data);
        console.log("Data type:", typeof data);
        console.log("Is array:", Array.isArray(data));
        console.log("First school object:", data[0]);
        console.log("First school keys:", Object.keys(data[0] || {}));
        console.log("Sample schools:", data.slice(0, 3));

        setSchools(data);

        // Debug the filtering immediately after setting data
        console.log("About to set schools:", data);
        console.log("Current searchTerm:", "");
        console.log("Current filterType:", "all");
        console.log("Current language:", "GR");
        setIsLoading(false);
      } catch (error: any) {
        console.error("Fetch error:", error);
        console.error("Error details:", {
          message: error.message,
          stack: error.stack,
        });
      }
    };

    fetchSchools();
  }, []);

  // Extract school types from the data
  const schoolTypes = useMemo(() => {
    const types = new Set<string>();
    schools.forEach((school) => {
      const name = school.english_name.toLowerCase();
      if (name.includes("gymnasium")) types.add("gymnasium");
      if (name.includes("lyceum")) types.add("lyceum");
      if (name.includes("tesek")) types.add("tesek");
      if (name.includes("school")) types.add("school");
    });
    return Array.from(types);
  }, []);

  // Filter and search schools
  // Add this temporary debugging version of your filteredSchools
  const filteredSchools = useMemo(() => {
    console.log("=== Filtering Debug ===");
    console.log("Schools array length:", schools.length);
    console.log("Search term:", searchTerm);
    console.log("Filter type:", filterType);
    console.log("Language:", language);

    const result = schools.filter((school) => {
      const searchLabel =
        language === "GR" ? school.greek_name : school.english_name;
      const matchesSearch = searchLabel
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      console.log(`School: ${school.english_name}`);
      console.log(`  Search label: ${searchLabel}`);
      console.log(`  Matches search: ${matchesSearch}`);

      if (filterType === "all") {
        console.log(`  Final result: ${matchesSearch}`);
        return matchesSearch;
      }

      const schoolName = school.english_name.toLowerCase();
      const matchesFilter = schoolName.includes(filterType);
      console.log(`  School name (lower): ${schoolName}`);
      console.log(`  Filter type: ${filterType}`);
      console.log(`  Matches filter: ${matchesFilter}`);
      console.log(`  Final result: ${matchesSearch && matchesFilter}`);

      return matchesSearch && matchesFilter;
    });

    console.log("Filtered result length:", result.length);
    console.log("=== End Filtering Debug ===");
    return result;
  }, [schools, searchTerm, filterType, language]);

  const getSchoolType = (schoolName: string) => {
    const name = schoolName.toLowerCase();
    if (name.includes("lyceum")) return "lyceum";
    if (name.includes("gymnasium")) return "gymnasium";
    if (name.includes("tesek")) return "tesek";
    return "school";
  };

  const getSchoolTheme = (schoolName: string) => {
    const type = getSchoolType(schoolName);

    const themes = {
      lyceum: {
        colors: {
          bg: "bg-blue-100",
          text: "text-blue-600",
          border: "border-l-blue-500",
          hover: "hover:bg-blue-600",
          gradient: "bg-gradient-to-r from-blue-50/50 to-blue-100/50",
        },
        badge: { text: "Lyceum", variant: "default" },
      },
      gymnasium: {
        colors: {
          bg: "bg-green-100",
          text: "text-green-600",
          border: "border-l-green-500",
          hover: "hover:bg-green-600",
          gradient: "bg-gradient-to-r from-green-50/50 to-green-100/50",
        },
        badge: { text: "Gymnasium", variant: "outline" },
      },
      tesek: {
        colors: {
          bg: "bg-orange-100",
          text: "text-orange-600",
          border: "border-l-orange-500",
          hover: "hover:bg-orange-600",
          gradient: "bg-gradient-to-r from-orange-50/50 to-amber-50/50",
        },
        badge: { text: "TESEK", variant: "secondary" },
      },
      school: {
        colors: {
          bg: "bg-gray-100",
          text: "text-gray-600",
          border: "border-l-gray-500",
          hover: "hover:bg-gray-600",
          gradient: "bg-gradient-to-r from-gray-50/50 to-gray-100/50",
        },
        badge: { text: "School", variant: "secondary" },
      },
    };

    return themes[type];
  };

  const getSchoolIcon = (schoolName: string) => {
    const name = schoolName.toLowerCase();
    if (name.includes("lyceum")) return <GraduationCap className="h-5 w-5" />;
    if (name.includes("tesek")) return <BookOpen className="h-5 w-5" />;
    return <School className="h-5 w-5" />;
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header Section */}
      <div className="bg-white border-b shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <School className="h-8 w-8 text-orange-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">
                Schools Directory
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover and connect with educational institutions across Cyprus.
              Find your school community and stay connected.
            </p>
            <div className="flex justify-center items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Users className="h-4 w-4" />
                <span>{schools.length} Schools</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                <span>Cyprus</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search schools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-3 items-center">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Schools</SelectItem>
                  {schoolTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UK">English</SelectItem>
                  <SelectItem value="GR">Ελληνικά</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        {isLoading ? (
          <LoaderPinwheel className="spin" />
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Showing{" "}
                <span className="font-semibold text-orange-600">
                  {filteredSchools.length}
                </span>{" "}
                of {schools.length} schools
              </p>
            </div>

            {/* Schools Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {filteredSchools.map((school) => {
                  const theme = getSchoolTheme(school.english_name);
                  return (
                    <Card
                      key={school.id}
                      className={`hover:shadow-lg justify-between transition-shadow duration-200 border-l-4 ${theme.colors.border}`}
                    >
                      <CardHeader className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 ${theme.colors.bg} rounded-lg ${theme.colors.text}`}
                            >
                              {getSchoolIcon(school.english_name)}
                            </div>
                            <Badge
                              variant={
                                theme.badge.variant as
                                | "default"
                                | "secondary"
                                | "outline"
                                | "destructive"
                              }
                            >
                              {theme.badge.text}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <CardTitle className="text-lg leading-tight">
                            {language === "GR"
                              ? school.greek_name
                              : school.english_name}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button
                          className={`w-full ${theme.colors.hover} hover:text-white transition-colors shadow-md`}
                          variant="outline"
                        >
                          <Users className="h-4 w-4 mr-2" />
                          View Community
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSchools.map((school, index) => {
                  const theme = getSchoolTheme(school.english_name);
                  // Alternating row colors for better distinction
                  const isEven = index % 2 === 0;
                  return (
                    <Card
                      key={school.id}
                      className={`hover:shadow-lg transition-all duration-300 hover:scale-[1.02] ${isEven ? "bg-white" : theme.colors.gradient
                        } border-l-4 ${theme.colors.border}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div
                              className={`p-3 ${theme.colors.bg} rounded-xl ${theme.colors.text} shadow-md`}
                            >
                              {getSchoolIcon(school.english_name)}
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-3">
                                <h3 className="font-bold text-xl text-gray-900">
                                  {language === "GR"
                                    ? school.greek_name
                                    : school.english_name}
                                </h3>
                                <Badge
                                  variant={
                                    theme.badge.variant as
                                    | "default"
                                    | "secondary"
                                    | "outline"
                                    | "destructive"
                                  }
                                >
                                  {theme.badge.text}
                                </Badge>
                                <span className="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded">
                                  #{school.id}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  Cyprus
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  Community Active
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="lg"
                            className={`${theme.colors.hover} hover:text-white transition-colors shadow-md`}
                          >
                            <Users className="h-4 w-4 mr-2" />
                            View Community
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {filteredSchools.length === 0 && (
              <div className="text-center py-12">
                <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No schools found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or filters.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
