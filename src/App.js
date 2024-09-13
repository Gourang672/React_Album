import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateAlbum from './createAlbum/CreateAlbum';
import Main from "./main/Main.js";
import UpdateAlbum from './updateAlbum/UpdateAlbum.js';
import { useState } from 'react';

function App() {
  const [albums, setAlbums] = useState([]);

  const handleCreate = (newAlbum) => {
    setAlbums([...albums, newAlbum]);
  };

  const handleUpdate = (updatedAlbum) => {
    setAlbums(albums.map(album => (album.id === updatedAlbum.id ? updatedAlbum : album)));
  };

  const router = createBrowserRouter([
    { path: '/', element: <Main albums={albums} setAlbums={setAlbums} /> },
    { path: '/CreateAlbum', element: <CreateAlbum onCreate={handleCreate} /> },
    { path: '/UpdateAlbum/:id', element: <UpdateAlbum onUpdate={handleUpdate} /> },  // Pass handleUpdate to UpdateAlbum
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
