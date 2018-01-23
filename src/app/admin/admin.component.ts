import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  sidebarToogled: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  onClickToogleSidebar(): void {
    this.sidebarToogled = !this.sidebarToogled;
  }

}
