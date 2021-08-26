import {TestDatabaseViewModel} from "./viewmodel/TestDatabaseViewModel";
import {TestClient} from "./client/TestClient";
import {Chat} from "../domain/model/Chat";

const dbVm = new TestDatabaseViewModel();

const main = async () => {
  console.log(await TestClient.postUserChat(Chat.create('hi, world!')).then());
}

main().then();