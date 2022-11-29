import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {CrudService} from "../../service/crud.service";

@Component({
  selector: 'app-view-responses',
  templateUrl: './view-responses.component.html',
  styleUrls: ['./view-responses.component.css']
})
export class ViewResponsesComponent implements OnInit {
  survey: any;
  answers: any;

  constructor(public formBuilder: FormBuilder, private router: Router, private ngZone: NgZone, private crudService: CrudService ) { }

  getResponses(){

  }


  ngOnInit(): void {
  }

}
