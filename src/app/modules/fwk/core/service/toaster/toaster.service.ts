import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToasterEnum } from '../../enum/toaster.enum';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  private configToaster: object = {closeButton : true , progressBar : true};

  constructor(private toastr: ToastrService) { }

  show(type: ToasterEnum, title: string, message: string) {
    switch (type) {
      case ToasterEnum.success:
          this.toastr.success(message, title, this.configToaster);
          break;
      case ToasterEnum.info:
          this.toastr.info(message, title, this.configToaster);
          break;
      case ToasterEnum.warning:
          this.toastr.warning(message, title, this.configToaster);
          break;
      case ToasterEnum.error:
          this.toastr.error(message, title, this.configToaster);
          break;
    }
  }
}
