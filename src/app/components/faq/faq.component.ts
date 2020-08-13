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
  ) {}

  ngOnInit()
    :
    void {
    this.loadData();
  }



  loadData() {
    // this.faqs = this.fs.getPreguntasMock();
    this.fs.getPreguntas().subscribe(
      data => {
        if (data?.data) {
          this.faqs = [];
          data.data.forEach( q => {

            this.faqs.push(
              {id: q.id, answer: q.answer, question: q.question });
          });
        }
      },
      error => {
        console.error(error);
      }
      );
  }

}

