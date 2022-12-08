import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service';

@Component({
  selector: 'app-active-surveys',
  templateUrl: './active-surveys.component.html',
  styleUrls: ['./active-surveys.component.css'],
})
export class ActiveSurveysComponent implements OnInit {
  Surveys: any = [];

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.crudService.GetSurveys().subscribe((res) => {
      this.Surveys = res;
      console.log(this.Surveys);
    });
  }

  deleteSurvey(id: any, i: any) {
    if (window.confirm('Are you sure?')) {
      this.crudService.DeleteSurvey(id).subscribe((res) => {
        this.Surveys.splice(i, 1);
      });
    }
  }
  saveId(id: any, i: any) {
    let MId = String(id);
    localStorage.setItem('id', MId);
    console.log(MId);
  }
}
