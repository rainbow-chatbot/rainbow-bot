import {Time} from "./Time";
import {ChannelUserInfo, Long, TalkChatData} from "node-kakao";
import {ChatType} from "./common/ChatType";

export class Message {
  message: string;
  time: Time;
  senderId: Long;
  type: number;

  constructor(message: string, time: Time, senderId: Long, type: number) {
    this.message = message;
    this.time = time;
    this.senderId = senderId;
    this.type = type;
  }

  static create = (message: string): Message => {
    return new Message(message, Time.parse(new Date()), Long.fromString("1234"), ChatType.TEXT);
  }

  static parse = (data: TalkChatData, sender: ChannelUserInfo): Message => {
    return new Message(data.text, Time.parse(data.sendAt), sender.userId, data.chat.type);
  }
}
