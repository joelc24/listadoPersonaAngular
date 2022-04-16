import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmployeI } from '../../../models/employe/employe.interface'
import { environment } from '../../../../environments/environment';

const initEmployees = {
  areas: [],
  nombre: '',
  fecha: '',
  email: '',
  telefono: '',
  notas: '',
  id: ''
}

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private employe$ = new BehaviorSubject<EmployeI>(initEmployees);

  private API_EMPLOYEES = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get selectedEmployee(): Observable<EmployeI> {
    return this.employe$.asObservable();
  }

  setEmployee(employee: EmployeI): void {
    this.employe$.next(employee);
  }

  public getEmployees(): Observable<EmployeI[]> {
    return this.http.get<EmployeI[]>(this.API_EMPLOYEES);
  }

  public getEmployee(id: string): Observable<EmployeI> {
    return this.http.get<EmployeI>(`${this.API_EMPLOYEES}${id}`);
  }

  public saveEmployee(employee: any): Observable<EmployeI[]> {
    return this.http.post<EmployeI[]>(this.API_EMPLOYEES, employee);
  }

  public deleteEmployee(employee: any): Observable<EmployeI[]> {
    return this.http.delete<EmployeI[]>(`${this.API_EMPLOYEES}${employee.id}`);
  }

  public updateEmployee(employee: any): Observable<EmployeI[]> {
    return this.http.patch<EmployeI[]>(`${this.API_EMPLOYEES}${employee.id}`, employee);
  }
}
