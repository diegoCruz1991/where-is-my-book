import OpenLibraryClient from "../lib/openLibraryClient";

export default async function getCoverUri(number, size) {
  const libraryClient = new OpenLibraryClient();

  const uri = await libraryClient.getCoverUri(number, size);

  console.info(uri);

  return uri;
} 