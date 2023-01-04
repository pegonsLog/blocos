import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
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
    private location: Location
  ) {}

  findOne(id: number) {
    //this.subscription = this.blocosService.findOne(id).subscribe(bloco => this.bloco = bloco);
    console.log(id);
    this.router.navigate(['blocos/details', id]);
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

  add() {
    //this.blocosService.findOne(1).subscribe(bloco => console.log(bloco));
    this.router.navigate(['blocos/add']);
  }

  ngOnInit(): void {
    this.regionais = this.blocosService.regionais();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
