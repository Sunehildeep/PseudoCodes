import {Component, NgZone, OnInit} from '@angular/core';
import { CrudService } from '../../service/crud.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

let SurveyID = localStorage.getItem('id')

@Component({
  selector: 'app-update-survey',
  templateUrl: './update-survey.component.html',
  styleUrls: ['./update-survey.component.css']
})
export class UpdateSurveyComponent implements OnInit {
  Survey: any = [];
  questions: any= [];
  surveyType: any;
  surveyForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.surveyForm = this.formBuilder.group({
      author: [''],
      startDate: [''],
      closeDate: [''],
      surveyName: [''],
      surveyType: [''],
      questions: ['']
    });
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('id_token') == null) {
      alert("Please login first");
      this.ngZone.run(() => this.router.navigateByUrl('/login'))
    }
    else {
      this.crudService.GetSurvey(SurveyID).subscribe((res) => {
        this.Survey = res.data.questions;
        console.log(res.data);
        for(var i = 0; i < this.Survey.length; i++) {
          console.log(this.Survey[i]);
          this.surveyForm.addControl('question'+i, new FormControl(this.Survey[i]));
        }
        this.surveyForm.patchValue({author: res.data.author, startDate: res.data.startDate, closeDate: res.data.closeDate,  surveyName: res.data.surveyName, surveyType: res.data.surveyType});
       
      });
    }
  }


  tfClick(){
    this.surveyForm.value.surveyType = "TF";
  }

  shortAClick() {
    this.surveyForm.value.surveyType = "SA"
  }


  onSubmit(): any {
    // Check if form is filled out
    if (this.surveyForm.value.author == '' || this.surveyForm.value.startDate == '' || this.surveyForm.value.closeDate == '' || this.surveyForm.value.title == '' || this.surveyForm.value.surveyName == '') {
      return alert("Please fill out all fields");
    }
    // Create array of questions
    let control = '';
    for(var i = 0; i < this.Survey.length; i++) {
      control = 'question'+i;
      this.questions[i] = this.surveyForm.value[control];
    }

    this.surveyForm.value.questions = this.questions;



    this.crudService.UpdateSurvey(SurveyID, this.surveyForm.value).subscribe(
      () => {
        console.log('Survey edited!');
        this.ngZone.run(() => this.router.navigateByUrl('/active-surveys'));
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
