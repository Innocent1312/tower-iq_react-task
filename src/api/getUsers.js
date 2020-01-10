const URL = '/users.json';

const getUsers = async () => {
  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error(`Something went wrong`)
  }

  return response.json();
};

export default getUsers;