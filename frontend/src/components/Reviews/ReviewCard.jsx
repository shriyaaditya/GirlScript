import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewCard = ({ user_id, book_id, rating, review_text }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${user_id}/details`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          }
        })
        const data = await res.json();
        if(data.success){
          setUserEmail(data.user.email);
          setUserName(data.user.name);
          console.log("User details fetched successfully: ", data.user);
        }
      }catch(error){
        console.error("Error fetching user details:", error);
      }
    }
  }, [user_id])

  return (
    <>
      <div>
        <div>
          <div>
            <p>{userName}</p>
            <p>{userEmail}</p>
          </div>
          <div>
            {Array.from({ length: rating }, (_, i) => (
          <FaStar key={i} color="#FFD700" />
        ))}
          </div>
        </div>
        <div>
          <p>{review_text}</p>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;