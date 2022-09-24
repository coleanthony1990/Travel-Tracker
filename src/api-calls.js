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

export default  fetchData 