import Joi from "joi";

export const meetingsPerTeamValidator = Joi.object({
    teamId: Joi.string().uuid().required()
})

export const singleMeetingValidator = Joi.object({
    meetingId: Joi.string().uuid().required()
})

export const newMeetingValidator = Joi.object({
    developmentTeamId: Joi.string().uuid().required(),
    startDateTime: Joi.date().required(),
    endDateTime: Joi.date().required(),
    description: Joi.string().required(),
    roomName: Joi.string().required()
})

export const updateMeetingValidator = Joi.object({
    meetingId: Joi.string().uuid().required(),
    developmentTeamId: Joi.string().uuid().required(),
    startDateTime: Joi.date().required(),
    endDateTime: Joi.date().required(),
    description: Joi.string().required(),
    roomName: Joi.string().required()
})

export const deleteMeetingValidator = Joi.object({
    meetingId: Joi.string().uuid().required()
})