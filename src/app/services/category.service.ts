import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = "http://localhost:9797/insertcoinsrest/api/categorie";

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(this.baseUrl + "/" + id);
  }

  addCategory(category: Category) {
    return this.http.post(this.baseUrl + "/inserimento", category);
  }

  saveCategory(category: Category) {
    return this.http.put(this.baseUrl + "/aggiornamento", category);
  }

  deleteCategory(id?: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
