import React, { useMemo, useState, useEffect } from "react";
import { api, getStoredStudent, clearStudentAuth } from "./services/api";

// ----------------------------------------------------
// Icon Component for SVG Paths
// ----------------------------------------------------
function Icon({ name, className = "w-5 h-5", strokeWidth = "2" }) {
  const icons = {
    home: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    ),
    person: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    ),
    megaphone: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
      />
    ),
    calendar: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    ),
    "document-text": (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    ),
    "calendar-number": (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zM9 15h1m3 0h1m-4 3h1m3 0h1"
      />
    ),
    "calendar-clear": (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3M3 12h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    ),
    time: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    receipt: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
      />
    ),
    briefcase: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4.674 12h4.819a2 2 0 002-2V10a2 2 0 00-2-2h-11a2 2 0 00-2 2v6a2 2 0 002 2h4.819"
      />
    ),
    "person-add": (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
      />
    ),
    "bar-chart": (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2"
      />
    ),
    search: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    ),
    bank: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    ),
    lock: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    ),
    chevronRight: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5l7 7-7 7"
      />
    ),
    chevronLeft: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19l-7-7 7-7"
      />
    ),
    close: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    ),
    menu: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    ),
    camera: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM15 13a3 3 0 11-6 0 3 3 0 016 0z"
      />
    ),
    check: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    ),
    notifications: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    ),
  };

  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {icons[name] || (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      )}
    </svg>
  );
}

// ----------------------------------------------------
// Constants & Mock Database
// ----------------------------------------------------
const NAV = [
  { key: "home", label: "Home", icon: "home" },
  { key: "studentDetails", label: "Profile", icon: "person" },
  { key: "announcements", label: "Announcements", icon: "megaphone" },
  { key: "attendance", label: "Attendance", icon: "calendar" },
  { key: "assignments", label: "Assignments", icon: "document-text" },
  { key: "examSchedule", label: "Exams", icon: "calendar-number" },
  { key: "holidays", label: "Holidays", icon: "calendar-clear" },
  { key: "timetable", label: "Time Table", icon: "time" },
  { key: "billing", label: "Billing", icon: "receipt" },
  { key: "leave", label: "Leave", icon: "briefcase" },
  { key: "enrollment", label: "Enrollment", icon: "person-add" },
  { key: "finalResult", label: "Result", icon: "bar-chart" },
];

const routeLabels = {
  institution: "Institution",
  register: "Create Account",
  login: "Student Login",
  home: "Dashboard",
  studentDetails: "Student Profile",
  announcements: "Announcements",
  attendance: "Attendance Overview",
  attendanceLog: "Attendance Log",
  attendanceMonthly: "Monthly Attendance",
  attendanceOverall: "Overall Attendance",
  assignments: "Assignments",
  examSchedule: "Exam Schedule",
  examTable: "Exam Table",
  holidays: "Holidays List",
  timetable: "Time Table",
  timetablePoster: "Poster View",
  billing: "Billing Invoices",
  leave: "Leave Application",
  enrollment: "Course Enrollment",
  completedCourses: "Completed Courses",
  finalResult: "Semester Result",
};

const subjects = [
  { name: "Math", value: 85, color: "bg-blue-600" },
  { name: "Science", value: 78, color: "bg-emerald-600" },
  { name: "English", value: 92, color: "bg-amber-500" },
  { name: "History", value: 68, color: "bg-rose-600" },
  { name: "Physical Ed.", value: 95, color: "bg-violet-600" },
];

const initialAssignments = [
  { subject: "Mathematics", project: "Surface Areas", assigned: "24 Feb", due: "27 Feb", status: "Pending" },
  { subject: "Science", project: "Structure of Atoms", assigned: "10 Feb", due: "15 Feb", status: "Submitted" },
  { subject: "English", project: "Best Friend Essay", assigned: "01 Feb", due: "05 Feb", status: "Pending" },
];

const bills = [
  { id: "1234", item: "Sem 1 Tuition Fee", due: "06 Feb", amount: "₹30,000", balance: "₹0", status: "Settled" },
  { id: "2345", item: "Sem 2 Tuition Fee", due: "25 Aug", amount: "₹30,000", balance: "₹30,000", status: "Unpaid" },
  { id: "5610", item: "Sem 3 Tuition Fee", due: "15 Feb", amount: "₹30,000", balance: "₹0", status: "Settled" },
  { id: "5608", item: "Sem 4 Tuition Fee", due: "21 Aug", amount: "₹30,000", balance: "₹30,000", status: "Unpaid" },
];

const examRows = [
  { subject: "Mathematics", code: "MTH201", date: "28 Feb", time: "10:00 - 13:00", syllabus: "Download Syllabus" },
  { subject: "Science", code: "SCI204", date: "29 Feb", time: "10:00 - 13:00", syllabus: "Download Syllabus" },
  { subject: "English", code: "ENG102", date: "01 Mar", time: "10:00 - 13:00", syllabus: "Download Syllabus" },
  { subject: "History", code: "HIS111", date: "02 Mar", time: "10:00 - 13:00", syllabus: "Download Syllabus" },
];

const holidays = [
  { event: "Independence Day", date: "15 Aug 2026" },
  { event: "Krishna Jayanthi", date: "26 Aug 2026" },
  { event: "Gandhi Jayanti", date: "02 Oct 2026" },
  { event: "Diwali Holiday", date: "31 Oct - 02 Nov 2026" },
  { event: "Winter Break", date: "24 Dec - 02 Jan 2027" },
];

const completedCourses = [
  { code: "U20CSEJ01", name: "Data Structures", category: "Core", credits: "4" },
  { code: "U20MABT01", name: "Discrete Mathematics", category: "Core", credits: "4" },
  { code: "U20PYBJ03", name: "Machine Learning", category: "Core", credits: "5" },
  { code: "U20CSCJ04", name: "Web Development", category: "Lab", credits: "3" },
];

const timetableData = [
  { time: "09:00", mon: "Data Structures", tue: "Computer Networks", wed: "Algorithms", thu: "Database", fri: "OS" },
  { time: "10:15", mon: "Discrete Math", tue: "OOP", wed: "Networks", thu: "Database", fri: "Algorithms" },
  { time: "11:30", mon: "Programming Lab", tue: "Digital Logic", wed: "Web Dev", thu: "Software Eng.", fri: "Networks" },
  { time: "13:30", mon: "ML", tue: "DBMS", wed: "Theory", thu: "Graphics", fri: "Elective" },
  { time: "14:45", mon: "OS Lab", tue: "Algo Lab", wed: "AI", thu: "Security", fri: "Project" },
];

const initialLeaves = [
  { id: 1, type: "Sick Leave", fromDate: "11 Feb 2026", toDate: "17 Feb 2026", reason: "Fever and cold, doctor advised rest.", status: "Waiting Review" }
];

// ----------------------------------------------------
// Root App Component
// ----------------------------------------------------
export default function App() {
  const [route, setRoute] = useState("institution");
  const [menuOpen, setMenuOpen] = useState(false);
  const [student, setStudent] = useState(null);

  // Leave management stateful storage
  const [leaves, setLeaves] = useState(initialLeaves);

  // Assignments dynamic completion
  const [assignments, setAssignments] = useState(initialAssignments);

  useEffect(() => {
    const cachedStudent = getStoredStudent();
    if (cachedStudent) {
      setStudent(cachedStudent);
      setRoute("home");
    }
  }, []);

  const handleLogout = () => {
    clearStudentAuth();
    setStudent(null);
    setRoute("login");
  };

  const handleLoginSuccess = (loggedInStudent) => {
    setStudent(loggedInStudent);
    setRoute("home");
  };

  // Main navigation helper
  const navigateTo = (r) => {
    setRoute(r);
    setMenuOpen(false);
  };

  const renderAuthLayout = (content) => {
    return (
      <div className="flex min-h-screen bg-slate-50 text-slate-800 font-sans text-left">
        {/* Sidebar for Desktop */}
        <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0 h-screen sticky top-0">
          <div className="p-5 flex items-center gap-3 border-b border-slate-800">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-sm shrink-0">
              <Icon name="bank" className="w-6 h-6 text-white" />
            </div>
            <div>
              <strong className="text-white text-sm block font-bold leading-none">XYZ University</strong>
              <span className="text-slate-400 text-xs font-semibold mt-1 block">Student Hub</span>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {NAV.map((item) => {
              const active = route === item.key || (item.key === "attendance" && ["attendanceLog", "attendanceMonthly", "attendanceOverall"].includes(route)) || (item.key === "examSchedule" && route === "examTable") || (item.key === "timetable" && route === "timetablePoster") || (item.key === "enrollment" && route === "completedCourses");
              return (
                <button
                  key={item.key}
                  onClick={() => navigateTo(item.key)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    active
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon name={item.icon} className={`w-5 h-5 shrink-0 ${active ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-800 flex items-center gap-3 bg-slate-950/40">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center font-bold text-blue-400 uppercase">
              {student?.fullName ? student.fullName.slice(0, 2) : "ST"}
            </div>
            <div className="flex-1 truncate">
              <strong className="text-white text-xs block font-bold leading-none">{student?.fullName || "Student Name"}</strong>
              <span className="text-slate-400 text-[10px] font-semibold mt-1 block">{student?.program || "CSE"} | Sem {student?.semester || "6"}</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-rose-500 transition-colors"
              title="Logout"
            >
              <Icon name="close" className="w-5 h-5" />
            </button>
          </div>
        </aside>

        {/* Mobile menu drawer overlay */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setMenuOpen(false)}></div>
            <div className="relative flex flex-col w-72 max-w-[85vw] h-full bg-slate-900 text-slate-300 p-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-black text-xs">
                    <Icon name="bank" className="w-5 h-5 text-white" />
                  </div>
                  <strong className="text-white text-sm font-black">XYZ University</strong>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
                >
                  <Icon name="close" className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 space-y-1 overflow-y-auto">
                {NAV.map((item) => {
                  const active = route === item.key || (item.key === "attendance" && ["attendanceLog", "attendanceMonthly", "attendanceOverall"].includes(route)) || (item.key === "examSchedule" && route === "examTable") || (item.key === "timetable" && route === "timetablePoster") || (item.key === "enrollment" && route === "completedCourses");
                  return (
                    <button
                      key={item.key}
                      onClick={() => navigateTo(item.key)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        active
                          ? "bg-blue-600 text-white"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <Icon name={item.icon} className="w-5 h-5 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center font-bold text-blue-400 text-xs">
                    {student?.fullName ? student.fullName.slice(0, 2) : "ST"}
                  </div>
                  <div className="truncate">
                    <strong className="text-white text-xs block font-bold leading-none">{student?.fullName || "Student Name"}</strong>
                    <span className="text-slate-400 text-[10px] font-semibold block mt-0.5">Sem {student?.semester || "6"} | Sec {student?.section || "A"}</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-2.5 py-1 text-xs border border-rose-500/30 hover:bg-rose-500/10 text-rose-400 rounded-md transition-all font-semibold"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
          {/* Header */}
          <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between shrink-0 sticky top-0 z-10 shadow-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMenuOpen(true)}
                className="p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden focus:outline-none"
              >
                <Icon name="menu" className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1.5 text-sm font-semibold select-none">
                <span className="text-slate-400">XYZ Portal</span>
                <span className="text-slate-300">/</span>
                <span className="text-blue-600 font-bold">{routeLabels[route] || "Dashboard"}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-slate-100 text-slate-600 px-3.5 py-1.5 rounded-lg text-xs font-bold">
                Mon, 27 Jul 2026
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
            {content}
          </main>
        </div>
      </div>
    );
  };

  // ----------------------------------------------------
  // Screens Rendering Router
  // ----------------------------------------------------
  if (route === "institution") {
    return <InstitutionScreen onNext={() => setRoute("register")} />;
  }

  if (route === "register") {
    return <RegisterScreen onBack={() => setRoute("institution")} onLogin={() => setRoute("login")} />;
  }

  if (route === "login") {
    return (
      <LoginScreen
        onBack={() => setRoute("institution")}
        onRegister={() => setRoute("register")}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  // Auth pages router
  let pageContent = null;
  switch (route) {
    case "home":
      pageContent = <Dashboard student={student} navigateTo={navigateTo} assignments={assignments} />;
      break;
    case "studentDetails":
      pageContent = <StudentDetails student={student} />;
      break;
    case "announcements":
      pageContent = <Announcements />;
      break;
    case "attendance":
      pageContent = <Attendance parentRoute="attendance" navigateTo={navigateTo} />;
      break;
    case "attendanceLog":
      pageContent = <Attendance parentRoute="attendanceLog" navigateTo={navigateTo} />;
      break;
    case "attendanceMonthly":
      pageContent = <Attendance parentRoute="attendanceMonthly" navigateTo={navigateTo} />;
      break;
    case "attendanceOverall":
      pageContent = <Attendance parentRoute="attendanceOverall" navigateTo={navigateTo} />;
      break;
    case "assignments":
      pageContent = (
        <Assignments
          assignments={assignments}
          onToggle={(idx) => {
            const copy = [...assignments];
            copy[idx].status = copy[idx].status === "Submitted" ? "Pending" : "Submitted";
            setAssignments(copy);
          }}
        />
      );
      break;
    case "examSchedule":
      pageContent = <ExamSchedule navigateTo={navigateTo} page="schedule" />;
      break;
    case "examTable":
      pageContent = <ExamSchedule navigateTo={navigateTo} page="table" />;
      break;
    case "holidays":
      pageContent = <Holidays />;
      break;
    case "timetable":
      pageContent = <Timetable navigateTo={navigateTo} page="matrix" />;
      break;
    case "timetablePoster":
      pageContent = <Timetable navigateTo={navigateTo} page="poster" />;
      break;
    case "billing":
      pageContent = <Billing />;
      break;
    case "leave":
      pageContent = (
        <Leave
          leaves={leaves}
          onSubmit={(newLeave) => {
            setLeaves([newLeave, ...leaves]);
          }}
        />
      );
      break;
    case "enrollment":
      pageContent = <Enrollment navigateTo={navigateTo} page="enroll" />;
      break;
    case "completedCourses":
      pageContent = <Enrollment navigateTo={navigateTo} page="completed" />;
      break;
    case "finalResult":
      pageContent = <FinalResult />;
      break;
    default:
      pageContent = <Dashboard student={student} navigateTo={navigateTo} assignments={assignments} />;
  }

  return renderAuthLayout(pageContent);
}

// ----------------------------------------------------
// 1. Institution Screen
// ----------------------------------------------------
function InstitutionScreen({ onNext }) {
  const colleges = [
    { name: "Springfield University", place: "Springfield, IL", bg: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
    { name: "Greenwood University", place: "Greenwood, TX", bg: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
    { name: "Riverside Institute of Technology", place: "Riverside, CA", bg: "bg-violet-500/10 text-violet-600 border-violet-500/20" },
    { name: "Lakewood Community College", place: "Lakewood, LA", bg: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
  ];

  const [search, setSearch] = useState("");

  const filteredColleges = colleges.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.place.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-tr from-slate-900 via-slate-800 to-slate-950 flex flex-col justify-center items-center p-6 text-slate-200">
      <div className="w-full max-w-lg bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 shadow-2xl p-8 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full"></div>

        <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Icon name="bank" className="w-8 h-8 text-blue-400" />
        </div>

        <h1 className="text-3xl font-black text-white text-center tracking-tight mb-2">Select Institution</h1>
        <p className="text-slate-400 text-center text-sm mb-6">Choose your college portal to register or log in</p>

        <div className="relative mb-6">
          <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search colleges..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-blue-500 rounded-xl text-white placeholder-slate-500 outline-hidden transition-all text-sm"
          />
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto mb-6 pr-1 custom-scrollbar">
          {filteredColleges.map((c) => (
            <button
              key={c.name}
              onClick={onNext}
              className="w-full flex items-center justify-between p-4 bg-slate-950/40 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-950/80 rounded-xl transition-all group text-left"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-bold border ${c.bg}`}>
                  <Icon name="bank" className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm tracking-tight leading-snug group-hover:text-blue-400 transition-colors">
                    {c.name}
                  </h4>
                  <p className="text-slate-400 text-xs mt-0.5 font-medium">{c.place}</p>
                </div>
              </div>
              <Icon name="chevronRight" className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
          {filteredColleges.length === 0 && (
            <p className="text-slate-500 text-sm text-center py-4">No institutions found matching search.</p>
          )}
        </div>

        <button
          onClick={onNext}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 text-sm flex items-center justify-center gap-2"
        >
          <span>Continue with Default</span>
          <Icon name="chevronRight" className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 2. Register Screen
// ----------------------------------------------------
function RegisterScreen({ onBack, onLogin }) {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [grade, setGrade] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !studentId || !grade || !pin) {
      setError("Please fill in all details.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.register({
        fullName: name,
        email,
        studentId,
        grade,
        password: pin,
      });
      setSuccess(response.message || "Registration successful! Please log in.");
      setTimeout(() => {
        onLogin();
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to register student.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-tr from-slate-900 via-slate-800 to-slate-950 flex flex-col justify-center items-center p-6 text-slate-200">
      <div className="w-full max-w-lg bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 shadow-2xl p-8 relative overflow-hidden">
        <button
          onClick={onBack}
          className="absolute left-6 top-8 text-slate-400 hover:text-white flex items-center gap-1 text-xs font-semibold"
        >
          <Icon name="chevronLeft" className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center mx-auto mb-4 mt-4">
          <Icon name="person" className="w-6 h-6 text-blue-400" />
        </div>

        <h1 className="text-3xl font-black text-white text-center tracking-tight mb-1">Create Account</h1>
        <p className="text-slate-400 text-center text-xs mb-6">Register your ERP account credentials</p>

        {/* Custom Segment Selector */}
        <div className="flex bg-slate-950/60 border border-slate-800 rounded-xl p-1 mb-5">
          <button
            onClick={() => setRole("student")}
            className={`flex-1 text-center py-2 text-xs font-black rounded-lg transition-all ${
              role === "student" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Student Registration
          </button>
          <button
            onClick={() => {
              alert("Teacher registration must be managed via Teacher Portal directly.");
            }}
            className="flex-1 text-center py-2 text-xs font-black rounded-lg text-slate-400 opacity-60 cursor-not-allowed"
          >
            Teacher Portal
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl font-bold">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl font-bold">
            {success}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-slate-400 text-xs font-bold block mb-1.5">Full Name</label>
            <div className="relative">
              <Icon name="person" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Ex: Tharun Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-blue-500 rounded-xl text-white placeholder-slate-500 outline-hidden transition-all text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 text-xs font-bold block mb-1.5">Email Address</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold">@</span>
              <input
                type="email"
                placeholder="tharun@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-blue-500 rounded-xl text-white placeholder-slate-500 outline-hidden transition-all text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 text-xs font-bold block mb-1.5">Student ID</label>
              <input
                type="text"
                placeholder="STU-102"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-blue-500 rounded-xl text-white placeholder-slate-500 outline-hidden transition-all text-xs"
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-bold block mb-1.5">Grade / Class</label>
              <input
                type="text"
                placeholder="Grade 12"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-blue-500 rounded-xl text-white placeholder-slate-500 outline-hidden transition-all text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 text-xs font-bold block mb-1.5">Secure Password / PIN</label>
            <div className="relative">
              <Icon name="lock" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                placeholder="••••••"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-blue-500 rounded-xl text-white placeholder-slate-500 outline-hidden transition-all text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] disabled:bg-slate-800 text-white font-bold rounded-xl transition-all text-xs flex items-center justify-center gap-2 mt-2"
          >
            {loading ? "Registering..." : "Register Now"}
          </button>
        </form>

        <button
          onClick={onLogin}
          className="w-full text-center mt-5 text-xs font-semibold text-blue-400 hover:underline"
        >
          Already have an account? Log in here
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 3. Login Screen
// ----------------------------------------------------
function LoginScreen({ onBack, onRegister, onLoginSuccess }) {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!studentId || !password) {
      setError("Please input your login ID and password.");
      return;
    }

    setLoading(true);
    try {
      const data = await api.login(studentId, password);
      onLoginSuccess(data.student);
    } catch (err) {
      setError(err.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-tr from-slate-900 via-slate-800 to-slate-950 flex flex-col justify-center items-center p-6 text-slate-200">
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 shadow-2xl p-8 relative overflow-hidden">
        <button
          onClick={onBack}
          className="absolute left-6 top-8 text-slate-400 hover:text-white flex items-center gap-1 text-xs font-semibold"
        >
          <Icon name="chevronLeft" className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4">
          <Icon name="bank" className="w-8 h-8 text-blue-400" />
        </div>

        <h1 className="text-3xl font-black text-white text-center tracking-tight mb-2">Student Login</h1>
        <p className="text-slate-400 text-center text-xs mb-6">Enter your ERP student ID or email to access the portal</p>

        {error && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-slate-400 text-xs font-bold block mb-1.5">Student ID or Email</label>
            <div className="relative">
              <Icon name="person" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="STU-102 or tharun@university.edu"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-blue-500 rounded-xl text-white placeholder-slate-500 outline-hidden transition-all text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 text-xs font-bold block mb-1.5">Secure Password / PIN</label>
            <div className="relative">
              <Icon name="lock" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-blue-500 rounded-xl text-white placeholder-slate-500 outline-hidden transition-all text-xs"
              />
            </div>
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => alert("Please request a password reset through your administrative officer.")}
              className="text-xs font-bold text-blue-400 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] disabled:bg-slate-850 text-white font-bold rounded-xl transition-all text-xs flex items-center justify-center gap-2 mt-2"
          >
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>

        <button
          onClick={onRegister}
          className="w-full text-center mt-5 text-xs font-semibold text-blue-400 hover:underline"
        >
          Need an account? Register here
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 4. Authenticated Dashboard Screen
// ----------------------------------------------------
function Dashboard({ student, navigateTo, assignments }) {
  const pendingCount = assignments.filter((a) => a.status === "Pending").length;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-lg shadow-slate-900/10 border border-slate-800">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600/20 blur-3xl rounded-full"></div>
        <div className="relative">
          <span className="text-blue-400 text-xs font-black tracking-widest uppercase">Welcome back</span>
          <h2 className="text-3xl font-black mt-1.5 tracking-tight text-white">
            {student?.fullName || "Student Name"}
          </h2>
          <p className="text-slate-400 text-sm mt-1.5 font-semibold">
            {student?.program || "Computer Science"} | Semester {student?.semester || "6"} | Sec {student?.section || "A"}
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
          <div className="relative w-16 h-16 flex items-center justify-center rounded-full border-4 border-blue-500 bg-blue-900/30">
            <span className="text-white font-black text-sm">{student?.attendance || 84}%</span>
          </div>
          <div>
            <strong className="text-xs block font-bold uppercase text-blue-400 tracking-wider">Attendance</strong>
            <span className="text-slate-300 text-xs font-bold block mt-0.5">Good Standing</span>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Attendance Details", key: "attendance", color: "text-blue-600 bg-blue-50 border-blue-100 hover:bg-blue-100", icon: "calendar" },
          { label: "Pending Tasks", key: "assignments", color: "text-emerald-600 bg-emerald-50 border-emerald-100 hover:bg-emerald-100", icon: "document-text" },
          { label: "Exam Schedules", key: "examSchedule", color: "text-violet-600 bg-violet-50 border-violet-100 hover:bg-violet-100", icon: "calendar-number" },
          { label: "Fee Statements", key: "billing", color: "text-amber-600 bg-amber-50 border-amber-100 hover:bg-amber-100", icon: "receipt" },
        ].map((act) => (
          <button
            key={act.key}
            onClick={() => navigateTo(act.key)}
            className={`flex items-center gap-3 p-4 rounded-xl border font-bold text-sm transition-all text-left shadow-xs cursor-pointer ${act.color}`}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-white shadow-xs">
              <Icon name={act.icon} className="w-5 h-5" />
            </div>
            <span>{act.label}</span>
          </button>
        ))}
      </div>

      {/* Key Metrics cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Pending Assignments", val: pendingCount, icon: "document-text", tone: "bg-amber-500/10 text-amber-600 border-amber-500/20", key: "assignments" },
          { label: "Next Mid Exam", val: "28 Feb", icon: "calendar-number", tone: "bg-blue-500/10 text-blue-600 border-blue-500/20", key: "examSchedule" },
          { label: "Outstanding Invoices", val: "₹30,000", icon: "receipt", tone: "bg-rose-500/10 text-rose-600 border-rose-500/20", key: "billing" },
          { label: "Current SGPA", val: "7.18", icon: "bar-chart", tone: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", key: "finalResult" },
        ].map((card, idx) => (
          <div
            key={idx}
            onClick={() => navigateTo(card.key)}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center border mb-3 ${card.tone}`}>
              <Icon name={card.icon} className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[25px] font-black text-slate-900 block leading-tight group-hover:text-blue-600 transition-colors">
                {card.val}
              </span>
              <span className="text-slate-400 text-xs font-bold block mt-1 leading-snug">{card.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Grid Split Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today Timetable */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
              <Icon name="time" className="w-5 h-5 text-blue-600" />
              <span>Today's Academic Schedule</span>
            </h3>
            <button
              onClick={() => navigateTo("timetable")}
              className="text-xs font-black text-blue-600 hover:underline"
            >
              Full Time Table
            </button>
          </div>

          <div className="space-y-4">
            {[
              { time: "09:00", name: "Data Structures", room: "Lecture Hall A101", active: true },
              { time: "10:15", name: "Object Oriented Programming", room: "CSE Computer Lab 2", active: false },
              { time: "11:30", name: "Programming Laboratory", room: "Digital Systems Center", active: false },
            ].map((sched, idx) => (
              <div key={idx} className="flex gap-4 items-start relative">
                <div className="w-12 pt-1">
                  <span className="text-xs font-black text-blue-600 block">{sched.time}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs ${sched.active ? "bg-blue-600 ring-4 ring-blue-100" : "bg-slate-300"}`}></div>
                  {idx < 2 && <div className="w-0.5 h-12 bg-slate-100 mt-1"></div>}
                </div>
                <div className="flex-1 bg-slate-50 border border-slate-100 rounded-lg p-3 group hover:border-blue-500/30 hover:bg-slate-50/50 transition-all">
                  <h4 className="font-bold text-slate-800 text-sm leading-tight">{sched.name}</h4>
                  <p className="text-slate-400 text-xs mt-1.5 font-semibold flex items-center gap-1">
                    <Icon name="bank" className="w-3.5 h-3.5 text-slate-400" />
                    <span>{sched.room}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notices */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
              <Icon name="megaphone" className="w-5 h-5 text-blue-600" />
              <span>Latest Notices</span>
            </h3>
            <button
              onClick={() => navigateTo("announcements")}
              className="text-xs font-black text-blue-600 hover:underline"
            >
              All Notices
            </button>
          </div>

          <div className="space-y-4">
            {[
              { title: "Exam timetable published", desc: "Internal examination schedule and halls mapping is ready.", time: "10m ago" },
              { title: "Assignment deadline approaching", desc: "Submit course project files before due date on 27 Feb.", time: "2h ago" },
              { title: "Library hours extended", desc: "Central library remains open up to 9 PM till exams end.", time: "1d ago" },
            ].map((n, idx) => (
              <div key={idx} className="flex gap-3 items-start border-b border-slate-50 last:border-0 pb-3 last:pb-0">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <Icon name="megaphone" className="w-4 h-4 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-slate-800 text-xs truncate">{n.title}</h4>
                    <span className="text-[10px] text-slate-400 shrink-0 font-medium">{n.time}</span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1 leading-snug line-clamp-2">{n.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 5. Student Details (Profile)
// ----------------------------------------------------
function StudentDetails({ student }) {
  const personal = [
    { label: "Full Name", val: student?.fullName || "Student Name" },
    { label: "Email Address", val: student?.email || "student@xyz.edu" },
    { label: "Mobile Number", val: student?.phone || "Not configured" },
    { label: "Date of Birth", val: "14 May 2005" },
    { label: "Blood Group", val: "O Positive" },
  ];

  const academic = [
    { label: "Student Register No.", val: student?.studentId || "STU-601" },
    { label: "Admission Batch", val: "2023 - 2027" },
    { label: "Degree & Program", val: `B.Tech in ${student?.program || "Computer Science"}` },
    { label: "Enroll Semester / Sec", val: `Semester ${student?.semester || "6"} | Section ${student?.section || "A"}` },
    { label: "Scholarship Type", val: "Merit-Based (20% fee waiver)" },
  ];

  const parents = [
    { label: "Father's Name", val: "A. Kumar" },
    { label: "Mother's Name", val: "S. Kumar" },
    { label: "Guardian Contact", val: "+91 99880 77660" },
    { label: "Emergency Contact", val: "+91 99880 77665" },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Icon name="person" className="w-12 h-12 text-blue-600" />
          </div>
          <button
            onClick={() => alert("Upload photo functionality can be connected to file cloud storage.")}
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-600 border-2 border-white text-white flex items-center justify-center shadow-md cursor-pointer hover:bg-blue-700 transition-colors"
          >
            <Icon name="camera" className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="text-center md:text-left flex-1">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">{student?.fullName || "Student Name"}</h2>
          <p className="text-slate-400 text-sm font-semibold mt-1">
            Student ID: {student?.studentId || "STU-601"} | Grade: {student?.grade || "Grade 12"}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3.5">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-full">
              Active Enrollment
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold rounded-full">
              Semester {student?.semester || "6"}
            </span>
          </div>
        </div>
      </div>

      {/* Details Blocks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <h3 className="text-base font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
            <Icon name="person" className="w-5 h-5 text-blue-600" />
            <span>Personal Details</span>
          </h3>
          <div className="divide-y divide-slate-100">
            {personal.map((row) => (
              <div key={row.label} className="py-3 flex justify-between items-center text-xs">
                <span className="text-slate-400 font-bold">{row.label}</span>
                <span className="text-slate-950 font-black text-right">{row.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Academic */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <h3 className="text-base font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
            <Icon name="bank" className="w-5 h-5 text-blue-600" />
            <span>Academic Profile</span>
          </h3>
          <div className="divide-y divide-slate-100">
            {academic.map((row) => (
              <div key={row.label} className="py-3 flex justify-between items-center text-xs">
                <span className="text-slate-400 font-bold">{row.label}</span>
                <span className="text-slate-950 font-black text-right">{row.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Parents/Guardian Info */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs md:col-span-2">
          <h3 className="text-base font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
            <Icon name="person-add" className="w-5 h-5 text-blue-600" />
            <span>Guardian & Family Details</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 divide-y md:divide-y-0 divide-slate-100">
            {parents.map((row) => (
              <div key={row.label} className="py-3 flex justify-between items-center text-xs">
                <span className="text-slate-400 font-bold">{row.label}</span>
                <span className="text-slate-950 font-black text-right">{row.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 6. Announcements Screen
// ----------------------------------------------------
function Announcements() {
  const notices = [
    { title: "Mid-Term Examination Timetable", content: "The exam schedule is published and can be viewed inside exams tab. Download syllabus files immediately.", date: "24 Feb 2026", category: "Exams", badge: "bg-rose-100 text-rose-800 border-rose-200" },
    { title: "Annual Cultural Fest 2026 Details", content: "The university cultural committee is proud to announce 'AURA 2026' scheduled on March 20-21. Registrations for competitions open this Friday.", date: "18 Feb 2026", category: "Events", badge: "bg-violet-100 text-violet-800 border-violet-200" },
    { title: "Hostel Fee Payment Guidelines", content: "Students in hostels must pay their pending semesters mess and rent bills prior to the final review. Invoices are posted in billing portal.", date: "15 Feb 2026", category: "Billing", badge: "bg-amber-100 text-amber-800 border-amber-200" },
    { title: "Academic Assignments Submission Guide", content: "Upload assignments and lab projects reports before the cutoff dates. Evaluation marks will weigh in overall SGPA sheets.", date: "10 Feb 2026", category: "Academics", badge: "bg-blue-100 text-blue-800 border-blue-200" },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-6">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
          <Icon name="megaphone" className="w-5 h-5 text-blue-600" />
          <span>Announcements & Circulars</span>
        </h3>
        <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-bold">
          {notices.length} Notices
        </span>
      </div>

      <div className="space-y-4">
        {notices.map((notice, idx) => (
          <div key={idx} className="p-4 bg-slate-50 border border-slate-150 rounded-xl hover:border-blue-500/25 transition-all">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <span className={`px-2.5 py-0.5 border text-[10px] font-black rounded-full uppercase tracking-wider ${notice.badge}`}>
                {notice.category}
              </span>
              <span className="text-[10px] text-slate-400 font-bold">{notice.date}</span>
            </div>
            <h4 className="text-sm font-black text-slate-900 leading-tight mb-2 tracking-tight">
              {notice.title}
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed font-semibold">
              {notice.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 7. Attendance Screen (With 4 Sub-Tabs)
// ----------------------------------------------------
function Attendance({ parentRoute, navigateTo }) {
  const tabs = [
    { key: "attendance", label: "Subject-Wise" },
    { key: "attendanceLog", label: "Daily Logs" },
    { key: "attendanceMonthly", label: "Monthly Summary" },
    { key: "attendanceOverall", label: "Overall Rating" },
  ];

  const logs = [
    { date: "24 Apr 2026", status: "Present", details: "Lectures MTH201, SCI204" },
    { date: "23 Apr 2026", status: "Present", details: "Lectures ENG102, SCI204" },
    { date: "22 Apr 2026", status: "Absent", details: "Sick leave submitted" },
    { date: "21 Apr 2026", status: "Present", details: "Programming Laboratory" },
    { date: "20 Apr 2026", status: "Present", details: "Lectures MTH201, HIS111" },
    { date: "17 Apr 2026", status: "Absent", details: "No information provided" },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-slate-200 p-0.5 overflow-x-auto gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => navigateTo(tab.key)}
            className={`whitespace-nowrap px-4 py-2 text-xs font-black rounded-t-lg transition-all border-b-2 ${
              parentRoute === tab.key
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Render tab content */}
      {parentRoute === "attendance" && (
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 leading-tight">Subject-wise Class Attendance</h3>
          <div className="space-y-4 border border-slate-100 p-4 rounded-xl">
            {subjects.map((sub) => (
              <div key={sub.name} className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span>{sub.name} Course</span>
                  <span>{sub.value}% Attendance</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${sub.color}`}
                    style={{ width: `${sub.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {parentRoute === "attendanceLog" && (
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 leading-tight">Recent Daily Registers</h3>
          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold">
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {logs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{log.date}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          log.status === "Present"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 font-medium">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {parentRoute === "attendanceMonthly" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex justify-center p-4">
            {/* Inline SVG Circular Progress Gauge */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="88" cy="88" r="70" stroke="#f1f5f9" strokeWidth="16" fill="transparent" />
                <circle
                  cx="88"
                  cy="88"
                  r="70"
                  stroke="#10b981"
                  strokeWidth="16"
                  fill="transparent"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * 75) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-3xl font-black text-slate-900">75%</span>
                <span className="text-[10px] text-slate-400 font-bold block uppercase mt-0.5 tracking-wider">Present</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-900 leading-tight">Monthly Summary Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                <span className="text-slate-400 text-xs font-bold block">Days Present</span>
                <span className="text-2xl font-black text-emerald-700 block mt-1">20 Days</span>
              </div>
              <div className="p-4 bg-rose-50/50 border border-rose-100 rounded-xl">
                <span className="text-slate-400 text-xs font-bold block">Days Absent</span>
                <span className="text-2xl font-black text-rose-700 block mt-1">6 Days</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed font-semibold">
              Your class attendance percentage is calculated monthly. Maintain above 75% to avoid academic eligibility warnings.
            </p>
          </div>
        </div>
      )}

      {parentRoute === "attendanceOverall" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex justify-center p-4">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="88" cy="88" r="70" stroke="#f1f5f9" strokeWidth="16" fill="transparent" />
                <circle
                  cx="88"
                  cy="88"
                  r="70"
                  stroke="#3b82f6"
                  strokeWidth="16"
                  fill="transparent"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * 84) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-3xl font-black text-slate-900">84%</span>
                <span className="text-[10px] text-slate-400 font-bold block uppercase mt-0.5 tracking-wider">Overall</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-900 leading-tight">Total Academic Standing</h3>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-400">Status</span>
                <span className="text-emerald-600">Excellent (Eligible)</span>
              </div>
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-400">Active Semester</span>
                <span className="text-slate-800">Semester 6</span>
              </div>
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-400">Requirements Check</span>
                <span className="text-slate-800">Satisfied</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 8. Assignments Screen
// ----------------------------------------------------
function Assignments({ assignments, onToggle }) {
  const [filter, setFilter] = useState("ALL");

  const filtered = assignments.filter((a) => {
    if (filter === "ALL") return true;
    return a.status.toUpperCase() === filter.toUpperCase();
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-6">
      <div className="border-b border-slate-100 pb-3 flex justify-between items-center flex-wrap gap-4">
        <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
          <Icon name="document-text" className="w-5 h-5 text-blue-600" />
          <span>Active Course Projects & Assignments</span>
        </h3>

        <div className="flex bg-slate-100 p-1 border border-slate-200 rounded-lg text-xs font-bold">
          {["ALL", "PENDING", "SUBMITTED"].map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                filter === mode ? "bg-white text-blue-600 shadow-xs" : "text-slate-400 hover:text-slate-700"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-100 rounded-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold">
              <th className="p-4">Subject</th>
              <th className="p-4">Assignment Topic</th>
              <th className="p-4">Assigned Date</th>
              <th className="p-4">Due Date</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
            {filtered.map((ass, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-slate-900">{ass.subject}</td>
                <td className="p-4 text-slate-500">{ass.project}</td>
                <td className="p-4 text-slate-400">{ass.assigned}</td>
                <td className="p-4 text-slate-400">{ass.due}</td>
                <td className="p-4 text-center">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-black uppercase ${
                      ass.status === "Submitted"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {ass.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => onToggle(assignments.indexOf(ass))}
                    className={`px-3 py-1.5 text-[10px] font-black rounded-lg border transition-all cursor-pointer ${
                      ass.status === "Submitted"
                        ? "bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100"
                        : "bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100"
                    }`}
                  >
                    {ass.status === "Submitted" ? "Mark Pending" : "Submit File"}
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400 font-bold">
                  No assignments found matching this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 9. Exams Schedule Screen
// ----------------------------------------------------
function ExamSchedule({ navigateTo, page }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-6">
      {/* Tab Selection */}
      <div className="flex border-b border-slate-100 pb-3 justify-between items-center flex-wrap gap-4">
        <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
          <Icon name="calendar-number" className="w-5 h-5 text-blue-600" />
          <span>University Examination Schedules</span>
        </h3>

        <div className="flex bg-slate-100 p-1 border border-slate-200 rounded-lg text-xs font-bold">
          <button
            onClick={() => navigateTo("examSchedule")}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              page === "schedule" ? "bg-white text-blue-600 shadow-xs" : "text-slate-400 hover:text-slate-700"
            }`}
          >
            Exam Schedule
          </button>
          <button
            onClick={() => navigateTo("examTable")}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              page === "table" ? "bg-white text-blue-600 shadow-xs" : "text-slate-400 hover:text-slate-700"
            }`}
          >
            University Exam Table
          </button>
        </div>
      </div>

      {page === "schedule" ? (
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold">
                <th className="p-4">Subject</th>
                <th className="p-4">Course Code</th>
                <th className="p-4">Exam Date</th>
                <th className="p-4">Session Time</th>
                <th className="p-4 text-right">Syllabus File</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {examRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{row.subject}</td>
                  <td className="p-4 text-slate-500 font-bold">{row.code}</td>
                  <td className="p-4 text-slate-400">{row.date}</td>
                  <td className="p-4 text-slate-400">{row.time}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => alert("Downloading PDF package syllabus.")}
                      className="text-blue-600 hover:underline font-black cursor-pointer"
                    >
                      {row.syllabus}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 text-slate-200 font-bold">
                <th className="p-4">Date</th>
                <th className="p-4">Time</th>
                <th className="p-4">Code</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Room No.</th>
                <th className="p-4 text-right">Faculty Invigilator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {[
                { date: "15 Apr", time: "9:00 AM", code: "CS101", sub: "Programming Principles", room: "Block A - A101", fac: "Prof. Smith" },
                { date: "16 Apr", time: "1:00 PM", code: "MA301", sub: "Calculus & Algebra", room: "Block C - C303", fac: "Dr. Lee" },
                { date: "17 Apr", time: "2:00 PM", code: "BUS210", sub: "Business Management", room: "Block F - F305", fac: "Ms. Clark" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{row.date}</td>
                  <td className="p-4 text-slate-500 font-bold">{row.time}</td>
                  <td className="p-4 text-blue-600 font-black">{row.code}</td>
                  <td className="p-4 text-slate-700">{row.sub}</td>
                  <td className="p-4 text-slate-400 font-bold">{row.room}</td>
                  <td className="p-4 text-slate-400 text-right">{row.fac}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 10. Holidays Screen
// ----------------------------------------------------
function Holidays() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-6">
      <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
        <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
          <Icon name="calendar-clear" className="w-5 h-5 text-blue-600" />
          <span>Upcoming Gazetted Holidays</span>
        </h3>
      </div>

      <div className="overflow-x-auto border border-slate-100 rounded-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold">
              <th className="p-4">Holiday / Event</th>
              <th className="p-4 text-right">Scheduled Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
            {holidays.map((h, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-slate-900">{h.event}</td>
                <td className="p-4 text-slate-400 text-right font-black">{h.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 11. Timetable Screen (Matrix and Poster Views)
// ----------------------------------------------------
function Timetable({ navigateTo, page }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-6">
      <div className="border-b border-slate-100 pb-3 flex justify-between items-center flex-wrap gap-4">
        <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
          <Icon name="time" className="w-5 h-5 text-blue-600" />
          <span>Weekly Class Timetable Matrix</span>
        </h3>

        <div className="flex bg-slate-100 p-1 border border-slate-200 rounded-lg text-xs font-bold">
          <button
            onClick={() => navigateTo("timetable")}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              page === "matrix" ? "bg-white text-blue-600 shadow-xs" : "text-slate-400 hover:text-slate-700"
            }`}
          >
            Grid Table
          </button>
          <button
            onClick={() => navigateTo("timetablePoster")}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              page === "poster" ? "bg-white text-blue-600 shadow-xs" : "text-slate-400 hover:text-slate-700"
            }`}
          >
            Poster Card View
          </button>
        </div>
      </div>

      {page === "matrix" ? (
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold">
                <th className="p-4">Time Slot</th>
                <th className="p-4">Monday</th>
                <th className="p-4">Tuesday</th>
                <th className="p-4">Wednesday</th>
                <th className="p-4">Thursday</th>
                <th className="p-4">Friday</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {timetableData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-bold text-blue-600">{row.time}</td>
                  <td className="p-4 text-slate-800">{row.mon}</td>
                  <td className="p-4 text-slate-800">{row.tue}</td>
                  <td className="p-4 text-slate-800">{row.wed}</td>
                  <td className="p-4 text-slate-800">{row.thu}</td>
                  <td className="p-4 text-slate-800">{row.fri}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-6 bg-slate-900 border border-slate-800 text-white rounded-xl space-y-4">
          <div>
            <h4 className="text-lg font-black tracking-tight">Weekly Academic Schedule poster</h4>
            <p className="text-slate-400 text-xs font-semibold mt-1">Class Section: CSE-6A | Springfield Campus</p>
          </div>
          <div className="overflow-x-auto border border-slate-800 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950 text-slate-300 border-b border-slate-800 font-black">
                  <th className="p-3">Slot</th>
                  <th className="p-3">Mon</th>
                  <th className="p-3">Tue</th>
                  <th className="p-3">Wed</th>
                  <th className="p-3">Thu</th>
                  <th className="p-3">Fri</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-400 font-semibold">
                {timetableData.slice(0, 4).map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-bold text-blue-400">{row.time}</td>
                    <td className="p-3">{row.mon.slice(0, 10)}...</td>
                    <td className="p-3">{row.tue.slice(0, 10)}...</td>
                    <td className="p-3">{row.wed.slice(0, 10)}...</td>
                    <td className="p-3">{row.thu.slice(0, 10)}...</td>
                    <td className="p-3">{row.fri.slice(0, 10)}...</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 12. Billing / Invoices Screen
// ----------------------------------------------------
function Billing() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-6">
      <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
        <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
          <Icon name="receipt" className="w-5 h-5 text-blue-600" />
          <span>Billing Statements & Invoices</span>
        </h3>
      </div>

      <div className="overflow-x-auto border border-slate-100 rounded-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold">
              <th className="p-4">Invoice No.</th>
              <th className="p-4">Description</th>
              <th className="p-4">Due Date</th>
              <th className="p-4 text-center">Amount</th>
              <th className="p-4 text-center">Balance Due</th>
              <th className="p-4 text-right">Payment Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
            {bills.map((bill, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-slate-900">#INV-{bill.id}</td>
                <td className="p-4 text-slate-500 font-bold">{bill.item}</td>
                <td className="p-4 text-slate-400">{bill.due}</td>
                <td className="p-4 text-center font-bold">{bill.amount}</td>
                <td className="p-4 text-center text-slate-400 font-bold">{bill.balance}</td>
                <td className="p-4 text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded text-[10px] font-black uppercase ${
                      bill.status === "Settled"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-rose-100 text-rose-800 border border-rose-200 animate-pulse"
                    }`}
                  >
                    {bill.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 13. Leave Application Screen (Stateful)
// ----------------------------------------------------
function Leave({ leaves, onSubmit }) {
  const [type, setType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [reason, setReason] = useState("");
  const [notif, setNotif] = useState("");

  const handleApply = (e) => {
    e.preventDefault();
    if (!type || !from || !to || !reason) {
      alert("Please fill in leave details.");
      return;
    }

    const payload = {
      id: Date.now(),
      type,
      fromDate: from,
      toDate: to,
      reason,
      status: "Waiting Review",
    };

    onSubmit(payload);
    setNotif("Leave request submitted successfully!");

    // Clear form
    setType("");
    setFrom("");
    setTo("");
    setReason("");

    setTimeout(() => {
      setNotif("");
    }, 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Application Form */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <h3 className="text-base font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
            <Icon name="briefcase" className="w-5 h-5 text-blue-600" />
            <span>Apply for Student Leave</span>
          </h3>

          {notif && (
            <div className="mb-4 p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs rounded-xl font-bold">
              {notif}
            </div>
          )}

          <form onSubmit={handleApply} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 text-xs font-bold block mb-1.5">Leave Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl text-slate-800 outline-hidden transition-all text-xs"
                >
                  <option value="">Select leave category</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Duty Leave">Duty Leave</option>
                  <option value="Maternity/Paternity Leave">Maternity/Paternity Leave</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 text-xs font-bold block mb-1.5">From Date</label>
                <input
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl text-slate-800 outline-hidden transition-all text-xs"
                />
              </div>

              <div>
                <label className="text-slate-400 text-xs font-bold block mb-1.5">To Date</label>
                <input
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl text-slate-800 outline-hidden transition-all text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 text-xs font-bold block mb-1.5">Reason for Absence</label>
              <textarea
                rows="4"
                placeholder="Brief description of the reason for leave..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl text-slate-800 placeholder-slate-400 outline-hidden transition-all text-xs"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-xl transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Submit Leave Request</span>
            </button>
          </form>
        </div>
      </div>

      {/* History panel */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <h3 className="text-base font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
            <Icon name="briefcase" className="w-5 h-5 text-blue-600" />
            <span>Leave Submission History</span>
          </h3>

          <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar">
            {leaves.map((l) => (
              <div key={l.id} className="p-3 bg-slate-50 border border-slate-100 rounded-lg space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-slate-800">{l.type}</span>
                  <span className="text-[9px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-black uppercase">
                    {l.status}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-bold">
                  {l.fromDate} to {l.toDate}
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed truncate font-medium">{l.reason}</p>
              </div>
            ))}
            {leaves.length === 0 && (
              <p className="text-slate-400 text-xs font-bold text-center py-6">No previous leave requests.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 14. Course Enrollment & Completed Courses
// ----------------------------------------------------
function Enrollment({ navigateTo, page }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-6">
      {/* Sub menu selectors */}
      <div className="border-b border-slate-100 pb-3 flex justify-between items-center flex-wrap gap-4">
        <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
          <Icon name="person-add" className="w-5 h-5 text-blue-600" />
          <span>Active Semester Enrollment</span>
        </h3>

        <div className="flex bg-slate-100 p-1 border border-slate-200 rounded-lg text-xs font-bold">
          <button
            onClick={() => navigateTo("enrollment")}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              page === "enroll" ? "bg-white text-blue-600 shadow-xs" : "text-slate-400 hover:text-slate-700"
            }`}
          >
            Enrollment Settings
          </button>
          <button
            onClick={() => navigateTo("completedCourses")}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              page === "completed" ? "bg-white text-blue-600 shadow-xs" : "text-slate-400 hover:text-slate-700"
            }`}
          >
            Completed Courses
          </button>
        </div>
      </div>

      {page === "enroll" ? (
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold">
                <th className="p-4">Academic Semester</th>
                <th className="p-4">Timeline Start / End</th>
                <th className="p-4 text-center">Last Enroll Date</th>
                <th className="p-4 text-center">Withdraw Cutoff</th>
                <th className="p-4 text-right">Register Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-slate-900">Semester 6 (Even Term)</td>
                <td className="p-4 text-slate-500 font-bold">01 Jan - 30 Jun</td>
                <td className="p-4 text-center text-slate-400">28 Jan 2026</td>
                <td className="p-4 text-center text-slate-400">27 Jan 2026</td>
                <td className="p-4 text-right">
                  <span className="inline-block px-2.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-500 border font-bold">
                    Enrolled
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold">
                <th className="p-4">Course Code</th>
                <th className="p-4">Name of Course</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-right">Credits Earned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {completedCourses.map((row) => (
                <tr key={row.code} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-bold text-blue-600">{row.code}</td>
                  <td className="p-4 text-slate-800">{row.name}</td>
                  <td className="p-4 text-slate-400 font-bold">{row.category}</td>
                  <td className="p-4 text-right text-slate-950 font-black">{row.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 15. Results Screen
// ----------------------------------------------------
function FinalResult() {
  const rows = [
    { code: "CS601", name: "Deep Learning Fundamentals", credits: 4, score: 82, grade: "A+" },
    { code: "CS602", name: "Distributed Systems Architecture", credits: 4, score: 71, grade: "A" },
    { code: "CS603", name: "Data Mining Algorithms", credits: 3, score: 56, grade: "B" },
    { code: "CS604", name: "Capstone Project Work", credits: 5, score: 86, grade: "A+" },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-6">
      {/* Summary Banner */}
      <div className="bg-blue-600 rounded-xl p-5 text-white flex justify-between items-center shadow-md">
        <div>
          <span className="text-blue-100 text-[10px] font-black uppercase tracking-wider">Overall GPA Sheet</span>
          <h4 className="text-xl font-black mt-1">Semester 6 Grades Summary</h4>
        </div>
        <div className="text-right">
          <span className="text-3xl font-black block">7.18</span>
          <span className="text-[10px] text-blue-100 font-bold block uppercase tracking-wider">Pass Class (SGPA)</span>
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-100 rounded-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold">
              <th className="p-4">Subject Code</th>
              <th className="p-4">Course Name</th>
              <th className="p-4 text-center">Credits Weight</th>
              <th className="p-4 text-center">Marks Score</th>
              <th className="p-4 text-right">Letter Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
            {rows.map((row) => (
              <tr key={row.code} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-blue-600">{row.code}</td>
                <td className="p-4 text-slate-800">{row.name}</td>
                <td className="p-4 text-center text-slate-400 font-bold">{row.credits}</td>
                <td className="p-4 text-center font-bold">{row.score} / 100</td>
                <td className="p-4 text-right text-emerald-600 font-black">{row.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
