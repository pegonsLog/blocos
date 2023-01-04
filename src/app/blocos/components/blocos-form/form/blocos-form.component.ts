import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Bloco } from 'src/app/model/bloco';
import { BlocoFormService } from '../bloco-form.service';

@Component({
  selector: 'app-blocos-form',
  templateUrl: './blocos-form.component.html',
  styleUrls: ['./blocos-form.component.scss']
})
export class BlocosFormComponent {

  form: FormGroup;

  constructor(
    private blocoFormService: BlocoFormService,
    private formBuilder: NonNullableFormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.form = this.formBuilder.group({
      id: [0],
      nome: [''],
      regional: [''],
      data: [''],
      publico: [0],
      horaConc: [''],
      horaDesf: [''],
      horaDisp: [''],
      responsavel: [''],
      telefone: [''],
      localConc: [''],
      localDisp: [''],
      linkDOT: [''],
      linkMyMaps: ['']
    });
  }

  async onCancel() {
    this.location.back();
  }

  onSubmit() {
    const bloco: Bloco = this.route.snapshot.data['new'];
    console.log(bloco);

    this.form.setValue({
      id: 0,
      nome: '',
      regional: '',
      data: '',
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
    });

    this.blocoFormService.save(this.form.value).subscribe(
      () => this.onSuccess(),
      () => this.onError()
    );
    this.onClear();
  }

  private onSuccess() {
    this.snackBar.open('Registro inserido com sucesso!', '', {
      duration: 1000,
    });
  }

  private onError() {
    this.snackBar.open('Erro na inclusão do registro!', '', { duration: 3000 });
  }

  private onClear() {
    this.form.reset();
  }
}
