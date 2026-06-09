import axios from "axios";
import type DevelopmentTeam from "../models/DevelopmentTeam";

const baseUrl = import.meta.env.VITE_REST_SERVER_URL;

export async function getDevelopmentTeams(): Promise<DevelopmentTeam[]> {
    const response = await axios.get<DevelopmentTeam[]>(`${baseUrl}/development-teams`);
    return response.data;
}