import {authorityModel} from "./components/signup/authority.model"

export interface User {
    id: number
    fullName:string;
    email:string;
    password:string;
    natID: string;
    dob: string;
    pNum: string;
    address: string;
    contactNum: string;
    authority: authorityModel;
}
