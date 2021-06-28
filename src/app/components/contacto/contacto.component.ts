import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormsValidationService } from 'src/app/services/forms-validation.service';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent {

  fg: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fv: FormsValidationService,
    private toastr: ToastrService,
    private contactoService: ContactoService
  ) {

    this.fg = fb.group({
      name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100), Validators.pattern('^[a-zA-Z ]*$')]],
      telephone: [null, [Validators.required, Validators.minLength(10), this.fv.telefono()]],
      email: [null, [Validators.required, this.fv.correo()]],
      message: new FormControl('', [ Validators.maxLength(255), Validators.required]),
    });
  }
  image = 'assets/propias/pizarron_2.jpeg';

  sendQuestion() {
    if (this.fg.valid) {
      this.contactoService.sendContact(this.fg.value).subscribe(c => {
        this.fg.reset();
        this.toastr.success('Su consulta fue enviada correctamente');
      });
    } else {
      this.fg.markAllAsTouched();
      this.toastr.error('Por favor complete los datos requeridos.');
    }
  }
  // ======================= Getters ==========================
  get nombre() { return this.fg.get('name'); }
  get email() { return this.fg.get('email'); }
  get telefono() { return this.fg.get('telephone'); }
  get consulta() { return this.fg.get('message'); }

}
