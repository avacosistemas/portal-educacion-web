import { Component, OnInit } from '@angular/core';
import { Faq } from "../../entities/faq";
import { FaqService } from "../../services/faq.service";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: [ './faq.component.scss' ],
})
export class FaqComponent implements OnInit {

  faqs: Faq[];

  constructor(
    protected fs: FaqService
  ) {
    this.loadData();
  }

  ngOnInit()
    :
    void {
    this.loadData();
  }



  loadData() {
    // this.faqs = this.fs.getPreguntas();
    this.fs.getPreguntas().subscribe(
      data => {
        this.faqs = data;
      });
  }

}

