import { ChangePasswordPageModule } from './pages/change-password/change-password.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./pages/forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },

  {
    path: 'loginscreen',
    loadChildren: () => import('./pages/loginscreen/loginscreen.module').then( m => m.LoginscreenPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'termux',
    loadChildren: () => import('./pages/termux/termux.module').then( m => m.TermuxPageModule)
  },
  {
    path: 'kalilinux',
    loadChildren: () => import('./pages/kalilinux/kalilinux.module').then( m => m.KalilinuxPageModule)
  },
  {
    path: 'videos',
    loadChildren: () => import('./pages/videos/videos.module').then( m => m.VideosPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  
  {
    path: 'publisher',
    loadChildren: () => import('./pages/publisher/publisher.module').then( m => m.PublisherPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate:[AuthGuard]
    
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./pages/editprofile/editprofile.module').then( m => m.EditprofilePageModule),
    canActivate:[AuthGuard]
  },
  {
    path:'change-password',
    loadChildren:() => import('./pages/change-password/change-password.module').then( m => m.ChangePasswordPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: '""',
    loadChildren: () => import('./page-not-found/page-not-found.module').then( m => m.PageNotFoundPageModule)
  },
 
  {
    path: 'posts',
    loadChildren: () => import('./pages/posts/posts.module').then( m => m.PostsPageModule)
  },
  {
    path: 'post-detail/:id',
    loadChildren: () => import('./pages/post-detail/post-detail.module').then( m => m.PostDetailPageModule)
  },

  {
    path: 'profileimage',
    loadChildren: () => import('./pages/profileimage/profileimage.module').then( m => m.ProfileimagePageModule)
  },
  {
    path: 'toolview',
    loadChildren: () => import('./pages/toolview/toolview.module').then( m => m.ToolviewPageModule)
  },
  {
    path: 'termux-api',
    loadChildren: () => import('./pages/termux-api/termux-api.module').then( m => m.TermuxApiPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'zphisher',
    loadChildren: () => import('./pages/zphisher/zphisher.module').then( m => m.ZphisherPageModule)
  }
  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
