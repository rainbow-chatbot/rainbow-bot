import {Message} from "../model/Message";
import {ErrorUtil} from "../util/ErrorUtil";
import Nedb = require("nedb");

export class DatabaseViewModel {
  private static _instance = new DatabaseViewModel();

  chatDb: Nedb = new Nedb({filename: 'src/database/chat.json', autoload: true});

  updateChatDb = (messages: Message[]) => {
    this.chatDb.insert(messages, (error: Error | null, _: Message[]) => {
      if (error == null) {
        ErrorUtil.instance().sendError(error!.message)
      }
    });
  }

  init = () => {
    this.chatDb.persistence.setAutocompactionInterval(1000 * 60 * 10); // 10분마다 데이터베이스 정리
  }

  private constructor() {
  }

  static instance = (): DatabaseViewModel => {
    return DatabaseViewModel._instance;
  }
}