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

const promiseAll = () => {
  const result = Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])
  .then((response) => {
    return response
  })
  return result
}

const postData = (data) => {
  return fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((response) => promiseAll())
    .catch((error) => alert(error));
};

export { postData, promiseAll}