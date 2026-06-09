import { NavLink } from "react-router-dom";
import type Meeting from "../../models/Meeting";
import "./MeetingCard.css";

interface MeetingCardProps {
    meeting: Meeting
    onDelete: (meetingId: string) => void
}

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

function getMeetingClassName(startDateTime: string): string {
    const start = new Date(startDateTime)
    const now = new Date()

    return start > now ? "MeetingCard future" : "MeetingCard past"
}

export default function MeetingCard(props: MeetingCardProps) {

    const { meeting, onDelete } = props

    return (
        <div className={getMeetingClassName(meeting.startDateTime)}>

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

            <NavLink to={`/meetings/edit/${meeting.id}`}>
                Edit
            </NavLink>

            <button onClick={() => onDelete(meeting.id)}>
                Delete
            </button>

        </div>
    )
}