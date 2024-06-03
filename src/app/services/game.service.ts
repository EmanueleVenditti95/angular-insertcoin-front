import { Injectable } from '@angular/core'; //necessario per definire un servizio in Angular.
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs'; // Observable rappresenta un flusso di dati che possono essere asincroni.
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
    // il metodo pipe serve per collegare il metodo catchError al flusso dell'Observable.
    return this.http.get<Game[]>(this.baseUrl).pipe(catchError(this.handleError));
  }

  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(this.baseUrl + "/" + id).pipe(catchError(this.handleError));
  }


  // Questo metodo gestisce gli errori, distinguendo tra errori lato client e lato server, e crea un messaggio di errore appropriato.
  // Infine, utilizza throwError per restituire un nuovo Observable che emette l'errore.
  private handleError(error: HttpErrorResponse) {

    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}