import {AuthApiClient, TalkClient} from 'node-kakao';
import {Bot} from "./util/Bot";
import {BotData} from "./secret/BotData";
import {DatabaseViewModel} from "./viewmodel/DatabaseViewModel";
import {Time} from "./model/Time";
import {Message} from "./model/Message";

const client = new TalkClient();
const dbVm = DatabaseViewModel.instance();
let messages: Message[] = [];

dbVm.init();

client.on('chat', async (data, channel) => {
  const sender = data.getSenderInfo(channel);
  if (!sender) return;

  const date = new Date();
  const time = new Time(date.getFullYear(), date.getMonth(), date.getDay(), "todo", date.getHours(), date.getMinutes(), date.getSeconds());
  const message = new Message(data.text, time, sender.userId);
  messages.push(message)

  if (data.text === '!test') {
    Bot.replyToChannel(channel, "Hi!")
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