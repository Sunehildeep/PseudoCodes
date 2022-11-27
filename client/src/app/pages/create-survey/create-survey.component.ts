import {Component, NgZone, OnInit} from '@angular/core';
import { CrudService } from '../../service/crud.service';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {

  surveyForm: FormGroup;
  questions: any = [];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.surveyForm = this.formBuilder.group({
      author: [''],
      startDate: [''],
      closingDate: [''],
      title: [''],
      surveyName: [''],
      question0: [''],
      question1: [''],
      question2: [''],
      question3: [''],
      question4: ['']
    });
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('id_token') == null) {
      alert("Please login first");
      this.ngZone.run(() => this.router.navigateByUrl('/login'))
    }
  }

  onSubmit(): any {

    let control = '';
    for(var i = 0; i < 5; i++) {
      control = 'question'+i;
      this.questions[i] = this.surveyForm.value[control];
    }
    this.surveyForm.value.questions = this.questions;
    console.log(this.surveyForm.value.questions);

    this.crudService.CreateSurvey(this.surveyForm.value).subscribe(
      () => {
        console.log('Survey added successfully!');
        this.ngZone.run(() => this.router.navigateByUrl('/active-surveys'));
      },
        (err) => {
          console.log(err);
        }
    );
  }
}
