import {AuthApiClient, Long, TalkClient} from 'node-kakao';
import {Bot} from "./util/Bot";
import {BotData} from "./secret/BotData";
import {DatabaseViewModel} from "./viewmodel/DatabaseViewModel";
import {Time} from "./model/Time";
import {Message} from "./model/Message";
import {ErrorUtil} from "./util/ErrorUtil";

const client = new TalkClient();
const dbVm = DatabaseViewModel.instance();
const MANAGER_CHANNEL_ID = Long.fromString("302081716053163");
const MANAGER_USER_ID = Long.fromString("361584376");

let messages: Message[] = [];
let errorUtilInit = false;

dbVm.init();

client.on('chat', async (data, channel) => {
  const sender = data.getSenderInfo(channel);
  if (!sender) return;

  const date = new Date();
  const time = new Time(date.getFullYear(), date.getMonth(), date.getDay(), "todo", date.getHours(), date.getMinutes(), date.getSeconds());
  const message = new Message(data.text, time, sender.userId);
  messages.push(message);

  if (channel.channelId == MANAGER_CHANNEL_ID && sender.userId == MANAGER_USER_ID && !errorUtilInit) {
    ErrorUtil.instance().init(channel, sender);
    errorUtilInit = true;
    Bot.replyToChannel(channel, 'ErrorUtil 정보 등록 완료')
  }

  if (data.text === '!test') {
    Bot.replyToChannel(channel, 'Hi!')
  }

  if (data.text === '!db압축') {
    dbVm.chatDb.persistence.compactDatafile();
    Bot.replyToChannel(channel, 'DB 압축 완료');
  }

  if (data.text === '!db업데이트') {
    dbVm.updateChatDb(messages);
    Bot.replyToChannel(channel, 'DB 업데이트 완료');
    messages = [];
  }

  if (data.text === '!debug') {
    const debugContent = `
      channel.channelId: ${channel.channelId}
      sender.userId: ${sender.userId}
    `
    console.log(channel, data, sender);
    Bot.replyToChannel(channel, debugContent);
  }

  if (data.text === '!내메시지') {
    const messages = await dbVm.findMessagesFromChatDb({senderId: sender.userId}).then();
    if (messages.fail) {
      Bot.replyToChannel(channel, `메시지 조회 실패\n\n${messages.fail.message}`)
    } else {
      Bot.replyToChannel(channel, `내 메시지\n\n${messages.success!.map((message) => message.toString()).join("\n")}`)
    }
  }
});

const login = async () => {
  const api = await AuthApiClient.create(BotData.NAME, BotData.UUID);
  const loginRes = await api.login({
    email: BotData.EMAIL,
    password: BotData.PASSWORD,
    forced: true,
  });
  if (!loginRes.success) throw new Error(`Web login failed with status: ${loginRes.status}`);

  console.log(`Received access token: ${loginRes.result.accessToken}`);

  const res = await client.login(loginRes.result);
  if (!res.success) throw new Error(`Login failed with status: ${res.status}`);

  console.log('Login success');
}

login().then();