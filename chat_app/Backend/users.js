const users = [];
const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  
  const existingUser = users.some(
    (elem) => elem.room === room && elem.name === name
  );
  if (existingUser) return { error: "got error" };
  users.push({ id, name, room });
  const user = { id, name, room };
  console.log("from 1",users);
  return {user};
};

const removeUser = ({ id }) => {
  const idx = users.findIndex((elem) => elem.id === id);
  let user;
  if (idx !== -1) {
     user=users[idx];
    users.splice(idx, 1);
  }
  console.log(user,idx)
  return user
};

const getUser = ({ id }) => {
  console.log("from 3",users,id);
  return users.find((elem) => elem.id === id);
};

const getUserInRoom = (room) => {
  console.log("from 4",users);
  return users.filter((elem) => elem.room === room);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUserInRoom,
};
