import { FetchPhotosResponse } from "./types";

export async function fetchPhotos(): Promise<FetchPhotosResponse> {
  const request = await fetch("https://jsonplaceholder.typicode.com/albums/1/photos");

  if (request.status !== 200) {
    throw Error("Ошибка загрузки фотографий");
  }

  const jsonResponse = await request.json();
  if (!jsonResponse.length) {
    throw Error("Ошибка, пустой ответ сервера");
  }

  return jsonResponse;
}
