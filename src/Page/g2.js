import React, { useState, useEffect } from "react";

const CurrentLocation = () => {
  const [location, setLocation] = useState({ lat: null, lng: null }); // 현재 위치
  const [error, setError] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (err) => {
          setError("위치 정보를 가져올 수 없습니다.");
          console.error("Error getting location:", err);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setError("이 브라우저에서는 위치 정보 사용을 지원하지 않습니다.");
    }
  }, []);

  return (
    <div>
      <h2>현재 위치</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <p>위도: {location.lat}</p>
          <p>경도: {location.lng}</p>
        </>
      )}
    </div>
  );
};

export default CurrentLocation;
