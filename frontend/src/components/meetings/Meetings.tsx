import { useEffect, useState } from "react";
import type DevelopmentTeam from "../../models/DevelopmentTeam";
import type Meeting from "../../models/Meeting";

import { getDevelopmentTeams } from "../../services/development-teams";
import { deleteMeeting, getMeetingsByTeam } from "../../services/meetings";

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

        if (!teamId) {
            setMeetings([])
            return
        }

        const meetings = await getMeetingsByTeam(teamId)
        setMeetings(meetings)
    }

    async function handleDelete(meetingId: string) {

        const sure = confirm("Are you sure you want to delete this meeting?")

        if (!sure) return

        await deleteMeeting(meetingId)

        if (selectedTeamId) {
            const meetings = await getMeetingsByTeam(selectedTeamId)
            setMeetings(meetings)
        }
    }

    return (
        <div className="Meetings">

            <h1>Meetings</h1>

            <select value={selectedTeamId} onChange={handleTeamChange}>
                <option value="">Select Team</option>

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
                        <p>Start: {meeting.startDateTime}</p>
                        <p>End: {meeting.endDateTime}</p>

                        <button onClick={() => handleDelete(meeting.id)}>
                            Delete
                        </button>

                    </div>
                ))
            }

        </div>
    )
}