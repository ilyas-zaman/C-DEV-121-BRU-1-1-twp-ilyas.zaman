import axios from "axios";

class OrganService {
  create(name, email, token) {
    var data = new FormData();

    data.append("name", name);
    data.append("email", email);
    data.append("type", "Developers");

    return axios.post(
      "https://api.dev.gameadsstudio.com/v1/organizations",
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  fetchAll(token) {
    return axios.get("https://api.dev.gameadsstudio.com/v1/organizations", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new OrganService();
