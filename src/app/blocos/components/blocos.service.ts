import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bloco, Blocos } from '../../model/bloco';

@Injectable({
  providedIn: 'root',
})
export class BlocosService {
//private readonly API = "https://carnaval-bhtrans-2023-default-rtdb.firebaseio.com/blocos";
//private readonly API = 'http://localhost:3000/blocos';
private readonly API = environment.firebase.databaseURL;

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

  test(){
    console.log(environment.firebase.databaseURL)
  }

  list() {
    return this.http.get<Blocos>(`${this.API}/blocos`);
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
