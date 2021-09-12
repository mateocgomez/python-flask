import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  languageList = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Espanol' }
  ];

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute
    ) { }

  ngOnInit(): void {  }

  goTo(menu: string){
    const userId = parseInt(this.router.snapshot.params.userId)
    const token = this.router.snapshot.params.userToken

    switch (menu) {
      case "logIn":
        this.routerPath.navigate([`/`])
        break;
      case "album":
        this.routerPath.navigate([`/albumes/${userId}/${token}`])
        break;
      case "cancion":
        this.routerPath.navigate([`/canciones/${userId}/${token}`])
        break;
      case "acerca":
        this.routerPath.navigate([`/acerca_de/${userId}/${token}`])
        break;
      default:
        this.routerPath.navigate([menu])
    }
  }
}
