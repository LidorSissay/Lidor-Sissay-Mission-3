import { useEffect, useState } from "react";
import type DevelopmentTeam from "../../models/DevelopmentTeam";
import type Meeting from "../../models/Meeting";

import { getDevelopmentTeams } from "../../services/development-teams";
import { getMeetingsByTeam } from "../../services/meetings";

export default function Meetings() {

    const [teams, setTeams] = useState<DevelopmentTeam[]>([])
    const [meetings, setMeetings] = useState<Meeting[]>([])

    useEffect(() => {

        getDevelopmentTeams()
            .then(setTeams)
            .catch(console.error)

    }, [])

    async function handleTeamChange(event: React.ChangeEvent<HTMLSelectElement>) {

        const teamId = event.target.value

        if (!teamId) {
            setMeetings([])
            return
        }

        try {

            const meetings = await getMeetingsByTeam(teamId)

            setMeetings(meetings)

        } catch (err) {
            console.error(err)
        }

    }

    return (
        <div className="Meetings">

            <h1>Meetings</h1>

            <select onChange={handleTeamChange}>
                <option value="">
                    Select Team
                </option>

                {
                    teams.map(team => (
                        <option
                            key={team.id}
                            value={team.id}
                        >
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

                        <p>
                            Room: {meeting.roomName}
                        </p>

                        <p>
                            Start: {meeting.startDateTime}
                        </p>

                        <p>
                            End: {meeting.endDateTime}
                        </p>

                    </div>
                ))
            }

        </div>
    )
}