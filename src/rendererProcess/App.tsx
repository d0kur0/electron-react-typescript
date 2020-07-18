import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGalleryFetchRequest } from "./redux/gallery/thunks";
import { RootState } from "./redux";

export default function App() {
  const dispath = useDispatch();
  const { ipcRenderer } = window.require("electron");

  useEffect(() => {
    dispath(handleGalleryFetchRequest());
  }, [dispath]);

  const { errors, photos, loading } = useSelector((state: RootState) => state.gallery);

  const donwloadFile = (url: string) => {
    ipcRenderer.send("download-image", { url });
  };

  ipcRenderer.on("download-response", (event, args) => {
    console.log(args);
  });

  const Loader = () => (
    <div className="loading">
      <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
      </svg>
    </div>
  );
  const Error = () => <div className="error">{errors}</div>;
  const Photos = () => (
    <div className="photos">
      {photos.map((photo, index) => (
        <div className="photo" key={index}>
          <span className="photo-id">#{photo.id}</span>
          <div className="photo-title">{photo.title}</div>
          <img className="photo-image" src={photo.thumbnailUrl} alt={photo.title} />
          <button onClick={() => donwloadFile(photo.url)} className="photo-download-button">
            Download
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <section className="gallery">
      <h2>Photo gallery example</h2>
      {loading && <Loader />}
      {errors ? <Error /> : <Photos />}
    </section>
  );
}
