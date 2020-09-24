import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'sleepiness',
    loadChildren: () => import('./sleepiness/sleepiness.module').then( m => m.SleepinessPageModule)
  },
  {
    path: 'sleep',
    loadChildren: () => import('./sleep/sleep.module').then( m => m.SleepPageModule)
  },
  {
    path: 'log',
    loadChildren: () => import('./log/log.module').then( m => m.LogPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
