import React, { useState, useEffect } from "react";
import axios from "axios";

function Createdby() {
  const [signupApi, setsignupApi] = useState([]);
  const [userdataApi, setuserdataApi] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/signup");
        setsignupApi(response.data);
      } catch (error) {
        console.error("Error fetching login data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:3000/placeData");
        const reviews = response.data.filter(
          (review) => review.userlocal === selectedUser
        );
        setuserdataApi(reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [selectedUser]);

  const handleSelect = (event) => {
    setSelectedUser(event.target.value);
  };

  return (
    <div>
      <select name="users" id="users" onChange={handleSelect}>
        <option value="">Select a user</option>
        {signupApi.map((user) => (
          <option key={user._id} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>
      <div>
        {userdataApi && userdataApi.map((review) => (
          <div key={review._id}>
            <h3>{review.placeName}</h3>
            <p>{review.location}</p>
            <p>{review.yearBuilt}</p>
            <p>{review.architect}</p>
            <p>{review.architecturalStyle}</p>
            <p>{review.historicalSignificance}</p>
            <p>{review.currentUse}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Createdby;
