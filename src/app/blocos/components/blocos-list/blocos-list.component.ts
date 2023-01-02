import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlocosService } from '../blocos.service';

@Component({
  selector: 'app-blocos-list',
  templateUrl: './blocos-list.component.html',
  styleUrls: ['./blocos-list.component.scss']

})
export class BlocosListComponent implements OnInit {

  blocos$: any = this.blocosService.list();
  value: string = ''

  constructor(private blocosService: BlocosService, private router: Router ) {
   }

   findOne(){
    //this.blocosService.findOne(1).subscribe(bloco => console.log(bloco));
    this.router.navigate(['blocos/details'])
   }

  ngOnInit(): void {

  }

}
