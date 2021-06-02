import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderService } from 'src/app/services/header.service';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { UpcnService } from 'src/app/services/upcn.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-upcn-call-back',
  templateUrl: './upcn-call-back.component.html',
  styleUrls: ['./upcn-call-back.component.scss']
})
export class UpcnCallBackComponent implements OnInit {

  constructor(private upcnService: UpcnService,
              private activatedRoute: ActivatedRoute,
              protected router: Router,
              private seguridadService: SeguridadService,
              private headerService: HeaderService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    let state;
    let code;
    this.activatedRoute.queryParams.subscribe(params => {
      code = params.code;
      state = params.state;
    });

    const stateStorage = localStorage.getItem('state');

    if (state === Md5.hashStr(stateStorage).toString()) {
      this.upcnService.login(code, state,
        (status) =>
        {
          if (status) {
            const userId = this.seguridadService.getUser().id;
            this.headerService.setMenuSelected('navclases');
            this.router.navigate([ '/usuario/' + userId]);
          } else {
            this.toastr.error('Usuario o contraseña invalido');
          }
        });
    } else {
      this.router.navigate(['/login']);
    }
  }

}
