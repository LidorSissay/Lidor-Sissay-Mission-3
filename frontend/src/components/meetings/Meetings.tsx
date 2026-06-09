import { useEffect, useState } from "react";
import type DevelopmentTeam from "../../models/DevelopmentTeam";
import { getDevelopmentTeams } from "../../services/development-teams";

export default function Meetings() {

    const [teams, setTeams] = useState<DevelopmentTeam[]>([])

    useEffect(() => {

        getDevelopmentTeams()
            .then(setTeams)
            .catch(console.error)

    }, [])

    return (
        <div className="Meetings">

            <h1>Meetings</h1>

            <select>
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

        </div>
    )
}