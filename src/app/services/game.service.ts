import { Injectable } from '@angular/core'; //necessario per definire un servizio in Angular.
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Observable rappresenta un flusso di dati che possono essere asincroni.
import { Game } from '../model/game';

// Questo decoratore configura la classe GameService come un servizio che può essere iniettato in altre parti dell'applicazione.
// Il parametro providedIn: 'root' indica che il servizio è un singleton e viene fornito a livello di root,
// rendendolo disponibile in tutta l'applicazione senza doverlo dichiarare esplicitamente nei provider di ogni modulo.
@Injectable({
  providedIn: 'root'
})


export class GameService {

  private baseUrl = "http://localhost:9797/insertcoinsrest/api/giochi";
  

  // Il costruttore prende un'istanza di HttpClient come dipendenza, utilizzando la Dependency Injection di Angular.
  // HttpClient viene utilizzato per effettuare richieste HTTP.
  constructor(private http: HttpClient) { } 

  getGames(): Observable<Game[]> {
    // Restituisce un Observable di un array di oggetti Game. Questo permette di sottoscriversi al risultato e gestire i dati in modo asincrono.
    return this.http.get<Game[]>(this.baseUrl);
  }

  getGamesByCategoryId(id: number) {
    return this.http.get<Game[]>(this.baseUrl + "/sort/" + id);
  }

  getGame(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/" + id);
  }

  searchGame(gameName : string): Observable<Game[]> {
    return this.http.get<Game[]>(this.baseUrl + "/cerca?nomeGioco=" + gameName);
  }

  addGame(game: Game) {
    return this.http.post(this.baseUrl + "/inserimento", game);
  }

  saveGame(game: Game) {
    return this.http.put(this.baseUrl + "/aggiornamento", game);
  }

  deleteGame(id?: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}