import { GALLERY_FETCH_REQUEST, GALLERY_FETCH_ERROR } from "./constants";
import {
  GalleryFetchRequestPayload,
  GalleryFetchRequestAction,
  GalleryFetchErrorPayload,
  GalleryFetchErrorAction,
} from "./types";

export function galleryFetchRequest(payload: GalleryFetchRequestPayload): GalleryFetchRequestAction {
  return {
    type: GALLERY_FETCH_REQUEST,
    payload,
  };
}

export function galleryFetchError(payload: GalleryFetchErrorPayload): GalleryFetchErrorAction {
  return {
    type: GALLERY_FETCH_ERROR,
    payload,
  };
}
