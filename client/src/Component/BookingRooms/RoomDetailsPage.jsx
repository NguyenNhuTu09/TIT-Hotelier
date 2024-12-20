import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../Service/ApiService'; 
import DatePicker from 'react-datepicker';


const RoomDetailsPage = () => {
  const navigate = useNavigate(); 
  const { roomId } = useParams(); 
  const [roomDetails, setRoomDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [checkInDate, setCheckInDate] = useState(null); 
  const [checkOutDate, setCheckOutDate] = useState(null); 
  const [numAdults, setNumAdults] = useState(1); 
  const [numChildren, setNumChildren] = useState(0); 
  const [totalPrice, setTotalPrice] = useState(0); 
  const [totalGuests, setTotalGuests] = useState(1); 
  const [showDatePicker, setShowDatePicker] = useState(false); 
  const [userId, setUserId] = useState(''); 
  const [showMessage, setShowMessage] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading state to true
        const response = await ApiService.getRoomById(roomId);
        setRoomDetails(response.room);
        const userProfile = await ApiService.getUserProfile();
        setUserId(userProfile.user.id);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false); 
      }
    };
    fetchData();
  }, [roomId]); 


  const handleConfirmBooking = async () => {
    if (!checkInDate || !checkOutDate) {
      setErrorMessage('Vui lòng chọn ngày nhận phòng và ngày trả phòng');
      setTimeout(() => setErrorMessage(''), 5000); 
      return;
    }

    if (isNaN(numAdults) || numAdults < 1 || isNaN(numChildren) || numChildren < 0) {
      setErrorMessage('Vui lòng nhập số lượng người lớn và trẻ em');
      setTimeout(() => setErrorMessage(''), 5000); 
      return;
    }

    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const totalDays = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;

    const totalGuests = numAdults + numChildren;

    const roomPricePerNight = roomDetails.roomPrice;
    const totalPrice = roomPricePerNight * totalDays;

    setTotalPrice(totalPrice);
    setTotalGuests(totalGuests);
  };

  const acceptBooking = async () => {
    try {

      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);

      console.log("Ngày nhận phòng", startDate);
      console.log("Ngày trả phòng", endDate);

      const formattedCheckInDate = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
      const formattedCheckOutDate = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];


      console.log("Formated Check-in Date:", formattedCheckInDate);
      console.log("Formated Check-out Date:", formattedCheckOutDate);

      const booking = {
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        numOfAdults: numAdults,
        numOfChildren: numChildren
      };
      console.log(booking)
      console.log(checkOutDate)

      // Make booking
      const response = await ApiService.bookRoom(roomId, userId, booking);
      if (response.statusCode === 200) {
        setConfirmationCode(response.bookingConfirmationCode); // Set booking confirmation code
        setShowMessage(true); // Show message
        // Hide message and navigate to homepage after 5 seconds
        setTimeout(() => {
          setShowMessage(false);
          navigate('/rooms'); // Navigate to rooms
        }, 10000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(''), 5000); // Clear error message after 5 seconds
    }
  };

  if (isLoading) {
    return <p className='room-detail-loading'>Đang tải thông tin phòng</p>;
  }

  if (error) {
    return <p className='room-detail-loading'>{error}</p>;
  }

  if (!roomDetails) {
    return <p className='room-detail-loading'>Phòng không tồn tại</p>;
  }

  const { roomType, roomPrice, roomPhotoUrl, description, bookings } = roomDetails;

  return (
    <div className="room-details-booking">
      {showMessage && (
        <p className="booking-success-message">
          Đặt phòng thành công, đây là mã xác nhận: {confirmationCode}. Tin nhắn SMS và Email về thông tin đặt chỗ đã được gửi đến bạn
        </p>
      )}
      {errorMessage && (
        <p className="error-message">
          {errorMessage}
        </p>
      )}
      <h2>Room Details</h2>
      <br />
      <img src={roomPhotoUrl} alt={roomType} className="room-details-image" />
      <div className="room-details-info">
        <h3>{roomType}</h3>
        <p>Price: ${roomPrice} / night</p>
        <p>{description}</p>
      </div>
      {bookings && bookings.length > 0 && (
        <div>
          <h3>Existing Booking Details</h3>
          <ul className="booking-list">
            {bookings.map((booking, index) => (
              <li key={booking.id} className="booking-item">
                <span className="booking-number">Booking {index + 1} </span>
                <span className="booking-text">Check-in: {booking.checkInDate} </span>
                <span className="booking-text">Out: {booking.checkOutDate}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="booking-info">
        <button className="book-now-button" onClick={() => setShowDatePicker(true)}>Book Now</button>
        <button className="go-back-button" onClick={() => setShowDatePicker(false)}>Go Back</button>
        {showDatePicker && (
          <div className="date-picker-container">
            <DatePicker
              className="detail-search-field"
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              selectsStart
              startDate={checkInDate}
              endDate={checkOutDate}
              placeholderText="Check-in Date"
              dateFormat="dd/MM/yyyy"
              // dateFormat="yyyy-MM-dd"
            />
            <DatePicker
              className="detail-search-field"
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              selectsEnd
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={checkInDate}
              placeholderText="Check-out Date"
              // dateFormat="yyyy-MM-dd"
              dateFormat="dd/MM/yyyy"
            />

            <div className='guest-container'>
              <div className="guest-div">
                <label>Adults:</label>
                <input
                  type="number"
                  min="1"
                  value={numAdults}
                  onChange={(e) => setNumAdults(parseInt(e.target.value))}
                />
              </div>
              <div className="guest-div">
                <label>Children:</label>
                <input
                  type="number"
                  min="0"
                  value={numChildren}
                  onChange={(e) => setNumChildren(parseInt(e.target.value))}
                />
              </div>
              <button className="confirm-booking" onClick={handleConfirmBooking}>Confirm Booking</button>
            </div>
          </div>
        )}
        {totalPrice > 0 && (
          <div className="total-price">
            <p>Total Price: ${totalPrice}</p>
            <p>Total Guests: {totalGuests}</p>
            <button onClick={acceptBooking} className="accept-booking">Accept Booking</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetailsPage;