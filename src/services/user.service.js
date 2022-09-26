import axios from "axios";

class UserService {
  getUserByToken(token) {
    return axios.get("https://api.dev.gameadsstudio.com/v1/users/self", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  editUser(username, firstname, lastname, email, type, password, id, token) {
    let data = new FormData();
    data.append("username", username);
    data.append("firstname", firstname);
    data.append("lastname", lastname);
    data.append("email", email);
    data.append("type", type);
    data.append("password", password);

    return axios.patch(
      `https://api.dev.gameadsstudio.com/v1/users/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  deleteMyself(id, token) {
    return axios.delete(
      `https://api.dev.gameadsstudio.com/v1/users/${id}`,

      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  fetchAll(token) {
    return axios.get(
      "https://api.dev.gameadsstudio.com/v1/users/",

      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}

export default new UserService();
