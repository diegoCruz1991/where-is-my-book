import axios from "axios";
import { formUriBase, processResponse } from "../utils/http/httpHandler";
import { calculateOffset } from "../utils/pagination";
import { queryTypes } from "./queryTypes";

const PAGE_SIZE = process.env.REACT_APP_PAGE_SIZE;
const COVERS = "https://covers.openlibrary.org/b/id/:number-:size.jpg";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
};

class OpenLibraryClient {
  constructor() {
    this.url = process.env.REACT_APP_OPEN_LIBRARY_URL;

    if (typeof OpenLibraryClient.instance === "object") {
      return OpenLibraryClient.instance;
    }

    OpenLibraryClient.instance = this;

    this.request = this.request.bind(this);

    return this;
  }

  async request(type, value, pageNumber) {
    let offset = -1;

    if (pageNumber) {
      offset = calculateOffset(pageNumber, PAGE_SIZE);
    }

    const requestObj = queryTypes(type);

    let uriBase = formUriBase(this.url, requestObj, value);

    if (offset > -1) {
      uriBase = uriBase + `&offset=${offset}&limit=${PAGE_SIZE}`;
    }

    try {
      const response = await axios.get(encodeURI(uriBase), headers);

      return processResponse(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getCoverUri(number, size) {
    return COVERS.replace(/:number/, number).replace(/size/, size);
  }
}

export default OpenLibraryClient;
