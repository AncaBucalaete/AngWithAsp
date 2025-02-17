import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { CoachesComponent } from './coaches/coaches.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SettingsComponent } from './settings/settings.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'players', component: PlayerListComponent },
    { path: 'coaches', component: CoachesComponent },
    { path: 'schedule', component: ScheduleComponent },
    { path: 'settings', component: SettingsComponent },
    { path: '**', component: NotFoundComponent } 
];
