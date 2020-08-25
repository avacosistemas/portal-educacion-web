import { Injectable } from '@angular/core';
import { AbstractControl, Form, FormControl, FormGroup, ValidatorFn } from "@angular/forms";
import { setHebrewDay } from "@ng-bootstrap/ng-bootstrap/datepicker/hebrew/hebrew";

@Injectable({
  providedIn: 'root'
})
export class FormsValidationService
{

  form: FormGroup;

  constructor() { }


  /**
   * Avaco pide que la expresión regular sea /^\s*?(.+)@(.+?)\s*$/
   * Esta expresión permite valores como usuario@server faltando el tipo de dominio
   * Debería ser usuario@server.com o usuario@server.com.ar
   *
   * Sin embargo la expresión regular /^\S+@\S+\.\S+$/
   * cumple mejor con el requisito de la estructura de un email. Usare esta pero dejaré habilitado
   * que se pueda pasar la expresión a validar como parametro
   *
   * @description Verifica que el valor del control sea un string con estructura de email.
   * @param regularExpression Expresión regular a validar
   * @param flags flags de la  Expresión regular a validar (default g)
   */
  correo(regularExpression?: string, flags?: string) : ValidatorFn
  {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (!control.value) return null;
      const reg =  regularExpression || '^\\S+@\\S+\\.\\S+$';
      const regex = new RegExp(reg, flags);
      const ret = regex.test(control.value);
      return ret ? null : {correo: true };
    };
  }

  telefono() : ValidatorFn
  {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if(!control.value) return null;
      const regex = /^\+?\d+(-\d+| \d+)*$/;
      const ret = regex.test(control.value);
      return ret ? null : {telefono: true };
    };
  }

  usuario(): ValidatorFn
  {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (!control.value) return null;
      const regex = /^[a-z][a-z0-9_-]{4,40}$/;
      const ret = regex.test(control.value);
      return ret ? null : {usuario: true };
    };
  }




  /**
   * la clave debe contener al menos 1 número (0-9)
   * la clave debe contener al menos 1 letra mayúscula
   * la clave debe contener al menos 1 letra minúscula
   * la clave debe contener al menos 1 valor no alfanumérico
   * la clave debe tener entre 4 y 16 caracteres
   */
  claveSimple() : ValidatorFn
  {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (!control.value) return null;
      const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$/gm;
      const ret = regex.test(control.value);
      return ret ? null : {clave: true };
    };
  }

  /**
   * la clave debe contener al menos 1 número (0-9)
   * la clave debe contener al menos 1 letra mayúscula
   * la clave debe contener al menos 1 letra minúscula
   * la clave debe contener al menos 1 valor no alfanumérico
   * la clave debe tener entre 4 y 16 caracteres
   */
  clave() : ValidatorFn
  {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (!control.value) return null;
      const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$/gm;
      const ret = regex.test(control.value);
      return ret ? null : {clave: true };
    };
  }

  condiciones() : ValidatorFn
  {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return control.value ? null : {condiciones: true };
    };
  }


}
