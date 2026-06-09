import { Route, Routes } from "react-router-dom";

import Home from "../../home/Home";
import About from "../../about/About";
import Meetings from "../../meetings/Meetings";
import AddMeeting from "../../add-meeting/AddMeeting";
import UpdateMeeting from "../../update-meeting/UpdateMeeting";

export default function Main() {
    return (
        <div className="Main">
            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/meetings"
                    element={<Meetings />}
                />

                <Route
                    path="/meetings/new"
                    element={<AddMeeting />}
                />

                <Route
                    path="/meetings/edit/:meetingId"
                    element={<UpdateMeeting />}
                />

            </Routes>
        </div>
    )
}