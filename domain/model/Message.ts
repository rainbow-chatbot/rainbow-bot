import {Time} from "./Time";
import {ChannelUserInfo, Long, TalkChatData} from "node-kakao";

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

  static parse = (data: TalkChatData, sender: ChannelUserInfo): Message => {
    return new Message(data.text, Time.parse(data.sendAt), sender.userId, data.chat.type);
  }
}
