import React, { useState } from 'react';
import ApiService from '../../Service/ApiService'; 

const FindBookingPage = () => {
    const [confirmationCode, setConfirmationCode] = useState(''); 
    const [bookingDetails, setBookingDetails] = useState(null); 
    const [error, setError] = useState(null); 

    const handleSearch = async () => {
        if (!confirmationCode.trim()) {
            setError("Vui lòng nhập mã xác nhận đặt phòng");
            setTimeout(() => setError(''), 5000);
            return;
        }
        try {
            // Call API to get booking details
            const response = await ApiService.getBookingByConfirmationCode(confirmationCode);
            setBookingDetails(response.booking);
            setError(null); 
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="find-booking-page">
            <h2>Tìm kiếm đặt chỗ</h2>
            <div className="search-container">
                <input
                    required
                    type="text"
                    placeholder="Vui lòng nhập mã xác nhận"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                />
                <button onClick={handleSearch}>Tìm kiếm</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {bookingDetails && (
                <div className="booking-details">
                    <h3>Booking Details</h3>
                    <p>Confirmation Code: {bookingDetails.bookingConfirmationCode}</p>
                    <p>Check-in Date: {bookingDetails.checkInDate}</p>
                    <p>Check-out Date: {bookingDetails.checkOutDate}</p>
                    <p>Num Of Adults: {bookingDetails.numOfAdults}</p>
                    <p>Num Of Children: {bookingDetails.numOfChildren}</p>

                    <br />
                    <hr />
                    <br />
                    <h3>Booker Detials</h3>
                    <div>
                        <p> Name: {bookingDetails.user.name}</p>
                        <p> Email: {bookingDetails.user.email}</p>
                        <p> Phone Number: {bookingDetails.user.phoneNumber}</p>
                    </div>

                    <br />
                    <hr />
                    <br />
                    <h3>Room Details</h3>
                    <div>
                        <p> Room Type: {bookingDetails.room.roomType}</p>
                        <img src={bookingDetails.room.roomPhotoUrl} alt="" sizes="" srcSet="" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FindBookingPage;