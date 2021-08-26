import Nedb = require("nedb");
import Message = FeedFragment.Message;
import {Result} from "../../domain/model/common/Result";
import {FeedFragment} from "node-kakao";

export class TestDatabaseViewModel {
  chatDb: Nedb = new Nedb({filename: 'test/database/chat.json', autoload: true});

  findMessagesFromChatDb = async (query: any): Promise<Result<Message[] | null, Error | any | null>> => {
    return new Promise((resolve, reject) => {
      this.chatDb.find(query, (error: Error | null, messages: Message[]) => {
        if (error) {
          reject(new Result(null, error!));
        } else {
          resolve(new Result(messages, null));
        }
      });
    });
  }
}
