import { GalleryThunk, GalleryPhotos } from "./types";
import { fetchPhotos } from "../../api/gallery/methods";
import { galleryFetchRequest, galleryFetchError } from "./actions";

export function handleGalleryFetchRequest(): GalleryThunk {
  return async dispath => {
    try {
      const photos: GalleryPhotos = await fetchPhotos();
      dispath(galleryFetchRequest(photos));
    } catch (error) {
      dispath(galleryFetchError(error.message));
    }
  };
}
