import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from '../services/employees.service';
import { EmployeI } from '../../../models/employe/employe.interface';
import Swal from 'sweetalert2'
import { formatFecha } from '../../../shared/helpers';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  
 
  employees: EmployeI[] = []
  fecha = formatFecha;
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

  Departamentos(item: EmployeI): void {
    this.router.navigate([`edit/${item.id}`]);
  }

  Eliminar(item: EmployeI): void{
    Swal.fire({
      title: '¿Está seguro de eliminar este registro?',
      text: "Una vez Eliminado no Podra Recuperarse!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'El Registro del Empleado Fue Borrado Satisfactoriamente.',
          'success'
        )
        this.service.deleteEmployee(item).subscribe(data => {
          this.employees = this.employees.filter((employe: any) => employe.id !== item.id)
          console.log(data)
        })
      }
    })
  } 

}
