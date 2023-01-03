import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bloco, Blocos } from '../../model/bloco';
import { filter, map, Subscription } from 'rxjs';

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

  findByRegional(regional: string) {
    return this.http.get<Blocos>(this.API);

    //.pipe(map((blocos: Blocos) => filter((bloco: Bloco) => bloco.regional === regional)));
    //{filter((bloco: Bloco) => bloco.regional === regional)})).subscribe(data => console.log(data));
  }

  save(bloco: Partial<Bloco>) {
    return this.http.post<Bloco>(this.API, bloco);
  }

  regionais() {
    return this.REGIONAIS;
  }
}