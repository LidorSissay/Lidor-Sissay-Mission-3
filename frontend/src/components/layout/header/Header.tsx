import { NavLink } from "react-router-dom";
import "./Header.css"

export default function Header() {
    return (
        <div className="Header">

            <h1>Development Teams Meetings</h1>

            <nav>

                <NavLink to="/">
                    Home
                </NavLink>

                {" | "}

                <NavLink to="/about">
                    About
                </NavLink>

                {" | "}

                <NavLink to="/meetings">
                    Meetings
                </NavLink>

                {" | "}

                <NavLink to="/meetings/new">
                    Add Meeting
                </NavLink>

            </nav>

            <hr />

        </div>
    )
}