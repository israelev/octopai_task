import { Component, OnInit,Input } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-box',
  templateUrl: './category-box.component.html',
  styleUrls: ['./category-box.component.less']
})
export class CategoryBoxComponent implements OnInit {

  @Input() category: Category;
  _category:Category;
  show:boolean=false;
  path:string;
  constructor() {
  
   }

  ngOnInit(): void {
    if(this.category){
      this._category=this.category;
      this.path="../category/"+this.category.id;
      this.show=true;
     }
  }

}
