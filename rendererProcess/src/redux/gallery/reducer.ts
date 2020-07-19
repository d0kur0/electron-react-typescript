import { GalleryState, GalleryActions } from "./types";
import { GALLERY_FETCH_REQUEST, GALLERY_FETCH_ERROR } from "./constants";

const initialState: GalleryState = {
  photos: [],
  loading: true,
};

export const gallery = (state = initialState, action: GalleryActions): GalleryState => {
  switch (action.type) {
    case GALLERY_FETCH_REQUEST:
      return { ...state, photos: action.payload, loading: false };
    case GALLERY_FETCH_ERROR:
      return { ...state, loading: false, errors: action.payload };
    default:
      return state;
  }
};
