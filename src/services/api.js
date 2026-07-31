const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export function getStudentToken() {
  return localStorage.getItem("erp_student_token");
}

export function getStoredStudent() {
  const student = localStorage.getItem("erp_student");
  return student ? JSON.parse(student) : null;
}

export function setStudentAuth(token, student) {
  localStorage.setItem("erp_student_token", token);
  localStorage.setItem("erp_student", JSON.stringify(student));
}

export function clearStudentAuth() {
  localStorage.removeItem("erp_student_token");
  localStorage.removeItem("erp_student");
}

export async function apiRequest(path, options = {}) {
  const token = getStudentToken();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong with the server");
  }

  return data;
}

export const api = {
  login: async (studentId, password) => {
    const data = await apiRequest("/student/login", {
      method: "POST",
      body: JSON.stringify({ studentId, password }),
    });
    if (data.token && data.student) {
      setStudentAuth(data.token, data.student);
    }
    return data;
  },

  register: async (payload) => {
    return await apiRequest("/student/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getMe: async () => {
    try {
      const data = await apiRequest("/student/me");
      if (data.student) {
        setStudentAuth(getStudentToken(), data.student);
        return data.student;
      }
    } catch (err) {
      console.warn("Backend getMe error:", err);
    }
    return getStoredStudent();
  },

  getAttendance: async (studentId) => {
    try {
      const stored = getStoredStudent();
      const id = studentId || stored?.id || stored?.studentId || stored?.student_id || "me";
      return await apiRequest(`/attendance/student/${id}`);
    } catch (err) {
      console.warn("Backend getAttendance error:", err);
      return null;
    }
  },

  getReportCard: async (studentId) => {
    try {
      const stored = getStoredStudent();
      const id = studentId || stored?.id || stored?.studentId;
      return await apiRequest(`/exams/report-card${id ? `/${id}` : ""}`);
    } catch (err) {
      console.warn("Backend getReportCard error:", err);
      return null;
    }
  },

  getExams: async () => {
    try {
      return await apiRequest("/exams");
    } catch (err) {
      console.warn("Backend getExams error:", err);
      return [];
    }
  },

  getTimetable: async () => {
    try {
      const res = await apiRequest("/timetable").catch(() => apiRequest("/data/timetable"));
      return Array.isArray(res) ? res : res?.rows || [];
    } catch (err) {
      console.warn("Backend getTimetable error:", err);
      return [];
    }
  },

  getLibraryBooks: async () => {
    try {
      const res = await apiRequest("/library").catch(() => apiRequest("/data/library"));
      return res;
    } catch (err) {
      console.warn("Backend getLibraryBooks error:", err);
      return null;
    }
  },

  getTransportData: async () => {
    try {
      const res = await apiRequest("/transport").catch(() => apiRequest("/data/transport"));
      return res;
    } catch (err) {
      console.warn("Backend getTransportData error:", err);
      return null;
    }
  },

  getStudentLeaves: async (studentId) => {
    try {
      const stored = getStoredStudent();
      const id = studentId || stored?.id || "me";
      const res = await apiRequest(`/leaves/student/${id}`).catch(() => apiRequest("/leaves"));
      return Array.isArray(res) ? res : res?.leaves || [];
    } catch (err) {
      console.warn("Backend getStudentLeaves error:", err);
      return [];
    }
  },

  applyStudentLeave: async (payload) => {
    const stored = getStoredStudent();
    const body = {
      ...payload,
      student_id: stored?.id || 8,
      student_name: stored?.name || stored?.full_name || "raj",
      roll_no: stored?.roll_no || "STU-108",
      grade_class: stored?.grade_class || "Semester 6"
    };
    return await apiRequest("/leaves", {
      method: "POST",
      body: JSON.stringify(body)
    });
  },

  getHolidays: async () => {
    try {
      const res = await apiRequest("/holidays").catch(() => apiRequest("/data/holidays"));
      return Array.isArray(res) ? res : [];
    } catch (err) {
      console.warn("Backend getHolidays error:", err);
      return [];
    }
  },

  getStudentFees: async (studentId) => {
    try {
      const stored = getStoredStudent();
      const id = studentId || stored?.id || "me";
      return await apiRequest(`/fees/student/${id}`);
    } catch (err) {
      console.warn("Backend getStudentFees error:", err);
      return null;
    }
  },

  payStudentFee: async (feeId, payload = {}) => {
    return await apiRequest(`/fees/pay/${feeId}`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getCourses: async () => {
    try {
      return await apiRequest("/data/courses");
    } catch (err) {
      console.warn("Backend getCourses error:", err);
      return [];
    }
  },

  getStudentAssignments: async (studentId) => {
    try {
      const stored = getStoredStudent();
      const id = studentId || stored?.id || "me";
      return await apiRequest(`/assignments/student/${id}`);
    } catch (err) {
      console.warn("Backend getStudentAssignments error:", err);
      return [];
    }
  },

  submitAssignment: async (assignmentId, text) => {
    return await apiRequest(`/assignments/${assignmentId}/submit`, {
      method: "POST",
      body: JSON.stringify({ submission_text: text })
    });
  }
};
