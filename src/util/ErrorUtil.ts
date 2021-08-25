import {ChatBuilder, DisplayUserInfo, KnownChatType, MentionContent, TalkChannel} from "node-kakao";

export class ErrorUtil {
  private static _instance = new ErrorUtil();

  private mainChannel: TalkChannel | null = null;
  private me: DisplayUserInfo | null = null;

  sendError = (errorMessage: string) => {
    if (this.checkNullable()) {
      this.mainChannel!.sendChat(
        new ChatBuilder()
          .append(new MentionContent(this.me!))
          .text(errorMessage)
          .build(KnownChatType.TEXT)
      ).then();
    }
  }

  static instance = (): ErrorUtil => {
    return ErrorUtil._instance;
  }

  private constructor() {
  }

  private checkNullable = (): Boolean => {
    return this.mainChannel != null && this.me != null
  }
}