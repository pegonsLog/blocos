import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlocosService } from '../blocos.service';
import { Bloco } from 'src/app/model/bloco';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {

  bloco: Bloco = {
    id: 0,
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
    linkMyMaps: ''

  };
  subscription: Subscription = new Subscription();

  constructor(
    private blocosService: BlocosService,
    private routes: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
   }

  ngOnInit(): void {
    const id = this.routes.snapshot.params['id'];
   this.subscription = this.blocosService.findOne(id).subscribe((bloco: Bloco) => this.bloco = bloco);
  }

  onMyMaps() {
 
  }

  onDot() {}

  onCancel() {
    this.location.back();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
