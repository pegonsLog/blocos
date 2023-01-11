import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bloco, Blocos } from '../../model/bloco';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlocosService {
// private readonly API = "https://crowsoft-carnaval-bhtrans-default-rtdb.firebaseio.com/blocos";
private readonly API = 'http://localhost:3000/blocos';

  private readonly REGIONAIS = [
    'BARREIRO',
    'OESTE',
    'NOROESTE',
    'PAMPULHA',
    'SUL',
    'LESTE',
    'NORDESTE',
    'NORTE',
    'VENDA NOVA',
    'CENTRO',
  ];

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Blocos>(this.API);
  }

  findOne(id: string) {
    return this.http.get<Bloco>(`${this.API}/${id}`);
  }

  regionais() {
    return this.REGIONAIS;
  }

  delete(id: string){
    return this.http.delete<Bloco>(`${this.API}/${id}`);
  }
}
