import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from '../services/employees.service';
import { EmployeI } from '../../../models/employe/employe.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  
 
  employees: EmployeI[] = []

  constructor(private service: EmployeesService, private router: Router) { }

  ngOnInit(): void {
    this.service.getEmployees().subscribe(data => {
      this.employees = data
      console.log(this.employees)
    })
  }


  Editar(item: EmployeI): void{
    this.service.setEmployee(item)
    this.router.navigate(['edit']); 
  }

  Ver(item: EmployeI): void{
    this.service.setEmployee(item)
    this.router.navigate(['details']);
  }

  Eliminar(item: EmployeI): void{
    const resp = confirm('¿Está seguro de eliminar este registro?');
    if(resp){
      this.service.deleteEmployee(item).subscribe(data => {
        this.employees = this.employees.filter((employe: any) => employe.id !== item.id)
        console.log(data)
      })
    }
  } 

}
