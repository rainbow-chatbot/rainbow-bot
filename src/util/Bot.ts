import {ChatBuilder, KnownChatType, TalkChannel} from "node-kakao";

export class Bot {
  static replyToChannel = (channel: TalkChannel, text: string) => {
    channel.sendChat(
      new ChatBuilder()
        .text(text)
        .build(KnownChatType.TEXT)
    ).then();
  }
}