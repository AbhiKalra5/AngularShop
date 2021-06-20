import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  CommonImportModule,
  HttpLoaderFactory,
} from '../common-imports/common-imports.module';
import { AuthenticationComponent } from './authentication.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: AuthenticationComponent },
];
@NgModule({
  imports: [
    CommonImportModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  declarations: [AuthenticationComponent],
})
export class AuthenticationModule {}
