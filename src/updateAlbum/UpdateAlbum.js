import update from "./UpdateAlbum.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateAlbum = ({ onUpdate }) => {
  const navigate = useNavigate();
  const { id } = useParams();  // Get the album ID from the URL
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState(null);

  // Fetch the album's current details when the component mounts
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Album not found");
        }
        return response.json();
      })
      .then(album => {
        setTitle(album.title);
        setUserId(album.userId);
      })
      .catch(error => {
        setError(error.message);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, userId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update album");
        }
        return response.json();
      })
      .then((updatedAlbum) => {
        onUpdate(updatedAlbum);  // Call the onUpdate function passed as a prop to update the album list in the parent
        navigate("/");  // Redirect back to the main page
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleClick = () => {
    navigate("/");
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className={update.container}>
        <div className={update.headContainer}>
          <div className={update.heading}>Update Album</div>
          <div onClick={handleClick} className={update.cross}>&#10005;</div>
        </div>

        <div className={update.inputs}>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="UserID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <button type="submit" className={update.btn}>Update</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateAlbum;
