import {authorityModel} from "../components/signup/authority.model"

export interface JwtResponse {
    user: {
        id:string,
        fullName:string,
        email:string,
        password:string,
        natID: number,
        dob: string,
        pNum: string,
        address: string,
        contactNum: string,
        authority: authorityModel,
        access_token: string,
        expires_in: string
    }
}
