import axios from 'axios';

export async function fetchUsers(limit = 20, offset = 0) {  
  const response = await axios.get(`https://randomuser.me/api/?results=${limit}&page=${offset + 1}`);
  const data = response.data;
  
  let users = data.results || [];
  
  return {
    items: users,
    nextOffset: users.length === limit ? offset + 1 : undefined,
    total: users.length,
  };
}