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
  bloco: any;
  subscription: Subscription = new Subscription();

  constructor(
    private blocosService: BlocosService,
    private router: Router,
    private routes: ActivatedRoute,
    private location: Location
  ) {}

  findOne(id: number) {
    //this.subscription = this.blocosService.findOne(id).subscribe(bloco => this.bloco = bloco);
    console.log(id);
    this.router.navigate(['details', id], { relativeTo: this.routes });
  }

  forByRegional(regional: string) {
    this.blocos$ = this.blocosService
      .list()
      .pipe(
        map((blocos) => blocos.filter((bloco) => bloco.regional === regional))
      );
  }

  load() {
    location.reload();
  }

  onAdd() {
    //this.blocosService.findOne(1).subscribe(bloco => console.log(bloco));
    this.router.navigate(['forms/new'], { relativeTo: this.routes });
  }

  onEdit(id: number) {
    this.router.navigate(['forms/edit', id], { relativeTo: this.routes });
  }

  onDelete(id: number) {}

  ngOnInit(): void {
    this.regionais = this.blocosService.regionais();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
