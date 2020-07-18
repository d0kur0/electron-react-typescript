import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { GALLERY_FETCH_REQUEST, GALLERY_FETCH_ERROR } from "./constants";

export type GalleryPhoto = {
  id: number;
  url: string;
  title: string;
  thumbnailUrl: string;
};

export type GalleryPhotos = GalleryPhoto[];
export type GalleryState = {
  readonly photos: GalleryPhotos;
  readonly loading: boolean;
  readonly errors?: string;
};

export type GalleryFetchRequestPayload = GalleryPhotos;
export type GalleryFetchRequestAction = {
  type: typeof GALLERY_FETCH_REQUEST;
  payload: GalleryFetchRequestPayload;
};

export type GalleryFetchErrorPayload = string;
export type GalleryFetchErrorAction = {
  type: typeof GALLERY_FETCH_ERROR;
  payload: GalleryFetchErrorPayload;
};

export type GalleryThunk = ThunkAction<Promise<void>, RootState, unknown, GalleryActions>;
export type GalleryActions = GalleryFetchRequestAction | GalleryFetchErrorAction;
