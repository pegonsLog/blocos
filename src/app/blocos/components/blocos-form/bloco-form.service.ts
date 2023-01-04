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

  constructor(private http: HttpClient) { }


  loadById(id: number) {
    return this.http.get<Bloco>(`${this.API}/${id}`).pipe(first());

  }
  save(bloco: Partial<Bloco>) {
    return this.http.post<Bloco>(this.API, bloco);
  }


}
