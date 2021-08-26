import {Message} from "../../domain/model/Message";
import {ErrorUtil} from "../util/ErrorUtil";
import {Result} from "../../domain/model/common/Result";
import Nedb = require("nedb");

export class DatabaseViewModel {
  private static _instance = new DatabaseViewModel();

  chatDb: Nedb = new Nedb({filename: 'presentation/database/chat.json', autoload: true});

  updateChatDb = (messages: Message[]) => {
    this.chatDb.insert(messages, this.errorHandler);
  }

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

  init = () => {
    this.chatDb.persistence.setAutocompactionInterval(1000 * 60 * 10); // 10분마다 데이터베이스 정리
  }

  private errorHandler = (error: Error | null, _: any) => {
    if (error) {
      ErrorUtil.instance().sendError(error!.message)
    }
  }

  private constructor() {
  }

  static instance = (): DatabaseViewModel => {
    return DatabaseViewModel._instance;
  }
}