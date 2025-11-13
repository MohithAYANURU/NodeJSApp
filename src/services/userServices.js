let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Dave" },
];

export const getAllUsers = () => users;
export const getUserById = (id) => users.find(user => user.id === parseInt(id));
export const createUser = (userData) => {
  const newUser = { id: users.length + 1, name: userData.name };
  users.push(newUser);
  return newUser;
};
export const updateUser = (id, userData) => {
  const index = users.findIndex(u => u.id === parseInt(id));
  if (index === -1) return null;
  users[index] = { ...users[index], ...userData };
  return users[index];
};
export const deleteUser = (id) => {
  const index = users.findIndex(u => u.id === parseInt(id));
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
};
