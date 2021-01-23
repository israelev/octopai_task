import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './components/search/search.component';
import { CategoryComponent } from './components/category/category.component';
import {PlaylistComponent}  from './components/playlist/playlist.component';
const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
      path:'home',
      component: SearchComponent
    },
    {
      path: 'category/:id',
      component: CategoryComponent
    },
    {
      path: 'playlist/:id',
      component: PlaylistComponent
    },
    {
      path: 'myplaylist',
      component: PlaylistComponent
    }
   
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation:"reload"})],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
