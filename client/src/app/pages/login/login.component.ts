import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {CrudService} from "../../service/crud.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message: string = '';

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  ngOnInit(): void {
    if(localStorage.getItem('ACCESS_TOKEN') !== null) {
      this.ngZone.run(() => this.router.navigateByUrl('/active-surveys'))
    }
  }

  onSubmit(): any {
    this.crudService.Login(this.loginForm.value).subscribe(
      (res) => {
        console.log('User logged in!');
        localStorage.setItem('ACCESS_TOKEN', res.token);
        localStorage.setItem('EXPIRES_IN', res.expiresIn);
        localStorage.setItem('displayName', res.user.displayName);

        console.log(localStorage.getItem('ACCESS_TOKEN'));
        console.log(localStorage.getItem('displayName'));
        this.ngZone.run(() => this.router.navigateByUrl('/active-surveys'))
        window.location.reload();
      },
      (err) => {
        console.log(err);
        this.message = err.error.message;
      }
    );
  }

}
