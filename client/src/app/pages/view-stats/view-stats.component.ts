import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {CrudService} from "../../service/crud.service";

let id = localStorage.getItem('id')
let lenCounter;

@Component({
  selector: 'app-view-stats',
  templateUrl: './view-stats.component.html',
  styleUrls: ['./view-stats.component.css']
})
export class ViewStatsComponent implements OnInit {
  answers: any = [];
  count_true: any = [0,0,0,0,0];
  count_false: any = [0,0,0,0,0];

  constructor(public formBuilder: FormBuilder, private router: Router, private ngZone: NgZone, private crudService: CrudService ) { }


  ngOnInit(): void {
    console.log(id)
    this.crudService.getStats(id).subscribe(
      (res) => {
        this.answers = res.data;
        console.log(this.answers);
        for (lenCounter = 0 ; lenCounter < this.answers.length ; lenCounter++) {
          if (this.answers[lenCounter].ans1 == "True") {
            this.count_true[0] += 1;
          } else{
            if (this.answers[lenCounter].ans1 == "False") {
              this.count_false[0] += 1;
            }
          }
          if (this.answers[lenCounter].ans2 == "True") {
            this.count_true[1] += 1;
          } else {
            if (this.answers[lenCounter].ans1 == "False") {
              this.count_false[1] += 1;
            }
          }
          if (this.answers[lenCounter].ans3 == "True") {
            this.count_true[2] += 1;
          } else {
            if (this.answers[lenCounter].ans1 == "False") {
              this.count_false[2] += 1;
            }
          }
          if (this.answers[lenCounter].ans4 == "True") {
            this.count_true[3] += 1;
          } else {
            if (this.answers[lenCounter].ans1 == "False") {
              this.count_false[3] += 1;
            }
          }
          if (this.answers[lenCounter].ans5 == "True") {
            this.count_true[4] += 1;

          } else {
            if (this.answers[lenCounter].ans1 == "False") {
              this.count_false[4] += 1;
            }
          }
        }
        console.log(this.count_true);
        console.log(this.count_false);
      },
      (err) => {
        console.log(err);
      }
    );

  }

}
