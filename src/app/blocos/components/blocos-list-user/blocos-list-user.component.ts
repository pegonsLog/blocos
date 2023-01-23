import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Blocos, Bloco } from 'src/app/model/bloco';
import { BlocosService } from '../blocos.service';

@Component({
  selector: 'app-blocos-list',
  templateUrl: './blocos-list-user.component.html',
  styleUrls: ['./blocos-list-user.component.scss'],
})
export class BlocosListUserComponent implements OnInit, OnDestroy {
  blocosFire$ = this.blocosService.listFire();
  queryField = new FormControl();
  value: string = '';
  regionais: string[] = [];
  regional: string = 'GERAL';
  contador: number = 0;
  bloco: any;
  subscription: Subscription = new Subscription();
  @Input() role: boolean = false;

  constructor(private blocosService: BlocosService, private router: Router) {
    this.blocosFire$ = this.blocosService.listFire();
    this.blocosService
      .listFire()
      .pipe(tap((blocos: Blocos) => (this.contador = blocos.length)))
      .subscribe();
  }

  findOne(id: string) {
    this.router.navigate(['blocos/details', id]);
  }

  forByRegional(regional: string) {
    this.blocosFire$ = this.blocosService
      .listFire()
      .pipe(
        map((blocos: Blocos) =>
          blocos.filter((bloco: Bloco) => bloco.regional === regional)
        )
      );
    this.blocosFire$.subscribe(
      (blocos: Blocos) => (this.contador = blocos.length)
    );
    this.regional = regional;
    this.queryField.reset();
  }

  forDate() {
    this.router.navigate(['blocos/date']);
  }

  load() {
    this.blocosFire$ = this.blocosService
      .listFire()
      .pipe(
        map((blocos: Blocos) =>
          blocos.filter((bloco: Bloco) => bloco.regional !== 'GERAL')
        )
      );
    this.blocosFire$.subscribe(
      (blocos: Blocos) => (this.contador = blocos.length)
    );

    this.queryField.reset();
    this.regional = 'GERAL';
  }

  onSearch() {
    let value = this.queryField.value;
    if (value && (value = value.trim()) !== '') {
      this.blocosFire$ = this.blocosService.listFire().pipe(
        map((blocos) =>
          blocos.filter((bloco: any) =>
            bloco.nome.includes(value.toUpperCase())
          )
        ),
        tap((blocos: Blocos) => (this.contador = blocos.length))
      );
    }
  }

  ngOnInit(): void {
    this.regionais = this.blocosService.regionais();
  }

  counter() {
    this.blocosService
      .listFire()
      .pipe(map((blocos: Blocos) => (this.contador = blocos.length)))
      .subscribe();
  }

  admDefinition(x: boolean) {
    this.role = x;
    console.log(x);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  listFire() {
    this.blocosService.listFire().subscribe((x: any) => (this.blocosFire$ = x));
  }
}
