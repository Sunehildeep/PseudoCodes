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
    if(sessionStorage.getItem('id_token') == null) {
      alert("Please login first");
      this.ngZone.run(() => this.router.navigateByUrl('/login'))
    }
  }

  onSubmit(): any {
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
