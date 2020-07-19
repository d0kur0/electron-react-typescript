import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGalleryFetchRequest } from "./redux/gallery/thunks";
import { RootState } from "./redux";

type DownloadQueue = {
  url: string;
  ended: boolean;
  error?: string;
}[];

export default function App() {
  const dispath = useDispatch();
  const { ipcRenderer } = window.require("electron");

  useEffect(() => {
    dispath(handleGalleryFetchRequest());
  }, [dispath]);

  const { errors, photos, loading } = useSelector((state: RootState) => state.gallery);
  const [downloadQueue, setDownloadQueue] = useState<DownloadQueue>([]);

  const downloadFile = (url: string) => {
    ipcRenderer.send("download-image", { url });

    setDownloadQueue(queue =>
      queue.some(item => item.url === url)
        ? queue.map(item => (item.url === url ? { ...item, ended: false } : item))
        : [...queue, { url, ended: false }],
    );
  };

  // TODO: Remove any
  ipcRenderer.on("download-response", (event: any, args: any) => {
    console.log(args);

    setDownloadQueue(queue =>
      queue.map(item => {
        if (item.url === args.url) {
          item = { ...item, ended: true };
          args.error && (item.error = args.error);
        }

        return item;
      }),
    );
  });

  const Loader = () => (
    <svg className="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
    </svg>
  );
  const Error = () => <div className="error">{errors}</div>;
  const Photos = () => (
    <div className="photos">
      {photos.map((photo, index) => {
        const isInQueue = downloadQueue.some(item => item.url === photo.url && !item.ended);

        return (
          <div className="photo" key={index}>
            <span className="photo-id">#{photo.id}</span>
            <div className="photo-title">{photo.title}</div>
            <img className="photo-image" src={photo.thumbnailUrl} alt={photo.title} />
            <button disabled={isInQueue} onClick={() => downloadFile(photo.url)} className="photo-download-button">
              {isInQueue ? <Loader /> : `Download`}
            </button>
          </div>
        );
      })}
    </div>
  );

  return (
    <section className="gallery">
      <h2>Photo gallery example</h2>

      {loading && (
        <div className="loading">
          <Loader />
        </div>
      )}

      {errors ? <Error /> : <Photos />}
    </section>
  );
}
