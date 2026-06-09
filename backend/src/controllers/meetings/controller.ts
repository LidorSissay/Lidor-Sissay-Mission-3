import type { NextFunction, Request, Response } from "express";
import DevelopmentTeam from "../../models/DevelopmentTeam";
import Meeting from "../../models/Meeting";

export async function meetingsPerTeam(
    request: Request<{ teamId: string }>,
    response: Response,
    next: NextFunction
) {
    try {

        const { teamId } = request.params

        const { meetings } = await DevelopmentTeam.findByPk(teamId, {
            include: Meeting
        })

        response.json(meetings)

    } catch (e) {
        next(e)
    }
}

export async function singleMeeting(
    request: Request<{ meetingId: string }>,
    response: Response,
    next: NextFunction
) {
    try {

        const { meetingId } = request.params

        const meeting = await Meeting.findByPk(meetingId)

        response.json(meeting)

    } catch (e) {
        next(e)
    }
}

export async function newMeeting(
    request: Request<
        {},
        {},
        {
            developmentTeamId: string
            startDateTime: Date
            endDateTime: Date
            description: string
            roomName: string
        }
    >,
    response: Response,
    next: NextFunction
) {
    try {

        const meeting = await Meeting.create({
            ...request.body
        })

        response.json(meeting)

    } catch (e) {
        next(e)
    }
}

export async function updateMeeting(
    request: Request<
        { meetingId: string },
        {},
        {
            developmentTeamId: string
            startDateTime: Date
            endDateTime: Date
            description: string
            roomName: string
        }
    >,
    response: Response,
    next: NextFunction
) {
    try {

        const { meetingId } = request.params

        const meeting = await Meeting.findByPk(meetingId)

        if (!meeting) {
            return next({
                status: 404,
                message: "Meeting not found"
            })
        }

        await meeting.update({
            ...request.body
        })

        response.json(meeting)

    } catch (e) {
        next(e)
    }
}

export async function deleteMeeting(
    request: Request<{ meetingId: string }>,
    response: Response,
    next: NextFunction
) {
    try {

        const { meetingId } = request.params

        const numberOfRowsDeleted = await Meeting.destroy({
            where: {
                id: meetingId
            }
        })

        if (numberOfRowsDeleted === 0) {
            return next({
                status: 404,
                message: "Meeting not found"
            })
        }

        response.json({
            success: true
        })

    } catch (e) {
        next(e)
    }
}