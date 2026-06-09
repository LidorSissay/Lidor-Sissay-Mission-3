import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import type DevelopmentTeam from "../../models/DevelopmentTeam";

import { getDevelopmentTeams } from "../../services/development-teams";
import { getMeeting, updateMeeting } from "../../services/meetings";

import "./UpdateMeeting.css";

export default function UpdateMeeting() {

    const { meetingId } = useParams()

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

        if (!meetingId) return

        getMeeting(meetingId)
            .then(meeting => {

                setDevelopmentTeamId(meeting.developmentTeamId)

                setStartDateTime(
                    meeting.startDateTime.slice(0, 16)
                )

                setEndDateTime(
                    meeting.endDateTime.slice(0, 16)
                )

                setDescription(meeting.description)

                setRoomName(meeting.roomName)

            })
            .catch(console.error)

    }, [meetingId])

    async function handleSubmit(event: React.FormEvent) {

        event.preventDefault()

        if (!meetingId) return

        const start = new Date(startDateTime)
        const end = new Date(endDateTime)

        if (start > end) {
            alert("Start time cannot be after end time")
            return
        }

        await updateMeeting(
            meetingId,
            {
                developmentTeamId,
                startDateTime,
                endDateTime,
                description,
                roomName
            }
        )

        alert("Meeting updated successfully")

        navigate("/meetings")
    }

    return (
        <div className="UpdateMeeting">

            <h1>Update Meeting</h1>

            <form onSubmit={handleSubmit}>

                <label>Development Team:</label>

                <select
                    value={developmentTeamId}
                    onChange={e => setDevelopmentTeamId(e.target.value)}
                    required
                >
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

                <button>
                    Update Meeting
                </button>

            </form>

        </div>
    )
}