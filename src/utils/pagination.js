export const calculateOffset = (pageNumber, pageSize) => {
  if (pageNumber > 1) {
    return pageSize * pageNumber - 1;
  }

  return 0;
};