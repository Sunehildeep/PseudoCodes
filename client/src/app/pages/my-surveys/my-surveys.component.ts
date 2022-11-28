import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service';

@Component({
  selector: 'app-active-surveys',
  templateUrl: './my-surveys.component.html',
  styleUrls: ['./my-surveys.component.css'],
})
export class MySurveysComponent implements OnInit {
  Surveys: any = [];

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.crudService.GetSurveys().subscribe((res) => {
      this.Surveys = res;
      console.log(this.Surveys);
    });
  }

  saveId(id:any, i: any) {
    let MId = String(id) ;
    localStorage.setItem('id', MId);
    console.log(MId)
  }

}

