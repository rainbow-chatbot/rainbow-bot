import axios, {AxiosResponse} from "axios";
import {Message} from "../../domain/model/Message";

export class TestClient {
  private static BASE_URL = "http://www.daol.xyz"

  static postUserChat = (message: Message) => {
    axios.post(`${TestClient.BASE_URL}/user-chat`, message)
      .then((response: AxiosResponse) => {
        console.log(response);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }
}