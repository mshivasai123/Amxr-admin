import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Amxr Admin';
  showHeader = true;

  constructor(private router: Router) {
          // on route change to '/login', set the variable showHead to false
          router.events.forEach((event) => {
            
            if (event instanceof NavigationStart) {
              if (event['url'] == '/login' || event['url'] == '/') {
                this.showHeader = false;
              } else {
                // console.log("NU")
                this.showHeader = true;
              }
            }
          });
  }

}
