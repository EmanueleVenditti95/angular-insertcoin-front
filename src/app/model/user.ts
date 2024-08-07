import { Game } from "./game";
import { Role } from "./role";

export class User {
    id? : number;
    username? : string;
    email? : string;
    password? : string;
    foto? : any;
    ruoli? : Role[];
    giochi? : Game[];
}