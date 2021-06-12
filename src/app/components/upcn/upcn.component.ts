import { Component } from '@angular/core';
import { UpcnService } from 'src/app/services/upcn.service';

@Component({
  selector: 'app-upcn',
  templateUrl: './upcn.component.html',
  styleUrls: ['./upcn.component.scss']
})
export class UpcnComponent {

  constructor(private upcnService: UpcnService) { }

  ingresarUpcn() {
    window.location.href = this.upcnService.getUrlLoginUpcn();
  }

}
