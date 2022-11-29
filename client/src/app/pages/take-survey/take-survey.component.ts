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
 

  constructor( public formBuilder: FormBuilder, private router: Router, private ngZone: NgZone, private crudService: CrudService)

  {
    this.surveyForm = this.formBuilder.group({
      answer1: [''],
      answer2: [''],
      answer3: [''],
      answer4: [''],
      answer5: [''],
      surveyID: SurveyID,
      participant: sessionStorage.getItem('displayName'),
    });
  }

  onSubmit() {
    console.log(this.surveyForm.value);
    this.crudService.saveSurvey(this.surveyForm.value).subscribe(() => {
        console.log('Survey Survey_responses Saved successfully!');
        alert("Your responses were recorded successfully.");
        this.ngZone.run(() => this.router.navigateByUrl('/active-surveys'))
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
        this.surveyForm.value.surveyID = res.data._id;
  
        this.surveyName = res.data.surveyName;

      });
    }
  }


}
