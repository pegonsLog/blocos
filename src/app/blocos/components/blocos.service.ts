import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blocos } from '../../model/bloco';

@Injectable({
  providedIn: 'root'
})
export class BlocosService {

  private readonly API = `${environment.API}blocos`

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Blocos>(this.API)
  }
}
