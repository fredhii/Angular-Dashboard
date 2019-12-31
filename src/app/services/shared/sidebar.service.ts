import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      title: 'Main',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Progress Bar', url: '/progress' },
        { title: 'Graphics', url: '/graphic1' },
        { title: 'Promises', url: '/promesas' },
        { title: 'Rxjs', url: '/rxjs' }
      ]
    }
  ];

  constructor() { }
}
