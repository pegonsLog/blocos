import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Blocos } from 'src/app/model/bloco';
import { BlocosService } from '../blocos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blocos-list-date-regional',
  templateUrl: './blocos-list-date-regional.component.html',
  styleUrls: ['./blocos-list-date-regional.component.scss']
})

export class BlocosListDateRegionalComponent implements OnInit {
  blocosFire$ = this.blocosService.listFire();
  queryField = new FormControl();
  value: string = '';
  regionais: string[] = [];
  data: string = 'GERAL';
  contador: number = 0;
  bloco: any;
  subscription: Subscription = new Subscription();
  desfile: any = null;

  constructor(
    private blocosService: BlocosService,
    private router: Router,
    private location: Location
  ) {
    this.subscription = this.blocosService
      .listFire()
      .subscribe((x) => (this.contador = x.length));

      const navigation = this.router.getCurrentNavigation();
      this.data = navigation?.extras?.state?.['value']
  }

  findOne(id: string) {
    this.router.navigate(['blocos/details', id]);
  }

  forByRegional(regional: string) {
    this.blocosFire$ = this.blocosService
      .listFire()
      .pipe(
        map((blocos) => blocos.filter((bloco: any) => bloco.regional === regional && bloco.data === this.data))
      );
    this.counter();
   // this.regional = regional;
  }

  forDate(data: any){
    this.blocosFire$ = this.blocosService
      .listFire()
      .pipe(
        map((blocos) => blocos.filter((bloco: any) => bloco.data === data))
      );
    this.counter();
    this.data = data;
  }

  forDateList(){
    this.blocosFire$ = this.blocosService
      .listFire()
      .pipe(
        map((blocos) => blocos.filter((bloco: any) => bloco.data === this.data))
      );
    this.counter();
    this.data = this.data;
  }

  // load() {
  //   this.blocos$ = this.blocosService
  //     .list()
  //     .pipe(
  //       map((blocos) => blocos.filter((bloco) => bloco.data !== 'GERAL'))
  //     );

  //   this.queryField.reset();
  //   this.data = 'GERAL';
  // }

  goBack(){
    this.location.back();
  }

  ngOnInit(): void {
    this.regionais = this.blocosService.regionais();
    this.forDateList();
  }

  counter() {
    this.bloco
      .pipe(map((blocos: Blocos) => (this.contador = blocos.length)))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
