import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Bloco, Blocos } from 'src/app/model/bloco';
import { BlocosService } from '../blocos.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  bloco: Bloco = {
    id: '',
    nome: '',
    data: '',
    regional: '',
    publico: 0,
    horaConc: '',
    horaDesf: '',
    horaDisp: '',
    responsavel: '',
    telefone: '',
    localConc: '',
    localDisp: '',
    linkDOT: '',
    linkMyMaps: '',
  };
  subscription: Subscription = new Subscription();

  constructor(
    private blocosService: BlocosService,
    private routes: ActivatedRoute,
    private location: Location
  ) {
    const id = this.routes.snapshot.params['id'];
    console.log(id);
    this.subscription = this.blocosService.findOne(id).subscribe((x: any) => this.bloco = x);
  }

  ngOnInit(): void {}

  onCancel() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
