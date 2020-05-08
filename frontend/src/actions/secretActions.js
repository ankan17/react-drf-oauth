import { FETCH_SECRETS } from "./constants";
import { URL } from "../config";

export const fetchSecrets = () => async dispatch => {
  let token = localStorage.getItem("GOOGLE_ACCESS_TOKEN");
  try {
    if (token) {
      let response = await fetch(`${URL}/secret/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      let responseJson = await response.json();
      let status = await response.status;
      if (status !== 200) {
        console.log(responseJson);
      } else {
        return dispatch({
          type: FETCH_SECRETS,
          payload: responseJson
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
