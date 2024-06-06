import { Injectable } from '@angular/core'; //necessario per definire un servizio in Angular.
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs'; // Observable rappresenta un flusso di dati che possono essere asincroni.
import { Game } from '../model/game';
import axios from 'axios';

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

  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(this.baseUrl + "/" + id);
  }

  addGame(game: Game): boolean {
    const body = JSON.stringify(game);
    try {
      axios.post(this.baseUrl+"/inserimento",
            body,
            {headers: {'Content-Type': 'application/json'}}
          )
          .then(response => {
            console.log(response);             
          })
      return true; 
    } catch (error) {
      console.error('Errore nella richiesta:', error);
      return false;
    } 
  }

  deleteGame(id?: number) {
    // axios.delete(this.baseUrl +"/"+ id)
    // .then(function(response){
    //   console.log("cancellato",response);
    // })
    // .catch(function(error) {
    //   console.error('Errore nella richiesta:', error);
    // });
    return this.http.delete(this.baseUrl + "/" + id);
  }
}