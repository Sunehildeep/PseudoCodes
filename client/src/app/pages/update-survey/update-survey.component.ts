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
      closingDate: [''],
      title: [''],
      surveyName: [''],
      questions: [''],
    });
  }

  ngOnInit(): void {
    this.crudService.GetSurvey(SurveyID).subscribe((res) => {
      this.Survey = res;
      console.log(this.Survey);
    });
  }


  onSubmit(): any {
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
