import create from "./CreateAlbum.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateAlbum = ({ onCreate }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/albums', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    })
      .then((response) => response.json())
      .then((newAlbum) => {
        onCreate(newAlbum);
        setTitle('');
        setId('');
        navigate('/');  // Navigate back to the main page after creating the album
      });
  };

  return (
    <>
      <div className={create.container}>
        <div className={create.headContainer}>
          <div className={create.heading}>Create Album</div>
          <div onClick={handleClick} className={create.cross}>&#10005;</div>
        </div>

        <div className={create.inputs}>
          <form onSubmit={handleSubmit}>
            <input placeholder="ID" value={id}
              onChange={(e) => setId(e.target.value)} required />
            <input placeholder="Title" value={title}
              onChange={(e) => setTitle(e.target.value)} type="text" required />
            <button type="submit" className={create.btn}>Create</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateAlbum;
