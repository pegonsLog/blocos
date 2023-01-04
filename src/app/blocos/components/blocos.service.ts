import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Bloco, Blocos } from '../../model/bloco';

@Injectable({
  providedIn: 'root',
})
export class BlocosService {
  private readonly API = `${environment.API}blocos`;
  private readonly REGIONAIS = ['GARBO', 'GARNE', 'GARNP', 'GARVN', 'GEACE'];
  private blocos: Blocos = [];
  private subscription = new Subscription();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Blocos>(this.API);
  }

  findOne(id: number) {
    return this.http.get<Bloco>(`${this.API}/${id}`);
  }

  regionais() {
    return this.REGIONAIS;
  }


}
