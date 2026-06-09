import meetingImage from "../../assests/download.png"
import "./Home.css"

export default function Home() {
    return (
        <div className="Home">

            <h2>Welcome</h2>

            <p>
                This system helps manage meetings for development teams in the company.
                You can view meetings by team, add new meetings, update existing meetings
                and delete meetings.
            </p>

            <img
                src={meetingImage}
                alt="Development Teams Meeting"
            />

        </div>
    )
}