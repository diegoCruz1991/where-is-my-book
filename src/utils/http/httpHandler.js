export const processResponse = (response) => {
  if (response.status !== 200) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  } else {
    return response.data;
  }
};

export const formUriBase = (url, requestObj, value) => {
  let uri = '';

  if (requestObj.requestType === 'search') {
    uri = `${url}${requestObj.path}/${requestObj.type}?q=${value}`;
  } else if (requestObj.requestType === 'get') {
    const newPath = requestObj.path.replace(/:key/, value);

    if (requestObj.type) {
      uri = `${url}${newPath}/${requestObj.type}?`;
    } else {
      uri = `${url}${newPath}.json`;
    }
  }

  return uri;
}