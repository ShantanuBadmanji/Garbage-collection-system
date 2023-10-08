function createURIQuery(url, queryObj) {
  let query = [];
  for (const key in queryObj) {
    Object.hasOwnProperty.call(queryObj, key) &&
      query.push(
        encodeURIComponent(key) + "=" + encodeURIComponent(queryObj[key])
      );
  }
  return url + "?" + query.join("&");
}

export { createURIQuery };
