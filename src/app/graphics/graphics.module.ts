import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {GraphicsPage} from './graphics.page';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';

const routes: Routes = [
    {
        path: '',
        component: GraphicsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        Ng2GoogleChartsModule
    ],
    declarations: [GraphicsPage]
})
export class GraphicsPageModule {
}
