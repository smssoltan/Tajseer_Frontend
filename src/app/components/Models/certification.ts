export class Certification {
constructor(
    public Name: string,
    public Type: string,
    public Description: string,
    public Date: string,
    public Status: string,
    public certificateDocument: ArrayBuffer[]
){}
}