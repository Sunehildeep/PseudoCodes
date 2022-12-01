import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { CrudService } from "../../service/crud.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message: string = '';

  registerForm: FormGroup;
 
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.registerForm = this.formBuilder.group({
      username: [''],
      email: [''],
      displayName: [''],
      password: [''],
    });
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('id_token') !== null) {
      this.ngZone.run(() => this.router.navigateByUrl('/active-surveys'))
    }
  }

  onSubmit(): any {
    this.crudService.Register(this.registerForm.value).subscribe(
      (res) => {
        console.log('User registered!');
        
        this.ngZone.run(() => this.router.navigateByUrl('/login'))
        window.location.reload();
      },
      (err) => {
        console.log(err);
        this.message = err;
      }
    );
  }

}
