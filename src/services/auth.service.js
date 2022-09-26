import axios from "axios";

class AuthService {
  async login(identifier, password) {
    var data = new FormData();

    data.append("identifier", identifier);
    data.append("password", password);
    const response = await axios.post(
      "https://api.dev.gameadsstudio.com/v1/users/login",
      data
    );
    if (response.data.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data.data.token));
      document.cookie = "username=TEST";
    }

    return response.data.data.token;
  }

  logout() {
    localStorage.removeItem("user");
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  }

  register(username, firstname, lastname, email, password) {
    var data = new FormData();

    data.append("username", username);
    data.append("firstname", firstname);
    data.append("lastname", lastname);
    data.append("type", "advertiser");
    data.append("email", email);
    data.append("password", password);

    return axios.post("https://api.dev.gameadsstudio.com/v1/users", data);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
