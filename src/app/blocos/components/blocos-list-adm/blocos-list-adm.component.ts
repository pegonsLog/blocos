import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Blocos } from 'src/app/model/bloco';
import { BlocosService } from '../blocos.service';

@Component({
  selector: 'app-blocos-list',
  templateUrl: './blocos-list-adm.component.html',
  styleUrls: ['./blocos-list-adm.component.scss'],
})
export class BlocosListAdmComponent implements OnInit, OnDestroy {
  blocosFire$ = this.blocosService.listFire();
  queryField = new FormControl();
  value: string = '';
  regionais: string[] = [];
  regional: string = 'GERAL';
  contador: number = 0;
  bloco: any;
  subscription: Subscription = new Subscription();
  blocosPesquisados: Blocos = [];

  constructor(
    private blocosService: BlocosService,
    private router: Router,
    private routes: ActivatedRoute
  ) {
    this.blocosFire$ = this.blocosService.listFire().pipe(
      map((result) => result.sort((a, b) => a.nome.localeCompare(b.nome)))
    );

      this.blocosService
      .listFire()
      .pipe(tap((blocos: Blocos) => (this.contador = blocos.length)))
      .subscribe();
  }

  findOne(key: string) {
    this.router.navigate(['blocos/details', key]);
  }

  forByRegional(regional: string) {
    this.blocosFire$ = this.blocosService.listFire().pipe(
      map((blocos) => blocos.filter((bloco) => bloco.regional === regional)),
      map((result) => result.sort((a, b) => a.nome.localeCompare(b.nome)))
    );
    this.counter();
    this.regional = regional;
  }

  load() {
    this.blocosFire$ = this.blocosService.listFire().pipe(
      map((blocos) => blocos.filter((bloco) => bloco.regional !== 'GERAL')),
      map((result) => result.sort((a, b) => a.nome.localeCompare(b.nome)))
    );
    this.counter();
    this.queryField.reset();
    this.counter();
    this.regional = 'GERAL';
  }

  onAdd() {
    this.router.navigate(['blocos/forms/new']);
  }

  onEdit(key: string) {
    this.router.navigate(['blocos/forms/edit', key]);
  }

  onDelete(key: string) {
    this.blocosService.delete(key).then();
  }

  onSearch() {
    let value = this.queryField.value;
    if (value && (value = value.trim()) !== '') {
      this.blocosFire$ = this.blocosService.listFire().pipe(
        map((blocos) =>
          blocos.filter((bloco) => bloco.nome.includes(value.toUpperCase()))
        ),
        map((result) => result.sort((a, b) => a.nome.localeCompare(b.nome)))
      );
      this.counter();
    }
  }

  ngOnInit(): void {
    this.regionais = this.blocosService.regionais();
  }

  counter() {
    this.blocosFire$
      .pipe(map((blocos: Blocos) => (this.contador = blocos.length)))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
