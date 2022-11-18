import {Component, NgZone, OnInit} from '@angular/core';
import {CrudService} from "../../service/crud.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  displayName: string = localStorage.getItem('displayName') || '';

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
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('EXPIRES_IN');
        localStorage.removeItem('displayName');
        console.log("OK - User logged out");
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
