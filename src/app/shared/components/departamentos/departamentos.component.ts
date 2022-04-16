import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from 'src/app/pages/employees/services/employees.service';
import { formatFecha } from '../../helpers'


@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.scss']
})
export class DepartamentosComponent implements OnInit {

  departamentos!: FormGroup;
  constructor(private router: Router, private activateRouter: ActivatedRoute, private service: EmployeesService, private readonly fb: FormBuilder) { }

  id: string = '';
  data: any = [];
  fecha = formatFecha;
  ngOnInit(): void {
    this.departamentos = this.initForm();
    this.activateRouter.params.subscribe(params => {
      this.id = params['id'];
    })

    this.service.getEmployee(this.id).subscribe(data => {
      this.data = data;
       data.areas && this.loadDepartamentos(data.areas);
       this.departamentos.patchValue(data);
    })
   
  }

  onSubmit(): void {
    console.log('data->', this.departamentos.value);
    this.service.updateEmployee(this.departamentos.value).subscribe(data => {
      console.log('data->', data);
      this.departamentos.reset();
      this.router.navigate(['/list']);
    })
  }

  


  get areas() {
    return this.departamentos.get('areas') as FormArray;
  }

  loadDepartamentos(datos: any) {
    console.log('data->', datos);
    datos.forEach((element: any, index: number) => {
      if(index != 0){
        this.areas.push(this.fb.control(element,Validators.compose([Validators.required, Validators.minLength(5)])));
      }
     
    });
   
  }

  addDepartamento() {
    this.areas.push(this.fb.control('',Validators.compose([Validators.required, Validators.minLength(5)])));
  }

  deletDepart(index: number): void {
    this.areas.removeAt(index);
  }

  initForm():FormGroup{
    return this.fb.group({
       nombre: ['',Validators.compose([Validators.required, Validators.minLength(3)])],
       email: ['',Validators.compose([Validators.required, Validators.email])],
       fecha: ['',[Validators.required]],
       notas: [''],
       telefono: ['',Validators.compose([Validators.required, Validators.minLength(10)])],
       id: ['',[Validators.required]],
       areas: this.fb.array([
         this.fb.control('',Validators.compose([Validators.required, Validators.minLength(5)]))
       ])
     })
   }

}
