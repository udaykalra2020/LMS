import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LibrarianDashboard from "./components/LibrarianDashboard";
import UserDashboard from "./components/UserDashboard";
import Login from "./components/Login";
import UserLogin from "./components/UserLogin";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import SectionManagement from "./components/SectionManagement";
import BookManagement from "./components/BookManagement";
import EbookManagement from "./components/EbookManagement";
import RequestManagement from "./components/RequestManagement";
import FeedbackManagement from "./components/FeedbackManagement";
import EbookDetail from "./components/EbookDetail";
import AvailableBooks from "./components/AvailableBooks";
import UserProfile from "./components/UserProfile";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import Students from "./components/Students";
import "./index.css";
import Dashboard from "./components/Dashboard";
import ProfilePage from "./components/Profile";
import Subscription from "./components/Subscriptions";
import BookRequests from "./components/BookRequests";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <div className="main-container">
          <Navbar />
          <div className="content">
            <ToastContainer position="top-center" autoClose={1000} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin-login" element={<Login />} />
              <Route path="/user-login" element={<UserLogin />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/librarian-dashboard"
                element={
                  <PrivateRoute role="librarian">
                    <LibrarianDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/librarian"
                element={
                  <PrivateRoute role="librarian">
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/user/books"
                element={
                  <PrivateRoute role="user">
                    <UserDashboard />
                  </PrivateRoute>
                }
              />

              <Route
                path="/manage-sections"
                element={
                  <PrivateRoute role="librarian">
                    <SectionManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/books"
                element={
                  <PrivateRoute role="librarian">
                    <BookManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/ebooks"
                element={
                  <PrivateRoute role="librarian">
                    <EbookManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/manage-requests"
                element={
                  <PrivateRoute role="librarian">
                    <RequestManagement />
                    {/* <BookRequests /> */}
                  </PrivateRoute>
                }
              />
              <Route
                path="/manage-feedbacks"
                element={
                  <PrivateRoute role="librarian">
                    <FeedbackManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/manage-students"
                element={
                  <PrivateRoute role="librarian">
                    <Students />
                  </PrivateRoute>
                }
              />
              <Route
                path="/me"
                element={
                  <ProfilePage />
                }
              />
              <Route
                path="/ebook/:id"
                element={
                  <PrivateRoute role="user">
                    <EbookDetail />
                  </PrivateRoute>
                }
              />
              <Route
                path="/subscription"
                element={
                  <PrivateRoute role="user">
                    <Subscription />
                  </PrivateRoute>
                }
              />
              <Route
                path="/available-books"
                element={
                  <PrivateRoute role="user">
                    <AvailableBooks />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute role="user">
                    <UserProfile />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>

    </AppProvider>
  );
};

export default App;
