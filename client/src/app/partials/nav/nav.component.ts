import {Component, NgZone, OnInit} from '@angular/core';
import {CrudService} from "../../service/crud.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  displayName: string = sessionStorage.getItem('displayName') || '';
  
  constructor(
    private crudService: CrudService,
    private router: Router,
    private ngZone: NgZone,
  ) { }

  ngOnInit(): void {

  }

  onLogout(): void {
    this.crudService.Logout().subscribe(
      () => {
        sessionStorage.removeItem('id_token');
        sessionStorage.removeItem('EXPIRES_IN');
        sessionStorage.removeItem('displayName');
        console.log("OK - User logged out");
        window.location.href="/home";
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
