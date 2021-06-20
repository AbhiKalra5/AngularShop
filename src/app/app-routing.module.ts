import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CategoryResolver } from './product/category/category-resolver.service';
import { CategoryComponent } from './product/category/category.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCategoryResolver } from './product/product-resolver';
import { SearchListComponent } from './product/search-list/search-list.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: 'search', component: SearchListComponent },
  {
    path: 'login',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'category',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CategoryComponent,
        resolve: { categories: CategoryResolver },
      },
      {
        path: ':id/list',
        component: ProductListComponent,
        resolve: { products: ProductCategoryResolver },
      },
      { path: ':id/detail/:pid', component: ProductDetailComponent },
    ],
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
    canActivate: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
