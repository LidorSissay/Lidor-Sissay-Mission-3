import type DevelopmentTeam from "./DevelopmentTeam"

export default interface Meeting {
    id: string
    developmentTeamId: string
    startDateTime: string
    endDateTime: string
    description: string
    roomName: string
    developmentTeam?: DevelopmentTeam
}