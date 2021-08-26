import axios, {AxiosResponse} from "axios";
import {Message} from "../../domain/model/Message";

export class Client {
  private static BASE_URL = "http://www.daol.xyz"

  static postUserChatList = (messages: Message[]) => {
    axios.post(`${Client.BASE_URL}/user-chat-list`, {
      messages: messages
    })
      .then((response: AxiosResponse) => {
        console.log(response);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }
}