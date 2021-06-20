import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private translateService: TranslateService) {}
  showLanguages = false;
  changeLanguage(lang: string): void {
    this.translateService.use(lang === 'en' || lang === 'fr' ? lang : 'en');
  }
  ngOnInit(): void {}
}
