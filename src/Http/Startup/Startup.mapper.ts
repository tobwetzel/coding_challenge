import { Startup, StartupDTO } from "../../Types/Startup";

export default class StartupMapper {
  public static map(startup: StartupDTO): Startup {
    return {
      ...startup,
      dateCreated: new Date(startup.dateCreated),
      dateFounded: new Date(startup.dateFounded),
    };
  }
  public static mapList(startups: StartupDTO[]): Startup[] {
    return startups.map(startup=>({
      ...startup,
      dateCreated: new Date(startup.dateCreated),
      dateFounded: new Date(startup.dateFounded),
    }));
  }
}
