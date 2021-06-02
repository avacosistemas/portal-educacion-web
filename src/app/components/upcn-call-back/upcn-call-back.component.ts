import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
              private authService: AuthService) { }

  ngOnInit(): void {
    let state;
    let code;
    this.activatedRoute.queryParams.subscribe(params => {
      code = params.code;
      state = params.state;
    });

    const stateStorage = localStorage.getItem('state');

    if (state === Md5.hashStr(stateStorage).toString()) {
      this.upcnService.login(code, state).subscribe(data => {
        if (data && data.token) {
          this.authService.setToken(data.token);
          this.authService.setLogged(true);
          this.router.navigate(['/']);
        } else {
          this.authService.setLogged(false);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

}
