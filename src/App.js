import "./App.css";

import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import StudentDashboard from "./pages/student/StudentDashboard";
import CreateStudent from "./pages/student/CreateStudent";
import EditStudent from "./pages/student/EditStudent";
import StudentDetails from "./pages/student/StudentDetails";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/Login";

import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            // <ProtectedRoute>
            <Home />
            // </ProtectedRoute>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student-dashboard"
          element={
            // <ProtectedRoute>
            <StudentDashboard />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/create-student"
          element={
            // <ProtectedRoute>
            <CreateStudent />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/edit-student/:id"
          element={
            // <ProtectedRoute>
            <EditStudent />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/student-details/:id"
          element={
            // <ProtectedRoute>
            <StudentDetails />
            // </ProtectedRoute>
          }
        />

        {/* Teacher Routes */}
        <Route
          path="/teacher-dashboard"
          element={
            // <ProtectedRoute>
            <TeacherDashboard />
            // </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin-dashboard"
          element={
            // <ProtectedRoute>
            <AdminDashboard />
            // </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
