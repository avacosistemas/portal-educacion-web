import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../entities/usuario';
import { AlumnoService } from '../../../services/alumno.service';
import { ProfesorService } from '../../../services/profesor.service';
import { ActivatedRoute } from '@angular/router';
import { SeguridadService } from '../../../services/seguridad.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormsValidationService } from '../../../services/forms-validation.service';
import { HeaderService } from 'src/app/services/header.service';
import { Clase } from 'src/app/entities/clase';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.scss']
})
export class UsuarioPerfilComponent implements OnInit {

  // usuario: Usuario = new Usuario();
  paramId: number;
  fileName = 'Seleccionar Archivo';
  active = 'navclases';
  isAlumno = false;
  cambiarPassword: boolean;
  clase: Clase;
  imgSrc: string | ArrayBuffer;
  maxSize = 20000;
  usuarioForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fv: FormsValidationService,
    protected as: SeguridadService,
    protected als: AlumnoService,
    protected rateConfig: NgbRatingConfig,
    protected ps: ProfesorService,
    private headerService: HeaderService,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) {
    rateConfig.max = 5;

    this.usuarioForm = this.fb.group({
      nombre: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100), Validators.pattern('^[a-zA-Z ]*$')]],
      apellido: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100), Validators.pattern('^[a-zA-Z ]*$')]],
      numeroIdentificacion: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      username: [null],
      institucion: [null],
      email: [null, [Validators.required, this.fv.correo()]],
      telefonoMovil: [null, [Validators.required, Validators.minLength(10), this.fv.telefono()]],
      telefonoFijo: [null, [Validators.minLength(10), this.fv.telefono()]],
      id: [],
      foto: [],
      titulo: [null, [Validators.minLength(2), Validators.maxLength(100)]],
      descripcion: [null, [Validators.minLength(2), Validators.maxLength(100)]],
      calificacion: [0]
    });
  }

  ngOnInit(): void {
    this.headerService.getMenuSelected().subscribe(ms => {
      this.active = ms;
    });
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    this.isAlumno = this.as.isAlumno();
    this.loadData();
  }

  setNav(nav: string) {
    this.active = nav;
  }

  selectFile(e) {
    const fileList: FileList = e.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];

      const fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length);

      if (fileExtension.toUpperCase() !== 'JPG') {
        this.toastr.error('Formato no válido');
      }  else if (file.size > this.maxSize) {
        this.toastr.error('Tamaño máximo permitido: ' + this.maxSize / 1000 + ' Kb');
      } else {
          const reader = new FileReader();
          reader.onloadend = () => {
            const arrayBuffer: any = reader.result;
            const array = new Uint8Array(arrayBuffer);
            const fileByteArray = [];
            for (let i = 0; i < array.length; i++) {
                fileByteArray.push(array[i]);
            }
            this.usuarioForm.controls.foto.patchValue(fileByteArray);
            this.imgSrc = 'data:image/jpg;base64,' + this._arrayBufferToBase64(arrayBuffer);
            this.usuarioForm.markAsDirty();
          };
          reader.readAsArrayBuffer(file);
      }
    }
  }

  _arrayBufferToBase64( buffer ) {
    let binary = '';
    const bytes = new Uint8Array( buffer );
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
       binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  loadData() {
    if (this.isAlumno) {
      // load profesor
      this.als.getPerfil(this.paramId).subscribe(
        (value: any) => {
          this.usuarioForm.patchValue(value.data);
          this.imgSrc = this.getImageSource();
        }
      );
    } else {
      // load alumno
      this.ps.getPerfil(this.paramId).subscribe(
        (value: any) => {
          this.usuarioForm.patchValue(value.data);
          this.imgSrc = this.getImageSource();
        }
      );

    }
  }

  goDetalleClase(clase: Clase) {
    this.active = 'navdetalleclase';
    this.clase = clase;
  }

  getImageSource() {
    if (this.usuarioForm.controls.foto.value) {
      return `data:image/jpg;base64,${this.usuarioForm.controls.foto.value}`;
    }
  }

  public get usuario(): any {
    return this.usuarioForm.value;
  }

}
