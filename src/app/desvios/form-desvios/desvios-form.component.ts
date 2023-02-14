import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Desvio } from 'src/app/model/desvio';
import { DesviosService } from '../desvios.service';

@Component({
  selector: 'app-desvio-form',
  templateUrl: './desvios-form.component.html',
  styleUrls: ['./desvios-form.component.scss'],
})
export class DesvioFormComponent {
  form = this.formBuilder.group({
    linha: [''],
    link: [''],
  });
  nomeFormulario: string = '';
  key: string = '';

  constructor(
    private desvioFormService: DesviosService,
    private formBuilder: NonNullableFormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private location: Location
  ) {
    const desvio: Desvio = this.route.snapshot.data['desvio'];
    this.key = this.route.snapshot.params['key'];

    this.form.setValue({
      linha: desvio.linha,
      link: desvio.link,
    });
  }

  async onCancel() {
    this.location.back();
  }

  onSubmit() {
    this.desvioFormService.add(this.form.value);
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
