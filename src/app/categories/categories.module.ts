import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule, Routes} from '@angular/router';

import {CategoriesPage} from './categories.page';
import {AddCategoryComponent} from '../components/add-category/add-category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPage
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CategoriesPage, AddCategoryComponent],
  entryComponents: [AddCategoryComponent]
})
export class CategoriesPageModule {}
