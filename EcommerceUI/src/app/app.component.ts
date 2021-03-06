import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EcommerceThinkbridge';
  items: NbMenuItem[] = [
    {
      title: 'Product',
      icon: 'person-outline',
      link: '/admin/product'   
    },
    
   ];
  constructor(private sidebarService: NbSidebarService) { }
  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
}
