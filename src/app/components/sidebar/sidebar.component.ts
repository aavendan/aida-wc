import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/user-settings', title: 'Profile',  icon:'person', class: '' },
    { path: '/suggested-questions', title: 'Suggested Questions',  icon:'view_headline', class: '' },
    
    { path: '/one-question', title: 'One Question',  icon: 'label_important', class: '' },
    { path: '/others-questions', title: 'Others Questions',  icon:'apps', class: '' },
    

    /*
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' }
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/suggested-questions2', title: 'Suggested Questions 2',  icon:'view_headline', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },*/
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
