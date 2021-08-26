import axios, {AxiosResponse} from "axios";

export class TestClient {
  private static BASE_URL = "http://www.daol.xyz"

  static postUserChatList = (value: any) => {
    axios.post(`${TestClient.BASE_URL}/user-chat-list`, {
      messages: value
    })
      .then((response: AxiosResponse) => {
        console.log(response);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }
}