import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Bloco, Blocos } from '../../model/bloco';


@Injectable({
  providedIn: 'root',
})
export class BlocosService {

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

  private readonly DATAS = [
    '04/02',
    '05/02',
    '09/02',
    '10/02',
    '11/02',
    '12/02',
    '14/02',
    '15/02',
    '16/02',
    '17/02',
    '18/02',
    '19/02',
    '20/02',
    '21/02',
    '22/02',
    '23/02',
    '24/02',
    '25/02',
    '26/02',
  ];

  constructor(private http: HttpClient, private db: AngularFireDatabase) {}

  // list() {
  //   return this.http.get<Blocos>(this.API);
  // }

  listFire() {
    return this.db.list<any>('blocos').valueChanges();
  }

  findOne(id: string) {
    return this.http.get<Bloco>(`${''}/${id}`);
  }

  regionais() {
    return this.REGIONAIS;
  }

  datas() {
    return this.DATAS;
  }

  delete(id: string) {
    return this.http.delete<Bloco>(`${''}/${id}`);
  }
}
