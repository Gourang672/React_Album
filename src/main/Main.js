import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';

function Main({ albums, setAlbums }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch albums only if they are not already loaded
    if (albums.length === 0) {
      fetch("https://jsonplaceholder.typicode.com/albums")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Wrong connection");
          }
          return response.json();
        })
        .then((data) => {
          setAlbums(data); // Set albums data
          setLoading(false); // Stop loading
        })
        .catch((error) => {
          setError(error); // Set error if something goes wrong
          setLoading(false);
        });
    } else {
      setLoading(false); // If albums already loaded, stop loading
    }
  }, [albums, setAlbums]);

  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Update the state to remove the deleted album
          setAlbums(albums.filter(album => album.id !== id));
        } else {
          throw new Error("Error deleting the album");
        }
      })
      .catch((error) => {
        setError(error); // Handle error on delete
      });
  };

  const navigate = useNavigate();

  const handleUpdate = (id) => {
    // Navigate to the UpdateAlbum page with the album ID
    navigate(`/UpdateAlbum/${id}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {albums.map((album) => (
          <div className={styles.card} key={album.id}>
            <div><h3>ID: {album.id} {album.title}</h3></div>
            <div className={styles.req}>
              <button onClick={() => handleUpdate(album.id)} className={styles.update}>Update</button>
              <button onClick={() => handleDelete(album.id)} className={styles.delete}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Main;
