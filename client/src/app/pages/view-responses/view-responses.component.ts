import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {CrudService} from "../../service/crud.service";

let SurveyID = localStorage.getItem('id')

@Component({
  selector: 'app-view-responses',
  templateUrl: './view-responses.component.html',
  styleUrls: ['./view-responses.component.css']
})
export class ViewResponsesComponent implements OnInit {
  answers: any = [];


  constructor(public formBuilder: FormBuilder, private router: Router, private ngZone: NgZone, private crudService: CrudService ) { }


  ngOnInit(): void {
    this.crudService.getResponses(SurveyID).subscribe(
      (res) => {
        this.answers = res.data;
        console.log(this.answers);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
