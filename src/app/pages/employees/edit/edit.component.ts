import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  
  editForm!: FormGroup;
  selectedEmployee$ = this.service.selectedEmployee
  constructor( private readonly fb: FormBuilder, 
    private service: EmployeesService, 
    private router: Router) { 
      
  }

  ngOnInit(): void {
    this.editForm = this.initForm();
    this.selectedEmployee$.subscribe(data => {
      this.editForm.patchValue(data)
    })
  }

  

  onSubmit(): void {
    this.service.updateEmployee(this.editForm.value).subscribe(data => {
      console.log('data->', data);
      this.editForm.reset();
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
       telefono: ['',[Validators.required, Validators.minLength(10)]],
       id: ['']
     })
   }
}
