
import { HomeComponent } from './home/home.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { CoachesComponent } from './coaches/coaches.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SettingsComponent } from './settings/settings.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: '', component: LoginComponent },
    { path: 'players', component: PlayerListComponent, canActivate: [AuthGuard] },
    { path: 'coaches', component: CoachesComponent, canActivate: [AuthGuard] },
    { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] }, 
    { path: '**', component: NotFoundComponent } 
];
