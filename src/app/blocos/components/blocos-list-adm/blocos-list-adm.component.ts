import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Blocos } from 'src/app/model/bloco';
import { BlocosService } from '../blocos.service';

@Component({
  selector: 'app-blocos-list',
  templateUrl: './blocos-list-adm.component.html',
  styleUrls: ['./blocos-list-adm.component.scss'],
})
export class BlocosListAdmComponent implements OnInit, OnDestroy {
  blocos$ = this.blocosService.list();
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
    this.counter();
    this.queryField.reset();
    this.counter();
    this.regional = 'GERAL';
  }

  onAdd() {
    this.router.navigate(['blocos/forms/new'], { relativeTo: this.routes });
  }

  onEdit(id: string) {
    this.router.navigate(['blocos/forms/edit', id]);
  }

  onDelete(id: string) {
    this.subscription = this.blocosService
      .delete(id)
      .subscribe(() => console.log('Bloco deletado com sucesso!!'));
    this.load();
    this.counter();
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
    // this.queryField.valueChanges.pipe(
    //   map(value => value.trim()),
    //   filter(value => value.length > 1),
    //   distinctUntilChanged(),
    //   tap(value => console.log(value)))
    //   .subscribe();
  }

  counter() {
    this.blocos$
      .pipe(map((blocos: Blocos) => (this.contador = blocos.length)))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
