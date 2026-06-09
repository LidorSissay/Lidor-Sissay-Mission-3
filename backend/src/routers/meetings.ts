import { Router } from "express";
import paramsValidation from "../middlewares/params-validation";
import bodyValidation from "../middlewares/body-validation";

import {
    deleteMeetingValidator,
    meetingsPerTeamValidator,
    newMeetingValidator,
    singleMeetingValidator
} from "../controllers/meetings/validator";

import {
    deleteMeeting,
    meetingsPerTeam,
    newMeeting,
    singleMeeting,
    updateMeeting
} from "../controllers/meetings/controller";

const meetingsRouter = Router()

meetingsRouter.get(
    '/team/:teamId',
    paramsValidation(meetingsPerTeamValidator),
    meetingsPerTeam
)

meetingsRouter.get(
    '/:meetingId',
    paramsValidation(singleMeetingValidator),
    singleMeeting
)

meetingsRouter.post(
    '/',
    bodyValidation(newMeetingValidator),
    newMeeting
)

meetingsRouter.patch(
    '/:meetingId',
    paramsValidation(singleMeetingValidator),
    bodyValidation(newMeetingValidator),
    updateMeeting
)

meetingsRouter.delete(
    '/:meetingId',
    paramsValidation(deleteMeetingValidator),
    deleteMeeting
)

export default meetingsRouter