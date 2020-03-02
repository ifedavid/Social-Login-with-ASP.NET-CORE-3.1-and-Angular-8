import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }


  constructor(private accountService: AccountService) {
  }

  userName = "";
  

  ngOnInit() {
    this.userName = this.accountService.CurrentUsername.value;


  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
