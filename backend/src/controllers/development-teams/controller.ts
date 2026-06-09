import type { NextFunction, Request, Response } from "express";
import DevelopmentTeam from "../../models/DevelopmentTeam";

export async function getDevelopmentTeams(
    request: Request,
    response: Response,
    next: NextFunction
) {
    try {

        const teams = await DevelopmentTeam.findAll()

        response.json(teams)

    } catch (e) {
        next(e)
    }
}