import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit.component';
import { DepartamentosComponent } from '../../../shared/components/departamentos/departamentos.component';

const routes: Routes = [
  { path: '', component: EditComponent },
  { path: ':id', component: DepartamentosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRoutingModule { }
