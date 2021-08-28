import axios, {AxiosResponse} from "axios";
import {Chat} from "../../domain/model/Chat";
import {Result} from "../../domain/model/common/Result";
import {Exception} from "../../domain/model/common/Exception";

export class Client {
  private static BASE_URL = "http://www.daol.xyz"

  // Note.
  // 메시지 개수가 늘어나면, POST 데이터 값이 너무 길어지므로,
  // 여기서 미리 통계 나 만들고, 해당 값으로 POST 보내기.

  static postUserChat = (chat: Chat): Promise<Result<string>> => {
    return new Promise((resolve, reject) => {
      axios.post(`${Client.BASE_URL}/user-chat`, chat)
        .then((response: AxiosResponse) => {
          resolve(Result.success(response.data.toString()));
        })
        .catch((error: Error) => {
          reject(Result.fail(new Exception(error.message)));
        });
    });
  }
}