import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, Subscription, tap } from 'rxjs';
import { Bloco, Blocos } from 'src/app/model/bloco';
import { BlocosService } from '../blocos.service';

@Component({
  selector: 'app-blocos-list-date-regional',
  templateUrl: './blocos-list-date-regional.component.html',
  styleUrls: ['./blocos-list-date-regional.component.scss'],
})
export class BlocosListDateRegionalComponent implements OnInit {
  queryField = new FormControl();
  value: string = '';
  regionais: string[] = [];
  data: string = '';
  contador: number = 0;
  bloco: any;
  subscription: Subscription = new Subscription();
  desfile: any = null;
  blocosFire$: Observable<Blocos>;

  constructor(
    private blocosService: BlocosService,
    private router: Router,
    private location: Location
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.data = navigation?.extras?.state?.['value'];

    this.blocosFire$ = this.blocosService.listFireDate(this.data);

      this.blocosService
      .listFireDate(this.data)
      .pipe(tap((blocos: Blocos) => (this.contador = blocos.length)))
      .subscribe();
  }

  findOne(id: string) {
    this.router.navigate(['blocos/details', id]);
  }

  forByRegional(regional: string) {
    this.blocosFire$ = this.blocosService
      .listFireDate(this.data)
      .pipe(
        map((blocos) =>
          blocos.filter((bloco: Bloco) => bloco.regional === regional)
        ),
        tap((blocos: Blocos) => (this.contador = blocos.length))
      );
  }

  forDateList(data: string) {
    this.subscription = this.blocosService
      .listFire()
      .pipe(
        map((blocos: Blocos) =>
          blocos.filter((bloco: Bloco) => (bloco.data = data))
        )
      )
      .subscribe((blocos: any) => (this.blocosFire$ = blocos));
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

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.regionais = this.blocosService.regionais();

  }

  counter() {
    // this.bloco
    //   .pipe(map((blocos: Blocos) => (this.contador = blocos.length)))
    //   .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
