import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map, tap } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate 
{
  constructor
  (
    private auth:AuthService,
    private router:Router
  )
  { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {
    return this.auth.user$.pipe(
      take(1),
      map(user => user? true:false),
      tap(isLoggedIn =>{
        if(!isLoggedIn)
        {
          this.router.navigate(['/loginscreen']);
          return false;
        }
        return true;
      })
    );
  }
  
}
