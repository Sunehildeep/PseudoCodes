import {Component, NgZone, OnInit} from '@angular/core';
import { CrudService } from '../../service/crud.service';
import {FormBuilder, FormGroup} from "@angular/forms";
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

  constructor( public formBuilder: FormBuilder, private router: Router, private ngZone: NgZone, private crudService: CrudService)

    {
      this.surveyForm = this.formBuilder.group({
        surveyName: [''],
        questions: [''],
      });
  }

  ngOnInit(): void
  {
    if(sessionStorage.getItem('id_token') == null) {
      alert("Please login first");
      this.ngZone.run(() => this.router.navigateByUrl('/login'))
    }
    else {
      this.crudService.GetSurvey(SurveyID).subscribe((res) => {
        console.log(res.data.questions[0]);
        this.Survey = res.data;
        this.surveyForm.setValue({surveyName: res.data.surveyName, questions: res.data.questions[0]});
        //this.surveyForm.setParent({  questions: res.data.questions})
      });
    }
  }


}
