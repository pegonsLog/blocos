import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bloco, Blocos } from '../../model/bloco';

@Injectable({
  providedIn: 'root'
})
export class BlocosService {

  private readonly API = `${environment.API}blocos`;

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Blocos>(this.API)
  }

  findOne(id: number){
    return this.http.get<Bloco>(`${this.API}/${id}`)
  }

  save(bloco: Partial<Bloco>){
    return this.http.post<Bloco>(this.API, bloco)
  }

}
