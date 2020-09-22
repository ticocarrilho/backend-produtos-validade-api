import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { FormService } from '../../services/form.service';
import { Produto } from '../../produto';

@Component({
  selector: 'app-product-input',
  templateUrl: './product-input.component.html',
  styleUrls: ['./product-input.component.scss'],
})
export class ProductInputComponent implements OnInit {
  @Input() isInDialog?: Boolean;
  @Input() defaultProdValue?: Produto;
  form: FormGroup;
  @Input() onSubmit;
  minDate: Date;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  nomeFormControl = new FormControl('', [Validators.required]);
  precoFormControl = new FormControl(null, [
    Validators.required,
    Validators.min(1.0),
  ]);

  validadeFormControl = new FormControl('', [Validators.required]);

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService
  ) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.form = this.formBuilder.group({
      nome: this.nomeFormControl,
      preco: this.precoFormControl,
      validade: this.validadeFormControl,
    });
  }

  ngOnInit(): void {
    if (this.isInDialog) {
      this.formService.onFormSubmitted.subscribe((res: String) => {
        if (res === 'submit') {
          this.onSubmit(this.form.value);
        }
      });
      this.form.patchValue({
        nome: this.defaultProdValue.nome, 
        preco: this.defaultProdValue.preco,
        validade: this.defaultProdValue.validade
      });
    }
  }
}
