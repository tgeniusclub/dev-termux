import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IonicModule} from '@ionic/angular';

import { TabsPage } from './tabs.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:[

      {
        path: 'termux',
        loadChildren: () => import('../termux/termux.module').then( m => m.TermuxPageModule)
      },
      {
        path: 'kalilinux',
        loadChildren: () => import('../kalilinux/kalilinux.module').then( m => m.KalilinuxPageModule)
      },
      {
        path: 'videos',
        loadChildren: () => import('../videos/videos.module').then( m => m.VideosPageModule)
      },
      {
        path: 'about',
        loadChildren: () => import('../about/about.module').then( m => m.AboutPageModule)
      }
    ]
  },
  {
    path:'',
    redirectTo: 'tabs/termux',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
