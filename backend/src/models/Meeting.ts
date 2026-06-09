import {
    AllowNull,
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";

import DevelopmentTeam from "./DevelopmentTeam";

@Table({
    underscored: true
})
export default class Meeting extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @ForeignKey(() => DevelopmentTeam)
    @AllowNull(false)
    @Column(DataType.UUID)
    developmentTeamId: string;

    @AllowNull(false)
    @Column(DataType.DATE)
    startDateTime: Date;

    @AllowNull(false)
    @Column(DataType.DATE)
    endDateTime: Date;

    @AllowNull(false)
    @Column(DataType.TEXT)
    description: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    roomName: string;

    @BelongsTo(() => DevelopmentTeam)
    developmentTeam: DevelopmentTeam;
}