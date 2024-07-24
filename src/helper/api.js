const API_URL = "https://6681970504acc3545a071b17.mockapi.io/api/v1";

//GETALLUSER
const getAllUSer = async () => {
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) throw new Error("Something went wrong");
  const data = await res.json();
  return data;
};

//GETUSERBYID
const getUser = async (id) => {
  const res = await fetch(`${API_URL}/users/${id}`);
  if (!res.ok) throw new Error("Something went wrong");
  const data = await res.json();
  return data;
};


//CREATE USER
const createUser = async (user) => {
  const res = await fetch(`${API_URL}/users`, {
    method: "post",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Başarısız kayıt işlemi");
  const data = await res.json();
  return data;
};
//UPDATE USER
const updateUser = async (id, user) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "put",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Something went wrong");
  const data = await res.json();
  return data;
};


//DELETEUSER
const deleteUser = async (id) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error("Something went wrong");
  return res.status === 204; // 204 No Content means the deletion was successful
};
export { createUser, getUser, getAllUSer,updateUser,deleteUser };
