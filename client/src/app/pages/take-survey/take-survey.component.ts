import {Component, NgZone, OnInit} from '@angular/core';
import { CrudService } from '../../service/crud.service';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.css']
})
export class TakeSurveyComponent implements OnInit {
  Survey: any = [];

  //surveyForm: FormGroup;

  constructor( public formBuilder: FormBuilder, private router: Router, private ngZone: NgZone, private crudService: CrudService)
  {

  }

  ngOnInit(): void {
  }

}
