import { Session } from "../../../server/schema/Session";
import { SessionType } from "../../../server/schema/types";
import speaker from "../../people/tomas-konrady";

const talk: Session = {
  people: [speaker],
  title: "",
  description: ``,
  type: SessionType.TALK,
  keywords: [],
};

export default talk;
