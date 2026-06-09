import axios from "axios";
import type DevelopmentTeam from "../models/DevelopmentTeam";

const baseUrl = "http://localhost:3000/development-teams";

export async function getDevelopmentTeams(): Promise<DevelopmentTeam[]> {
    const response = await axios.get<DevelopmentTeam[]>(baseUrl);
    return response.data;
}