import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiService from '../../Service/ApiService';

export const Navbar = () =>  {
    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        const isLogout = window.confirm('Xác nhận đăng xuất');
        if (isLogout) {
            ApiService.logout();
            navigate('/home');
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/home">TITHotelier</NavLink>
            </div>
            <ul className="navbar-ul">
                <li><NavLink to="/home" activeclassname="active">Trang chủ</NavLink></li>
                <li><NavLink to="/rooms" activeclassname="active">Danh sách phòng</NavLink></li>
                <li><NavLink to="/find-booking" activeclassname="active">Tìm kiếm</NavLink></li>

                {isUser && <li><NavLink to="/profile" activeclassname="active">Thông tin</NavLink></li>}
                {isAdmin && <li><NavLink to="/admin" activeclassname="active">Quản lý</NavLink></li>}

                {!isAuthenticated &&<li><NavLink to="/login" activeclassname="active">Đăng nhập</NavLink></li>}
                {!isAuthenticated &&<li><NavLink to="/register" activeclassname="active">Đăng ký</NavLink></li>}
                {isAuthenticated && <li onClick={handleLogout}>Logout</li>}
            </ul>
        </nav>
    );
}