import { Session, SessionType } from "../../../server/schema/Session";
import speaker from "../../people/sia-karamalegos";

const talk: Session = {
  people: [speaker],
  title: "Mysterious talk",
  description: ``,
  type: SessionType.TALK,
  keywords: [],
};

export default talk;
