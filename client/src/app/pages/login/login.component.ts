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
    if(sessionStorage.getItem('id_token') !== null) {
      this.ngZone.run(() => this.router.navigateByUrl('/active-surveys'))
    }
  }

  onSubmit(): any {
    this.crudService.Login(this.loginForm.value).subscribe(
      (res) => {
        console.log('User logged in!');
        sessionStorage.setItem('id_token', 'Bearer '+res.token);
        sessionStorage.setItem('EXPIRES_IN', res.expiresIn);
        sessionStorage.setItem('displayName', res.user.displayName);
        sessionStorage.setItem('user', JSON.stringify(res.user));

        window.location.href="/active-surveys";
        
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
