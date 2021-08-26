import axios, {AxiosResponse} from "axios";
import {Message} from "../../domain/model/Message";

export class Client {
  private static BASE_URL = "http://www.daol.xyz"

  // Note.
  // 메시지 개수가 늘어나면, POST 데이터 값이 너무 길어지므로,
  // 여기서 미리 통계 나 만들고, 해당 값으로 POST 보내기.

  static postUserChat = (message: Message) => {
    axios.post(`${Client.BASE_URL}/user-chat`, message)
      .then((response: AxiosResponse) => {
        console.log(response);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }
}