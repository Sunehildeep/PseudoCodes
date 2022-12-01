import {Component, NgZone, OnInit} from '@angular/core';
import { CrudService } from '../../service/crud.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

let author: string = sessionStorage.getItem('displayName') || '';
console.log(author)

@Component({
  selector: 'app-my-surveys',
  templateUrl: './my-surveys.component.html',
  styleUrls: ['./my-surveys.component.css'],
})
export class MySurveysComponent implements OnInit {
  Surveys: any = [];

  constructor(private crudService: CrudService, private ngZone: NgZone,private router: Router) {}

  ngOnInit(): void {
    if(sessionStorage.getItem('id_token') == null) {
      alert("Please login first");
      this.ngZone.run(() => this.router.navigateByUrl('/login'))
    }
    else {
      this.crudService.GetMySurveys(author).subscribe(
      (res) => {
        this.Surveys = res.data;
        console.log(this.Surveys);
      },
      (err) => {
        console.log(err);
      }
    );
    }
  }

  saveId(id:any, i: any) {
    let MId = String(id) ;
    localStorage.setItem('id', MId);
    console.log(MId)
  }

}

