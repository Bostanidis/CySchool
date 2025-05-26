"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var input_1 = require("@/components/ui/input");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var select_1 = require("@/components/ui/select");
function Schools() {
    var _this = this;
    var _a = react_1.useState(""), searchTerm = _a[0], setSearchTerm = _a[1];
    var _b = react_1.useState("all"), filterType = _b[0], setFilterType = _b[1];
    var _c = react_1.useState("grid"), viewMode = _c[0], setViewMode = _c[1];
    var _d = react_1.useState("GR"), language = _d[0], setLanguage = _d[1];
    var _e = react_1.useState(true), isLoading = _e[0], setIsLoading = _e[1];
    var _f = react_1.useState([]), schools = _f[0], setSchools = _f[1];
    react_1.useEffect(function () {
        var fetchSchools = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isLoading) {
                            setIsLoading(true);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        console.log("Starting fetch request...");
                        return [4 /*yield*/, fetch("http://localhost:8000/api/schools", {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })];
                    case 2:
                        res = _a.sent();
                        console.log("Response status:", res.status);
                        console.log("Response ok:", res.ok);
                        if (!res.ok) {
                            throw new Error("HTTP error! status: " + res.status);
                        }
                        return [4 /*yield*/, res.json()];
                    case 3:
                        data = _a.sent();
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
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error("Fetch error:", error_1);
                        console.error("Error details:", {
                            message: error_1.message,
                            stack: error_1.stack
                        });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchSchools();
    }, []);
    // Extract school types from the data
    var schoolTypes = react_1.useMemo(function () {
        var types = new Set();
        schools.forEach(function (school) {
            var name = school.english_name.toLowerCase();
            if (name.includes("gymnasium"))
                types.add("gymnasium");
            if (name.includes("lyceum"))
                types.add("lyceum");
            if (name.includes("tesek"))
                types.add("tesek");
            if (name.includes("school"))
                types.add("school");
        });
        return Array.from(types);
    }, []);
    // Filter and search schools
    // Add this temporary debugging version of your filteredSchools
    var filteredSchools = react_1.useMemo(function () {
        console.log("=== Filtering Debug ===");
        console.log("Schools array length:", schools.length);
        console.log("Search term:", searchTerm);
        console.log("Filter type:", filterType);
        console.log("Language:", language);
        var result = schools.filter(function (school) {
            var searchLabel = language === "GR" ? school.greek_name : school.english_name;
            var matchesSearch = searchLabel
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            console.log("School: " + school.english_name);
            console.log("  Search label: " + searchLabel);
            console.log("  Matches search: " + matchesSearch);
            if (filterType === "all") {
                console.log("  Final result: " + matchesSearch);
                return matchesSearch;
            }
            var schoolName = school.english_name.toLowerCase();
            var matchesFilter = schoolName.includes(filterType);
            console.log("  School name (lower): " + schoolName);
            console.log("  Filter type: " + filterType);
            console.log("  Matches filter: " + matchesFilter);
            console.log("  Final result: " + (matchesSearch && matchesFilter));
            return matchesSearch && matchesFilter;
        });
        console.log("Filtered result length:", result.length);
        console.log("=== End Filtering Debug ===");
        return result;
    }, [schools, searchTerm, filterType, language]);
    var getSchoolType = function (schoolName) {
        var name = schoolName.toLowerCase();
        if (name.includes("lyceum"))
            return "lyceum";
        if (name.includes("gymnasium"))
            return "gymnasium";
        if (name.includes("tesek"))
            return "tesek";
        return "school";
    };
    var getSchoolTheme = function (schoolName) {
        var type = getSchoolType(schoolName);
        var themes = {
            lyceum: {
                colors: {
                    bg: "bg-blue-100",
                    text: "text-blue-600",
                    border: "border-l-blue-500",
                    hover: "hover:bg-blue-600",
                    gradient: "bg-gradient-to-r from-blue-50/50 to-blue-100/50"
                },
                badge: { text: "Lyceum", variant: "default" }
            },
            gymnasium: {
                colors: {
                    bg: "bg-green-100",
                    text: "text-green-600",
                    border: "border-l-green-500",
                    hover: "hover:bg-green-600",
                    gradient: "bg-gradient-to-r from-green-50/50 to-green-100/50"
                },
                badge: { text: "Gymnasium", variant: "outline" }
            },
            tesek: {
                colors: {
                    bg: "bg-orange-100",
                    text: "text-orange-600",
                    border: "border-l-orange-500",
                    hover: "hover:bg-orange-600",
                    gradient: "bg-gradient-to-r from-orange-50/50 to-amber-50/50"
                },
                badge: { text: "TESEK", variant: "secondary" }
            },
            school: {
                colors: {
                    bg: "bg-gray-100",
                    text: "text-gray-600",
                    border: "border-l-gray-500",
                    hover: "hover:bg-gray-600",
                    gradient: "bg-gradient-to-r from-gray-50/50 to-gray-100/50"
                },
                badge: { text: "School", variant: "secondary" }
            }
        };
        return themes[type];
    };
    var getSchoolIcon = function (schoolName) {
        var name = schoolName.toLowerCase();
        if (name.includes("lyceum"))
            return react_1["default"].createElement(lucide_react_1.GraduationCap, { className: "h-5 w-5" });
        if (name.includes("tesek"))
            return react_1["default"].createElement(lucide_react_1.BookOpen, { className: "h-5 w-5" });
        return react_1["default"].createElement(lucide_react_1.School, { className: "h-5 w-5" });
    };
    return (react_1["default"].createElement("div", { className: "w-full min-h-screen bg-gradient-to-br from-orange-50 to-amber-50" },
        react_1["default"].createElement("div", { className: "bg-white border-b shadow-sm" },
            react_1["default"].createElement("div", { className: "w-full px-4 sm:px-6 lg:px-8 py-8" },
                react_1["default"].createElement("div", { className: "text-center" },
                    react_1["default"].createElement("div", { className: "flex justify-center items-center gap-3 mb-4" },
                        react_1["default"].createElement("div", { className: "p-3 bg-orange-100 rounded-full" },
                            react_1["default"].createElement(lucide_react_1.School, { className: "h-8 w-8 text-orange-600" })),
                        react_1["default"].createElement("h1", { className: "text-4xl font-bold text-gray-900" }, "Schools Directory")),
                    react_1["default"].createElement("p", { className: "text-lg text-gray-600 max-w-2xl mx-auto" }, "Discover and connect with educational institutions across Cyprus. Find your school community and stay connected."),
                    react_1["default"].createElement("div", { className: "flex justify-center items-center gap-4 mt-4" },
                        react_1["default"].createElement("div", { className: "flex items-center gap-2 text-sm text-gray-500" },
                            react_1["default"].createElement(lucide_react_1.Users, { className: "h-4 w-4" }),
                            react_1["default"].createElement("span", null,
                                schools.length,
                                " Schools")),
                        react_1["default"].createElement("div", { className: "flex items-center gap-2 text-sm text-gray-500" },
                            react_1["default"].createElement(lucide_react_1.MapPin, { className: "h-4 w-4" }),
                            react_1["default"].createElement("span", null, "Cyprus")))))),
        react_1["default"].createElement("div", { className: "w-full px-4 sm:px-6 lg:px-8 py-6" },
            react_1["default"].createElement("div", { className: "bg-white rounded-lg shadow-sm border p-6 mb-6" },
                react_1["default"].createElement("div", { className: "flex flex-col lg:flex-row gap-4 items-center" },
                    react_1["default"].createElement("div", { className: "relative flex-1" },
                        react_1["default"].createElement(lucide_react_1.Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" }),
                        react_1["default"].createElement(input_1.Input, { type: "text", placeholder: "Search schools...", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); }, className: "pl-10" })),
                    react_1["default"].createElement("div", { className: "flex gap-3 items-center" },
                        react_1["default"].createElement(select_1.Select, { value: filterType, onValueChange: setFilterType },
                            react_1["default"].createElement(select_1.SelectTrigger, { className: "w-40" },
                                react_1["default"].createElement(lucide_react_1.Filter, { className: "h-4 w-4 mr-2" }),
                                react_1["default"].createElement(select_1.SelectValue, { placeholder: "Filter by type" })),
                            react_1["default"].createElement(select_1.SelectContent, null,
                                react_1["default"].createElement(select_1.SelectItem, { value: "all" }, "All Schools"),
                                schoolTypes.map(function (type) { return (react_1["default"].createElement(select_1.SelectItem, { key: type, value: type }, type.charAt(0).toUpperCase() + type.slice(1))); }))),
                        react_1["default"].createElement(select_1.Select, { value: language, onValueChange: setLanguage },
                            react_1["default"].createElement(select_1.SelectTrigger, { className: "w-32" },
                                react_1["default"].createElement(select_1.SelectValue, null)),
                            react_1["default"].createElement(select_1.SelectContent, null,
                                react_1["default"].createElement(select_1.SelectItem, { value: "UK" }, "English"),
                                react_1["default"].createElement(select_1.SelectItem, { value: "GR" }, "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC"))),
                        react_1["default"].createElement("div", { className: "flex border rounded-md" },
                            react_1["default"].createElement(button_1.Button, { variant: viewMode === "grid" ? "default" : "ghost", size: "sm", onClick: function () { return setViewMode("grid"); }, className: "rounded-r-none" },
                                react_1["default"].createElement(lucide_react_1.Grid, { className: "h-4 w-4" })),
                            react_1["default"].createElement(button_1.Button, { variant: viewMode === "list" ? "default" : "ghost", size: "sm", onClick: function () { return setViewMode("list"); }, className: "rounded-l-none" },
                                react_1["default"].createElement(lucide_react_1.List, { className: "h-4 w-4" })))))),
            isLoading ? (react_1["default"].createElement(lucide_react_1.LoaderPinwheel, { className: "spin" })) : (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement("div", { className: "mb-6" },
                    react_1["default"].createElement("p", { className: "text-gray-600" },
                        "Showing",
                        " ",
                        react_1["default"].createElement("span", { className: "font-semibold text-orange-600" }, filteredSchools.length),
                        " ",
                        "of ",
                        schools.length,
                        " schools")),
                viewMode === "grid" ? (react_1["default"].createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12" }, filteredSchools.map(function (school) {
                    var theme = getSchoolTheme(school.english_name);
                    return (react_1["default"].createElement(card_1.Card, { key: school.id, className: "hover:shadow-lg justify-between transition-shadow duration-200 border-l-4 " + theme.colors.border },
                        react_1["default"].createElement(card_1.CardHeader, { className: "space-y-3" },
                            react_1["default"].createElement("div", { className: "flex items-start justify-between" },
                                react_1["default"].createElement("div", { className: "flex items-center gap-3" },
                                    react_1["default"].createElement("div", { className: "p-2 " + theme.colors.bg + " rounded-lg " + theme.colors.text }, getSchoolIcon(school.english_name)),
                                    react_1["default"].createElement(badge_1.Badge, { variant: theme.badge.variant }, theme.badge.text))),
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement(card_1.CardTitle, { className: "text-lg leading-tight" }, language === "GR"
                                    ? school.greek_name
                                    : school.english_name))),
                        react_1["default"].createElement(card_1.CardContent, null,
                            react_1["default"].createElement(button_1.Button, { className: "w-full " + theme.colors.hover + " hover:text-white transition-colors shadow-md", variant: "outline" },
                                react_1["default"].createElement(lucide_react_1.Users, { className: "h-4 w-4 mr-2" }),
                                "View Community"))));
                }))) : (react_1["default"].createElement("div", { className: "space-y-4" }, filteredSchools.map(function (school, index) {
                    var theme = getSchoolTheme(school.english_name);
                    // Alternating row colors for better distinction
                    var isEven = index % 2 === 0;
                    return (react_1["default"].createElement(card_1.Card, { key: school.id, className: "hover:shadow-lg transition-all duration-300 hover:scale-[1.02] " + (isEven ? "bg-white" : theme.colors.gradient) + " border-l-4 " + theme.colors.border },
                        react_1["default"].createElement(card_1.CardContent, { className: "p-6" },
                            react_1["default"].createElement("div", { className: "flex items-center justify-between" },
                                react_1["default"].createElement("div", { className: "flex items-center gap-6" },
                                    react_1["default"].createElement("div", { className: "p-3 " + theme.colors.bg + " rounded-xl " + theme.colors.text + " shadow-md" }, getSchoolIcon(school.english_name)),
                                    react_1["default"].createElement("div", { className: "space-y-1" },
                                        react_1["default"].createElement("div", { className: "flex items-center gap-3" },
                                            react_1["default"].createElement("h3", { className: "font-bold text-xl text-gray-900" }, language === "GR"
                                                ? school.greek_name
                                                : school.english_name),
                                            react_1["default"].createElement(badge_1.Badge, { variant: theme.badge.variant }, theme.badge.text),
                                            react_1["default"].createElement("span", { className: "text-xs text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded" },
                                                "#",
                                                school.id)),
                                        react_1["default"].createElement("div", { className: "flex items-center gap-4 text-xs text-gray-500 mt-2" },
                                            react_1["default"].createElement("span", { className: "flex items-center gap-1" },
                                                react_1["default"].createElement(lucide_react_1.MapPin, { className: "h-3 w-3" }),
                                                "Cyprus"),
                                            react_1["default"].createElement("span", { className: "flex items-center gap-1" },
                                                react_1["default"].createElement(lucide_react_1.Users, { className: "h-3 w-3" }),
                                                "Community Active")))),
                                react_1["default"].createElement(button_1.Button, { variant: "outline", size: "lg", className: theme.colors.hover + " hover:text-white transition-colors shadow-md" },
                                    react_1["default"].createElement(lucide_react_1.Users, { className: "h-4 w-4 mr-2" }),
                                    "View Community")))));
                }))),
                filteredSchools.length === 0 && (react_1["default"].createElement("div", { className: "text-center py-12" },
                    react_1["default"].createElement("div", { className: "p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center" },
                        react_1["default"].createElement(lucide_react_1.Search, { className: "h-8 w-8 text-gray-400" })),
                    react_1["default"].createElement("h3", { className: "text-lg font-semibold text-gray-900 mb-2" }, "No schools found"),
                    react_1["default"].createElement("p", { className: "text-gray-600" }, "Try adjusting your search terms or filters."))))))));
}
exports["default"] = Schools;
