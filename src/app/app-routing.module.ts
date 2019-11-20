import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomePageModule'
    },
    {
        path: 'categories',
        loadChildren: './categories/categories.module#CategoriesPageModule'
    },
    {
        path: 'options',
        loadChildren: './options/options.module#OptionsPageModule'
    },
    {
        path: 'report',
        loadChildren: './report/report.module#ReportPageModule'
    },
    {
        path: 'graphics',
        loadChildren: './graphics/graphics.module#GraphicsPageModule'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
