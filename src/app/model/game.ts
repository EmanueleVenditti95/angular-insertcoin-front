import { Category } from "./category";
import { Console } from "./console";

export class Game {
    id?: number;
    nome?: string;
    descrizione?: string;
    video?: string;
    img?: string;
    categoria?: Category;
    consoles?: Console[];
}
