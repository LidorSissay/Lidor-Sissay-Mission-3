import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type DevelopmentTeam from "../../models/DevelopmentTeam";

import { getDevelopmentTeams } from "../../services/development-teams";
import { addMeeting } from "../../services/meetings";

import "./AddMeeting.css";

export default function AddMeeting() {

    const navigate = useNavigate()

    const [teams, setTeams] = useState<DevelopmentTeam[]>([])
    const [developmentTeamId, setDevelopmentTeamId] = useState("")
    const [startDateTime, setStartDateTime] = useState("")
    const [endDateTime, setEndDateTime] = useState("")
    const [description, setDescription] = useState("")
    const [roomName, setRoomName] = useState("")

    useEffect(() => {
        getDevelopmentTeams()
            .then(setTeams)
            .catch(console.error)
    }, [])

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        if (!developmentTeamId || !startDateTime || !endDateTime || !description || !roomName) {
            alert("All fields are required")
            return
        }

        const now = new Date()
        const start = new Date(startDateTime)
        const end = new Date(endDateTime)

        if (start < now) {
            alert("Start time cannot be in the past")
            return
        }

        if (start > end) {
            alert("Start time cannot be after end time")
            return
        }

        await addMeeting({
            developmentTeamId,
            startDateTime,
            endDateTime,
            description,
            roomName
        })

        alert("Meeting added successfully")

        navigate("/meetings")
    }

    return (
        <div className="AddMeeting">

            <h2>Add Meeting</h2>

            <form onSubmit={handleSubmit}>

                <label>Development Team:</label>
                <select
                    value={developmentTeamId}
                    onChange={e => setDevelopmentTeamId(e.target.value)}
                    required
                >
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

                <label>Start Date Time:</label>
                <input
                    type="datetime-local"
                    value={startDateTime}
                    onChange={e => setStartDateTime(e.target.value)}
                    required
                />

                <label>End Date Time:</label>
                <input
                    type="datetime-local"
                    value={endDateTime}
                    onChange={e => setEndDateTime(e.target.value)}
                    required
                />

                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />

                <label>Room Name:</label>
                <input
                    type="text"
                    value={roomName}
                    onChange={e => setRoomName(e.target.value)}
                    required
                />

                <button>Add Meeting</button>

            </form>

        </div>
    )
}