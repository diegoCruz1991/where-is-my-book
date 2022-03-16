import OpenLibraryClient from "../lib/openLibraryClient";

export default async function getWorkDetails(workKey) {
  const libraryClient = new OpenLibraryClient();

  const work = await libraryClient.request('works', workKey);

  if (work.covers) { 
    work.covers = work.covers.map( cover => {
      return libraryClient.getCoverUri(cover, 'L');
    });
  } 

  console.info(work);

  return work;
} 