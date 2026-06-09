import axios from "axios";
import type Meeting from "../models/Meeting";

const baseUrl = "http://localhost:3000/meetings";

export async function getMeetingsByTeam(teamId: string): Promise<Meeting[]> {
    const response = await axios.get<Meeting[]>(`${baseUrl}/team/${teamId}`);
    return response.data;
}

export async function getMeeting(meetingId: string): Promise<Meeting> {
    const response = await axios.get<Meeting>(`${baseUrl}/${meetingId}`);
    return response.data;
}

export async function addMeeting(meeting: Omit<Meeting, "id">): Promise<Meeting> {
    const response = await axios.post<Meeting>(baseUrl, meeting);
    return response.data;
}

export async function updateMeeting(meetingId: string, meeting: Omit<Meeting, "id">): Promise<Meeting> {
    const response = await axios.patch<Meeting>(`${baseUrl}/${meetingId}`, meeting);
    return response.data;
}

export async function deleteMeeting(meetingId: string): Promise<void> {
    await axios.delete(`${baseUrl}/${meetingId}`);
}