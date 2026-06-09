import { Router } from "express";
import { getDevelopmentTeams } from "../controllers/development-teams/controller";

const developmentTeamsRouter = Router()

developmentTeamsRouter.get('/', getDevelopmentTeams)

export default developmentTeamsRouter