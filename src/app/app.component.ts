import { Component, OnInit } from '@angular/core';
import { ToasterService } from './modules/fwk/core/service/toaster/toaster.service';
import { ToasterEnum } from './modules/fwk/core/enum/toaster.enum';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private toasterService: ToasterService,
              private spinner: NgxSpinnerService) {  }
  title = 'portal-educacion-web';

  ngOnInit() {
    // this.toasterService.show(ToasterEnum.success, 'Titulo', 'Bienvenido');
    /** spinner starts on init */
    // this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);

  }
}
