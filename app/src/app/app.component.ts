import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(i => i instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route
      }))
      .pipe(filter(route => route.outlet === 'primary'))
      .pipe(mergeMap(route => route.data))
      .subscribe(data => this.title = data.title);
  }
}
