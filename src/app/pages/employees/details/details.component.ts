import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from '../services/employees.service';
import Swal from 'sweetalert2';
import { formatFecha } from '../../../shared/helpers';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  employees: any = []

  selectedEmployee$ = this.service.selectedEmployee

  fecha = formatFecha;
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
        this.service.deleteEmployee(this.employees).subscribe(data => {
          console.log(data)
        })
        Swal.fire(
          'Eliminado!',
          'El Registro del Empleado Fue Borrado Satisfactoriamente.',
          'success'
        ).then(()=>{
          this.router.navigate(['list']);
        })
      }
    })
  }

}
