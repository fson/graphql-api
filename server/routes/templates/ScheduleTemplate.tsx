import styled from "@emotion/styled";
import { Color } from "csstype";
import hexToRgba from "hex-to-rgba";
import desaturate from "polished/lib/color/desaturate";
import * as React from "react";
import { Schedule as ISchedule } from "../../schema/Schedule";
import { Theme } from "../../schema/Theme";
import connected from "../components/connected";
import Schedule from "../components/Schedule";
import Sponsors from "../components/Sponsors";
// import { dayToFinnishLocale } from "../date-utils";
// import scheduleQuery from "../queries/scheduleQuery";
// import sponsorQuery from "../queries/sponsorQuery";
interface SchedulePageContainerProps {
  id: string;
  primaryColor: Color;
  secondaryColor: Color;
  texture: string;
}

const ScheduleTemplateContainer = styled.article`
  display: grid;
  background-image: ${({
    primaryColor,
    secondaryColor,
    texture,
  }: SchedulePageContainerProps) => `linear-gradient(
      ${primaryColor},
      ${desaturate(0.8, hexToRgba(secondaryColor, 0.79))}
    ),
    url("${texture}")`};
  background-size: cover;
  position: relative;
  padding: 0;
  width: 28.8cm;
  height: 20.4cm;
  overflow: hidden;
` as React.FC<SchedulePageContainerProps>;

const ScheduleTemplateLogo = styled.img`
  position: relative;
  margin: 0.25cm 0.9cm 0cm;
  width: 5cm;
`;

const ScheduleHeaderContainer = styled.section``;

const ScheduleTemplateTitle = styled.h1`
  color: white;
  position: absolute;
  right: 1.2cm;
  top: 0cm;
  font-size: 420%;
  margin-top: 0.25cm;
`;

const ScheduleContentContainer = styled.div`
  position: relative;
  margin: 0;
  margin-top: -0.2cm;
  margin-left: 0.5cm;
  margin-right: 0.5cm;
  padding: 0.25cm;
  background-color: white;
  height: 12.8cm;
  clip-path: polygon(0 0, 100% 1cm, 100% 100%, 0 calc(100% - 1cm));
  z-index: 1;
`;

// TODO: Add context (needed for introspection)
interface ScheduleTemplateProps {
  theme: Theme;
  schedule: {
    day: ISchedule["day"];
  };
  conferenceId: string; // TODO: Likely this should be removed (contained in a query)
  id: string;
}

const ScheduleFooterContainer = styled.section`
  margin-top: -0.5cm;
`;

const ConnectedSponsors = connected(Sponsors);

// conferenceId -> intervals
// pass theme through
const ConnectedSchedule = connected(Schedule);

// TODO: 1. Refactor to ConnectedSchedule and remove intervals from direct data deps
// TODO: 2. Use connected for Schedule as well
function ScheduleTemplate({
  theme,
  // TODO: Drop defaults from here
  schedule: { day } = {
    day: "",
  },
  conferenceId = "",
  id,
}: ScheduleTemplateProps) {
  return (
    <ScheduleTemplateContainer
      id={id}
      primaryColor={theme.colors.primary}
      secondaryColor={theme.colors.secondary}
      texture={theme.textures[0].url}
    >
      <ScheduleHeaderContainer>
        <ScheduleTemplateLogo src={theme.logos.white.withText.url} />
        <ScheduleTemplateTitle>
          Schedule{day ? ` ― ${day}` : ""}
        </ScheduleTemplateTitle>
      </ScheduleHeaderContainer>
      <ScheduleContentContainer>
        <ConnectedSchedule
          conferenceId={conferenceId}
          theme={theme}
          day={day}
        />
      </ScheduleContentContainer>
      <ScheduleFooterContainer>
        <ConnectedSponsors conferenceId={conferenceId} />
      </ScheduleFooterContainer>
    </ScheduleTemplateContainer>
  );
}

// TODO: Eliminate this hint. Now just for testing connector
ScheduleTemplate.connect = true;

export default ScheduleTemplate;

/*
export default connected(ScheduleTemplate)

Push theme to React context or just pass through like id?

{
  theme,
  context: {
    conferenceId,
    day,
  },
  schedule: {
    intervals,
    day,
    conferenceId,
    id
  }
}
*/

/*
const ConnectedScheduleTemplate = connect(
  "/graphql",
  scheduleQuery,
  {},
  ({ conferenceId, day }) => ({ conferenceId, day })
)(({ schedule, theme, conferenceId, id }) => (
  <ScheduleTemplate
    id={id}
    schedule={{
      intervals: get(schedule, "intervals"),
      theme,
      day: dayToFinnishLocale(get(schedule, "day")),
      conferenceId,
    }}
    theme={theme}
  />
));

ConnectedScheduleTemplate.filename = "schedule";

// TODO: Better use enums here
ConnectedScheduleTemplate.variables = [
  {
    id: "conferenceId",
    query: `query ConferenceIdQuery {  
  conferences {
    id
    name
  }
}`,
    mapToCollection({ conferences }) {
      return conferences;
    },
    mapToOption({ id, name }) {
      return {
        value: id,
        label: name,
      };
    },
  },
  {
    id: "day",
    query: `query DayQuery($conferenceId: ID!) {
  conference(id: $conferenceId) {
    schedules {
      day
    }
  }
}`,
    mapToCollection({ conference }) {
      return get(conference, "schedules", []);
    },
    mapToOption({ day }) {
      return {
        value: day,
        label: day,
      };
    },
  },
];

export default ConnectedScheduleTemplate;
*/
