import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bloco } from 'src/app/model/bloco';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlocoFormService {

  private readonly API = `${environment.API}blocos`;
  //private readonly API = `${environment.firebase}blocos`;

  constructor(private http: HttpClient) { }


  loadById(id: number) {
    return this.http.get<Bloco>(`${this.API}/${id}`).pipe(first());

  }
  save(bloco: Partial<Bloco>) {

    if(bloco.id){
      return this.http.put<Bloco>(`${this.API}/${bloco.id}`, bloco).pipe(first());
    }
    return this.http.post<Bloco>(this.API, bloco).pipe(first());
  }

  update(bloco: Partial<Bloco>) {
    return this.http.patch<Bloco>(`${this.API}/${bloco.id}`, bloco).pipe(first());
  }


}
