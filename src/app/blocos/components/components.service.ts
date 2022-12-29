import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  private readonly API = `${environment.API}blocos`

  constructor() { }
}
