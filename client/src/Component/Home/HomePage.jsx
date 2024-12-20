import React, { useState } from "react";

import { RoomSearch } from "../Common/RoomSearch";
import { RoomResult } from "../Common/RoomResult";
export const HomePage = () => {
    const [roomSearchResults, setRoomSearchResults] = useState([]);

    // Function to handle search results
    const handleSearchResult = (results) => {
        setRoomSearchResults(results);
    };

    return (
        <div className="home">
            {/* HEADER / BANNER ROOM SECTION */}
            <section>
                <header className="header-banner">
                    <img src="https://res.cloudinary.com/dozs7ggs4/image/upload/v1716914866/home-fixma_x03waz.jpg" alt="Phegon Hotel" className="header-image" />
                    <div className="overlay"></div>
                    <div className="animated-texts overlay-content">
                        <h1>
                            Chào mừng đến với <span className="phegon-color">TITHotelier</span>
                        </h1><br />
                        <h3>Dịch vụ quản lý phòng khách sạn, du lịch </h3>
                    </div>
                </header>
            </section>

            {/* SEARCH/FIND AVAILABLE ROOM SECTION */}
            <RoomSearch handleSearchResult={handleSearchResult} />
            <RoomResult roomSearchResults={roomSearchResults} />

            <h4><a className="view-rooms-home" href="/rooms">Tất cả phòng</a></h4>

            <h2 className="home-services">Các dịch vụ hiện có tại <span className="phegon-color">TITHotelier</span></h2>

            {/* SERVICES SECTION */}
            <section className="service-section"><div className="service-card">
                <img src="./assets/images/ac.png" alt="Air Conditioning" />
                <div className="service-details">
                    <h3 className="service-title">Air Conditioning</h3>
                    <p className="service-description">Stay cool and comfortable throughout your stay with our individually controlled in-room air conditioning.</p>
                </div>
            </div>
                <div className="service-card">
                    <img src="./assets/images/mini-bar.png" alt="Mini Bar" />
                    <div className="service-details">
                        <h3 className="service-title">Mini Bar</h3>
                        <p className="service-description">Enjoy a convenient selection of beverages and snacks stocked in your room's mini bar with no additional cost.</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src="./assets/images/parking.png" alt="Parking" />
                    <div className="service-details">
                        <h3 className="service-title">Parking</h3>
                        <p className="service-description">We offer on-site parking for your convenience . Please inquire about valet parking options if available.</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src="./assets/images/wifi.png" alt="WiFi" />
                    <div className="service-details">
                        <h3 className="service-title">WiFi</h3>
                        <p className="service-description">Stay connected throughout your stay with complimentary high-speed Wi-Fi access available in all guest rooms and public areas.</p>
                    </div>
                </div>

            </section>
            {/* AVAILABLE ROOMS SECTION */}
            <section>

            </section>
        </div>
    );
}