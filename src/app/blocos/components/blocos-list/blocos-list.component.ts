import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { count, map } from 'rxjs/operators';
import { Blocos } from 'src/app/model/bloco';
import { BlocosService } from '../blocos.service';

@Component({
  selector: 'app-blocos-list',
  templateUrl: './blocos-list.component.html',
  styleUrls: ['./blocos-list.component.scss'],
})
export class BlocosListComponent implements OnInit, OnDestroy {
  blocos$ = this.blocosService.list();

  value: string = '';
  regionais: string[] = [];
  regional: string = 'GERAL';
  contador: number = 0;
  bloco: any;
  subscription: Subscription = new Subscription();

  constructor(
    private blocosService: BlocosService,
    private router: Router,
    private routes: ActivatedRoute,
    private location: Location
  ) {
    this.subscription = this.blocosService
      .list()
      .subscribe((x) => (this.contador = x.length));
  }

  findOne(id: number) {
    this.router.navigate(['details', id], { relativeTo: this.routes });
  }

  forByRegional(regional: string) {
    this.blocos$ = this.blocosService
      .list()
      .pipe(
        map((blocos) => blocos.filter((bloco) => bloco.regional === regional)),
      )
    this.blocos$.pipe(map((blocos: Blocos) => this.contador = blocos.length)).subscribe();

    this.regional = regional;
  }

  load() {
    this.blocos$ = this.blocosService
      .list()
      .pipe(
        map((blocos) => blocos.filter((bloco) => bloco.regional !== 'GERAL'))
      )
      this.blocos$.pipe(map((blocos: Blocos) => this.contador = blocos.length)).subscribe();
    this.regional = 'GERAL';
  }

  onAdd() {
    this.router.navigate(['forms/new'], { relativeTo: this.routes });
  }

  onEdit(id: number) {
    this.router.navigate(['forms/edit', id], { relativeTo: this.routes });
  }

  onDelete(id: number) {
    this.subscription = this.blocosService.delete(id).subscribe(() => console.log('Bloco deletado com sucesso!!'));
    this.load();
    this.blocos$.pipe(map((blocos: Blocos) => this.contador = blocos.length)).subscribe();
  }

  ngOnInit(): void {
    this.regionais = this.blocosService.regionais();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
