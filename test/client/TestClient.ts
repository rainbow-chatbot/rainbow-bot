import axios, {AxiosResponse} from "axios";
import {Chat} from "../../domain/model/Chat";
import {Result} from "../../domain/model/common/Result";

export class TestClient {
  private static BASE_URL = "http://www.daol.xyz"

  static postUserChat = (chat: Chat): Promise<Result<string | null, Error | null>> => {
    return new Promise((resolve, reject) => {
      axios.post(`${TestClient.BASE_URL}/user-chat`, chat)
        .then((response: AxiosResponse) => {
          resolve(new Result(response.data.toString(), null));
        })
        .catch((error: Error) => {
          reject(new Result(null, error));
        });
    });
  }
}