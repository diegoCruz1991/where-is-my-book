import OpenLibraryClient from "../lib/openLibraryClient";

const FIRST_PAGE = 1;

export default async function getAuthors(author, page) {
  const libraryClient = new OpenLibraryClient();

  let activePage = FIRST_PAGE;

  if (page && page > 1) {
    activePage = page
  }

  const authors = await libraryClient.request('authors', author, activePage);

  console.info(authors);

  return authors;
} 