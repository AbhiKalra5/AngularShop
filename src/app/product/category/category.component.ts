import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/Models';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}
  categoriesWrapper: any;
  categories: Category[] = [];
  ngOnInit(): void {
    this.categoriesWrapper = this.route.snapshot.data;
    this.categories = this.categoriesWrapper.categories;
  }
}
