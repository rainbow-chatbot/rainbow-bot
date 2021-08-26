import {TestDatabaseViewModel} from "./viewmodel/TestDatabaseViewModel";
import {TestClient} from "./client/TestClient";

const dbVm = new TestDatabaseViewModel();

const main = async () => {
  TestClient.postUserChatList('hello world!');
}

main().then();