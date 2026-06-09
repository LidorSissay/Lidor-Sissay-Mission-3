import { useEffect, useState } from "react";
import type DevelopmentTeam from "../../models/DevelopmentTeam";
import type Meeting from "../../models/Meeting";

import { getDevelopmentTeams } from "../../services/development-teams";
import { deleteMeeting, getMeetingsByTeam } from "../../services/meetings";
import MeetingCard from "../meeting-card/MeetingCard";

import "./Meetings.css";

export default function Meetings() {

    const [teams, setTeams] = useState<DevelopmentTeam[]>([])
    const [meetings, setMeetings] = useState<Meeting[]>([])
    const [selectedTeamId, setSelectedTeamId] = useState<string>("")

    useEffect(() => {
        getDevelopmentTeams()
            .then(setTeams)
            .catch(console.error)
    }, [])

    async function handleTeamChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const teamId = event.target.value

        setSelectedTeamId(teamId)

        const meetings = await getMeetingsByTeam(teamId)
        setMeetings(meetings)
    }

    async function handleDelete(meetingId: string) {
        const isConfirmed = confirm(
            "Are you sure you want to delete this meeting?"
        )

        if (!isConfirmed) return

        await deleteMeeting(meetingId)

        const meetings = await getMeetingsByTeam(selectedTeamId)
        setMeetings(meetings)
    }

    return (
        <div className="Meetings">

            <h2>Meetings</h2>

            <select value={selectedTeamId} onChange={handleTeamChange}>
                <option value="" disabled>
                    Select Team
                </option>

                {
                    teams.map(team => (
                        <option key={team.id} value={team.id}>
                            {team.name}
                        </option>
                    ))
                }
            </select>

            <hr />

            {
                meetings.map(meeting => (
                    <MeetingCard
                        key={meeting.id}
                        meeting={meeting}
                        onDelete={handleDelete}
                    />
                ))
            }

        </div>
    )
}