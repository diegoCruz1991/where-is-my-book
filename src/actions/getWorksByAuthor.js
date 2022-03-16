import OpenLibraryClient from "../lib/openLibraryClient";

const FIRST_PAGE = 1;

export default async function getWorksByAuthor(authorKey, page) {
  const libraryClient = new OpenLibraryClient();

  let activePage = FIRST_PAGE;

  if (page && page > 1) {
    activePage = page;
  }

  const authorWorks = await libraryClient.request(
    "authorWorks",
    authorKey,
    activePage
  );

  console.info(authorWorks);

  return authorWorks;
}
