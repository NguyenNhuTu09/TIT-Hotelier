import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {Navbar} from './Component/Common/Navbar';
import {LoginPage} from './Component/Auth/LoginPage';
import {RegisterPage} from './Component/Auth/RegisterPage';
import {HomePage} from './Component/Home/HomePage';
import AllRoomsPage from './Component/BookingRooms/AllRoomsPage';
import RoomDetailsBookingPage from './Component/BookingRooms/RoomDetailsPage';
import FindBookingPage from './Component/BookingRooms/FindBookingPage';
import AdminPage from './Component/admin/AdminPage';
import ManageRoomPage from './Component/Admin/ManageRoomPage';
import EditRoomPage from './Component/Admin/EditRoomPage';
import AddRoomPage from './Component/Admin/AddRoomPage';
import ManageBookingsPage from './Component/Admin/ManageBookingsPage';
import EditBookingPage from './component/Admin/EditBookingPage';
import ProfilePage from './Component/Profile/ProfilePage';
import EditProfilePage from './Component/Profile/EditProfilePage';
import { ProtectedRoute, AdminRoute } from './Service/guard';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            {/* Public Routes */}
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/rooms" element={<AllRoomsPage />} />
            <Route path="/find-booking" element={<FindBookingPage />} />

            {/* Protected Routes */}
            <Route path="/room-details-book/:roomId"
              element={<ProtectedRoute element={<RoomDetailsBookingPage />} />}
            />
            <Route path="/profile"
              element={<ProtectedRoute element={<ProfilePage />} />}
            />
            <Route path="/edit-profile"
              element={<ProtectedRoute element={<EditProfilePage />} />}
            />

            {/* Admin Routes */}
            <Route path="/admin"
              element={<AdminRoute element={<AdminPage />} />}
            />
            <Route path="/admin/manage-rooms"
              element={<AdminRoute element={<ManageRoomPage />} />}
            />
            <Route path="/admin/edit-room/:roomId"
              element={<AdminRoute element={<EditRoomPage />} />}
            />
            <Route path="/admin/add-room"
              element={<AdminRoute element={<AddRoomPage />} />}
            />
            <Route path="/admin/manage-bookings"
              element={<AdminRoute element={<ManageBookingsPage />} />}
            />
            <Route path="/admin/edit-booking/:bookingCode"
              element={<AdminRoute element={<EditBookingPage />} />}
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;