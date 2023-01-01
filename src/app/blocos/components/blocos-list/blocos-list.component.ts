import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blocos } from 'src/app/model/bloco';
import { BlocosService } from '../blocos.service';

@Component({
  selector: 'app-blocos-list',
  templateUrl: './blocos-list.component.html',
  styleUrls: ['./blocos-list.component.scss']
})
export class BlocosListComponent implements OnInit {

  blocos$: any = this.blocosService.list();

  constructor(private blocosService: BlocosService) {
   }

  ngOnInit(): void {

  }

}
