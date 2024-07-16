import Cookies from "js-cookie";
import { BASE_URL } from "@/url";

const getToken = () => Cookies.get("token");

export function getUserFavoriteProducts(userId) {
  return fetch(`${BASE_URL}/users/${userId}/favorite-products`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((res) => res.json());
}
