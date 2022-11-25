import {Component, NgZone, OnInit} from '@angular/core';
import { CrudService } from '../../service/crud.service';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

let SurveyID = localStorage.getItem('id')

@Component({
  selector: 'app-update-survey',
  templateUrl: './update-survey.component.html',
  styleUrls: ['./update-survey.component.css']
})
export class UpdateSurveyComponent implements OnInit {
  Survey: any = [];


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
      questions: [''],
    });
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('id_token') == null) {
      alert("Please login first");
      this.ngZone.run(() => this.router.navigateByUrl('/login'))
    }
    else {
      this.crudService.GetSurvey(SurveyID).subscribe((res) => {
        console.log(res.data.questions);
        this.surveyForm.setValue({author: res.data.author, startDate: res.data.startDate, closeDate: res.data.closeDate, surveyName: res.data.surveyName, questions: res.data.questions});
      });
    }
  }


  onSubmit(): any {
    // Check if form is filled out
    if (this.surveyForm.value.author == '' || this.surveyForm.value.startDate == '' || this.surveyForm.value.closeDate == '' || this.surveyForm.value.title == '' || this.surveyForm.value.surveyName == '' || this.surveyForm.value.questions == '') {
      return alert("Please fill out all fields");
    }
    console.log(this.surveyForm.value.questions);
    this.crudService.UpdateSurvey(SurveyID, this.surveyForm.value).subscribe(
      () => {
        console.log('Survey added edited!');
        this.ngZone.run(() => this.router.navigateByUrl('/active-surveys'));
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
