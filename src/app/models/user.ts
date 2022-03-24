
export interface User {
    userId:string;
    displayName:string,
    name:string;
    phoneNumber:string;
    email:string;
    password:string;
    userPhoto:string;

    toolname:string;
    tooltype:string;
    postPhoto:string;
    developername:string;
    tooldescription:string;
    contributor:string;
    disclaimer:string;
    createAt:number;

    
}
export interface Message{
    createdAt:firebase.default.firestore.FieldValue;
    id:string;
    msg:string;
    from:string;
    fromName:string;
    myMsg:boolean;
}



