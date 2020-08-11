import { Injectable } from '@angular/core';
import {Faq} from "../entities/faq";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  _faqs: Faq[] = [];

  constructor() { }

  public getPreguntas() : Observable<Faq[]>
  {
      if (!(this._faqs.length > 0))
          this._setPreguntas();

      return of(this._faqs);
  }


  private _setPreguntas() {
    this._faqs = [];

    this._faqs.push({
      id: 1,
      question: '¿Cómo se accede al material de estudio?',
      answer: 'Todo el material de estudio se encuentra disponible en la plataforma, a la cual podrás acceder a través de cualquier dispositivo con conexión a Internet. Una vez que te inscribas y se acredite el pago de tu formación, recibirás un mail con la confirmación de pago. El día de inicio del curso estarás recibiendo la información necesaria para acceder a la plataforma.'
    });
    this._faqs.push({
      id: 2,
      question: '¿Cuáles son los requerimientos a nivel técnico que necesito para poder realizar un curso online?',
      answer: 'Podrás estudiar a través de google Chrome, corriendo sobre los sistemas operativos: Windows, Mac, OS, Linux o Tablet con iOS 4.2 (o superior), Tablet con Android 5 (o superior).'
    });
    this._faqs.push({
      id: 3,
      question: '¿Cómo me inscribo en un curso online?',
      answer: 'Primero puedes buscar a travez de la web un curso y profesor. Luego deberás registrarte como alumno e inscribirte el curso. Podrás comenzar a cursar luego de que se acredite el pago del curso seleccionado'
    });
    this._faqs.push({
      id: 4,
      question: '¿Cómo se abona un curso?',
      answer: 'Una vez registrado con la carga de tus datos en el formulario de contacto, los asesores de Teach realizarán tu preinscripción y te acompañarán en el proceso de pago telefónico o pago electrónico'
    });
    this._faqs.push({
      id: 5,
      question: '¿Cúales son las formas de pago?',
      answer: `
    <ul>
        <li>Pago Fácil</li>
        <li>Cobro Express</li>
        <li>Rapi Pago</li>
        <li>Tarjetas VISA, MASTERCARD y AMEX.</li>
        <li>Tarjeta Naranja</li>
        <li>Pago en sucursales de Santander Río, y Galicia</li>
        <li>Pago en agentes de Western Union en un solo pago.</li>
        <li>Con Tarjeta de Débito en un solo pago.</li>
        <li>Con Tarjeta de Crédito en las cuotas y con los recargos que rigen para cada Tarjeta</li>
        </ul>
    `
    });

    // this._faqs.forEach( function (faq, idx, aFaq) {
    //     aFaq[idx].question = '<i class="fas fa-plus-circle"></i> ' + faq.question;
    //   });
    //
    // return this._faqs;

  }
}
