import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { WeekService, MonthService, WorkWeekService, DayService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService, ScheduleModule, View, GroupModel, EventSettingsModel, ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { resourceData } from './datasource';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, PlayerListComponent, ScheduleModule],
  providers: [ DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService],
  templateUrl: './app.component.html', 
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MyAngularApp';
  @ViewChild('scheduleObj')
  public scheduleObj?: ScheduleComponent;

  public currentView: View = 'Day';
  public showWeekend: boolean = false;
  public allowMultipleOwner: Boolean = true;
  public ownerDataSource: Object[] = [
    { OwnerText: 'Court1', Id: 1 },
    { OwnerText: 'Court2', Id: 2 },
    { OwnerText: 'Court3', Id: 3 }
  ];
  public selectedDate: Date = new Date(2018, 3, 1);
  public views: Array<string> = ['Day', 'Week', 'TimelineWeek', 'TimelineMonth'];
  public eventSettings: EventSettingsModel = {
    dataSource: resourceData
  };
  public group: GroupModel = {
    resources: ['Owners']
  };

  public onDataBound(): void {

    //To get appointments

    if (this.scheduleObj?.currentView == 'Day') {

      var appointments = document.querySelectorAll('.e-appointment');

    }

    else {

      var appointments = document.querySelectorAll('.e-appointment-indicator');

    }

    for (let i = 0; i < appointments.length; i++) {


      let date = appointments[i]?.parentElement?.dataset;
      if (date) {
        var event = this.scheduleObj?.getEvents(new Date(+date), undefined, true); //To get event

        if(event) {
        var categorycolor = event[0]?.['CategoryColor'];

        (appointments[i] as HTMLElement).style.backgroundColor = categorycolor;
        }
      }
    }

  }
}
