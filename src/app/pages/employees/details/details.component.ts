import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from '../services/employees.service';
import { EmployeI } from '../../../models/employe/employe.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  employees: any = []

  selectedEmployee$ = this.service.selectedEmployee
  constructor(private service: EmployeesService,
    private router: Router) { }

  ngOnInit(): void {
    this.selectedEmployee$.subscribe(data => {
      this.employees = data
    })
    console.log('empleado->',this.employees)
  }

  onEdit(): void {
    this.router.navigate(['edit']);
  }

  onDelete(): void {
    let resp = false
    resp = confirm('¿Está seguro de eliminar este registro?');
    if(resp){
      
          this.service.deleteEmployee(this.employees).subscribe(data => {
            console.log(data)
            resp = false
            this.router.navigate(['list']);
        })
      
    
  }
  }

}
