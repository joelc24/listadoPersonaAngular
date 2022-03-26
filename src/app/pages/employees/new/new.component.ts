import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from '../services/employees.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  addForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder, 
    private service: EmployeesService, 
    private router: Router) { }

  ngOnInit(): void {
    this.addForm = this.initForm();
  }


  onSubmit(): void {
    console.log('submit');
    console.log('Form->', this.addForm.value);
    this.service.saveEmployee(this.addForm.value).subscribe(data => {
      console.log('data->', data);
      this.addForm.reset();
      this.router.navigate(['/list']);
    },
    error => { console.log('error->', error)})
  }

  initForm():FormGroup{
   return this.fb.group({
      nombre: ['',[Validators.required, Validators.minLength(3)]],
      email: ['',[Validators.required, Validators.email]],
      fecha: ['',[Validators.required]],
      notas: [''],
    })
  }
}
