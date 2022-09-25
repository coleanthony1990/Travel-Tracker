const fetchData = (fileName) => {
  return fetch(`http://localhost:3001/api/v1/${fileName}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) =>
      console.log(
        'There was a problem loading your data. Please try again.',
        error
      )
    );
};

const postData = (url, newData) => {
  const requestData = {
    method: 'POST',
    body: JSON.stringify(newData),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  fetch(url, requestData)
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert(data.message);
      } else {
        return data;
      }
    })
    .catch((error) => alert(error));
};

export { fetchData, postData }