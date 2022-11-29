import { Component, NgZone, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

let SurveyID = localStorage.getItem('id')

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.css']
})
export class TakeSurveyComponent implements OnInit {
  Survey: any = [];
  surveyForm: FormGroup;
  surveyName: String = '';
  answers: any = [];
  SurveyID: any = [];


  constructor( public formBuilder: FormBuilder, private router: Router, private ngZone: NgZone, private crudService: CrudService)

  {
    this.surveyForm = this.formBuilder.group({
      answer1: [''],
      answer2: [''],
      answer3: [''],
      answer4: [''],
      answer5: [''],
      SurveyID: ['']
    });
  }

  onSubmit() {

    this.crudService.saveSurvey(this.SurveyID, this.surveyForm).subscribe(() => {
        console.log('Survey Answers Saved successfully!');
        console.log(this.answers);

      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  ngOnInit(): void
  {
    if(sessionStorage.getItem('id_token') == null) {
      alert("Please login first");
      this.ngZone.run(() => this.router.navigateByUrl('/login'))
    }
    else {
      this.crudService.GetSurvey(SurveyID).subscribe((res) => {
        this.Survey = res.data.questions;

        for(let i = 0; i < this.Survey.length; i++) {
          console.log(this.Survey[i]);
          this.surveyForm.addControl('answer'+i, new FormControl(''));
        }
        this.surveyName = res.data.surveyName;

      });
    }
  }


}
