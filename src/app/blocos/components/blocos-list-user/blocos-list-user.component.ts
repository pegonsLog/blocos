import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Blocos } from 'src/app/model/bloco';
import { BlocosService } from '../blocos.service';

@Component({
  selector: 'app-blocos-list',
  templateUrl: './blocos-list-user.component.html',
  styleUrls: ['./blocos-list-user.component.scss'],
})
export class BlocosListUserComponent implements OnInit, OnDestroy {
  blocos$ = this.blocosService.list();
  queryField = new FormControl();
  value: string = '';
  regionais: string[] = [];
  regional: string = 'GERAL';
  contador: number = 0;
  bloco: any;
  subscription: Subscription = new Subscription();
  @Input() role: boolean = false;

  constructor(
    private blocosService: BlocosService,
    private router: Router,
    private routes: ActivatedRoute,
  ) {
    this.subscription = this.blocosService
      .list()
      .subscribe((x) => (this.contador = x.length));
  }

  findOne(id: string) {
    this.router.navigate(['blocos/details', id]);
  }

  forByRegional(regional: string) {
    this.blocos$ = this.blocosService
      .list()
      .pipe(
        map((blocos) => blocos.filter((bloco) => bloco.regional === regional))
      );
    this.counter();
    this.regional = regional;
  }

  load() {
    this.blocos$ = this.blocosService
      .list()
      .pipe(
        map((blocos) => blocos.filter((bloco) => bloco.regional !== 'GERAL'))
      );

    this.queryField.reset();
    this.regional = 'GERAL';
  }


  onSearch() {
    let value = this.queryField.value;
    if(value && (value = value.trim()) !== ''){
    this.blocos$ = this.blocosService.list().pipe(
      map((blocos) => blocos.filter((bloco) =>  bloco.nome.includes(value.toUpperCase())))
    )
    this.counter();
    }
  }

  ngOnInit(): void {
    this.regionais = this.blocosService.regionais();
  }

  counter() {
    this.blocos$
      .pipe(map((blocos: Blocos) => (this.contador = blocos.length)))
      .subscribe();
  }

  admDefinition(x: boolean){
    this.role = x;
    console.log(x);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
