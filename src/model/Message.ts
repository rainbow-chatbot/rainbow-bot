import {Time} from "./Time";
import {Long} from "node-kakao";

export class Message {
  message: string;
  time: Time;
  senderId: Long;
  
  constructor(message: string, time: Time, senderId: Long) {
    this.message = message;
    this.time = time;
    this.senderId = senderId;
  }
}
