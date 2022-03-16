export const queryTypes = (type) => {
  const types = {
    authors: {
      type: 'authors.json',
      path: '/search',
      requestType: 'search'
    },
    authorWorks: {
      type: 'works.json',
      path: '/authors/:key',
      requestType: 'get'
    },
    works: {
      path: ':key',
      requestType: 'get'
    }
  }

  if (types[type]) {
    return types[type];
  } else {
    throw Error(`No type ${type} found.`);
  }
};