import { useEffect, useState } from "react";
import type DevelopmentTeam from "../../models/DevelopmentTeam";
import type Meeting from "../../models/Meeting";

import { getDevelopmentTeams } from "../../services/development-teams";
import { deleteMeeting, getMeetingsByTeam } from "../../services/meetings";

function getDuration(startDateTime: string, endDateTime: string): string {
    const start = new Date(startDateTime)
    const end = new Date(endDateTime)

    const diffMs = end.getTime() - start.getTime()
    const totalMinutes = Math.floor(diffMs / 60000)

    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    return `${hours}h ${minutes}m`
}

function formatDateTime(dateTime: string): string {
    return new Date(dateTime).toLocaleString("he-IL", {
        dateStyle: "short",
        timeStyle: "short"
    })
}

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

            <h1>Meetings</h1>

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
                    <div key={meeting.id}>

                        <h3>{meeting.description}</h3>

                        <p>Room: {meeting.roomName}</p>
                        <p>Start: {formatDateTime(meeting.startDateTime)}</p>
                        <p>End: {formatDateTime(meeting.endDateTime)}</p>

                        <p>
                            Duration: {getDuration(
                                meeting.startDateTime,
                                meeting.endDateTime
                            )}
                        </p>

                        <button onClick={() => handleDelete(meeting.id)}>
                            Delete
                        </button>

                    </div>
                ))
            }

        </div>
    )
}