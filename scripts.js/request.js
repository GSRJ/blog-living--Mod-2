const baseUrl = "https://m2-api-living.herokuapp.com/news";

export const getBlog = async (currentPage) => {
  if (currentPage === undefined) {
    currentPage = 0;
  } else if (currentPage > 3) {
    currentPage = 3;
  }
  const response = await fetch(`${baseUrl}?page=${currentPage}`);

  const responseJson = await response.json();

  return responseJson;
};

export const getBlogById = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`);

  const responseJson = await response.json();

  return responseJson;
};
