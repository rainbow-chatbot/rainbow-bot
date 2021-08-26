import {TestDatabaseViewModel} from "./viewmodel/TestDatabaseViewModel";
import {TestClient} from "./client/TestClient";
import {Message} from "../domain/model/Message";

const dbVm = new TestDatabaseViewModel();

const main = async () => {
  TestClient.postUserChat(Message.create('hi, world!'));
}

main().then();