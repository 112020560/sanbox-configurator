/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class ApplicationDto {
    @ApiProperty()
    ApplicationCode: number;
    @ApiProperty()
    ApplicationId: string;
    @ApiProperty()
    ApplicationName: string;
    @ApiProperty()
    Description: string;
    @ApiProperty()
    DbUserName: string;
    @ApiProperty()
    DbPassword: string;
    @ApiProperty()
    IsEnable: boolean;
    @ApiProperty()
    IsEditable: boolean;
    @ApiProperty()
    ReqAprove: boolean;
    @ApiProperty({type: ()=> ConnectionDto})
    Connections: ConnectionDto[];
    @ApiProperty()
    AllowProcedure: boolean;
    @ApiProperty({type: ()=> ProcedureDto})
    Procedures: ProcedureDto[];
    @ApiProperty({type: ()=> ExtendedDto})
    ExtendedProperties: ExtendedDto[];
    @ApiProperty({type: ()=> Array<number>})
    Country: number[];
}

export class ConnectionDto {
    @ApiProperty()
    Type: string;
    @ApiProperty()
    ConnectionString: string;
    @ApiProperty()
    ConnectionKey00: string;
    @ApiProperty()
    ConnectionKey01: string;
    @ApiProperty()
    ConnectionKey02: string;
    @ApiProperty()
    HostName?: string;
    @ApiProperty()
    UserName?: string;
    @ApiProperty()
    Password?: string;
    @ApiProperty()
    DataBase?: string;
    @ApiProperty()
    Port?: number;
    @ApiProperty()
    SSLMode?: string;
}

export class ProcedureDto {
    @ApiProperty()
    Procedure: string;
    @ApiProperty()
    ProcedureKey: string;
    @ApiProperty()
    Parameters: string[];
    @ApiProperty()
    Active: boolean;
    @ApiProperty()
    Trace: boolean;
}

export class ExtendedDto {
    @ApiProperty()
    Key00: string;
    @ApiProperty()
    Key01: string;
    @ApiProperty()
    Key02: string;
    @ApiProperty()
    Value00: string;
    @ApiProperty()
    Value01: string;
    @ApiProperty()
    Value02: string;
    @ApiProperty()
    NumericValue: number;
    @ApiProperty()
    Description: string;
}
