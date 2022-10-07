import axios from "axios";
import { Startup, StartupDTO } from "../../Types/Startup";
import StartupMapper from "./Startup.mapper";

export class StartupHttpService {
  public static async getStartups(): Promise<any> {
    const response = await axios.get<StartupDTO[]>(`/api/startups`, { params: { all: true } });
    return response.data.map(el => StartupMapper.map(el));
  }

  public static async getStartupById(id: string | number): Promise<Startup> {
    const response = await axios.get<StartupDTO>(`/api/startups/${id}`);
    return StartupMapper.map(response.data);
  }
}
