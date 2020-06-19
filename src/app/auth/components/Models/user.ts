import {authorityModel} from "../signup/authority.model"

export interface User {
    userID: number
    fullName:string;
    email:string;
    password:string;
    natID: string;
    dob: string;
    pNum: string;
    address: string;
    enabled: boolean;
    authority: authorityModel;
}
