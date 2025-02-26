import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const UsersList = () => {
const [users, setUsers] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const { data, error } = await supabase.from('users').select('\*');
    if (error) console.error('Error fetching data:', error.message);
    else setUsers(data);
  };

  fetchData();
}, []);

return (
  <div>
    <h2>Users</h2>
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  </div>
);

};

export default UsersList;