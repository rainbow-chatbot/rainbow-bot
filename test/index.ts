import {Chat} from "../domain/model/Chat";
import {Client} from "../data/client/Client";

const main = async () => {
  console.log(await Client.postUserChat(Chat.create('hi, world!')));
}

main().then();