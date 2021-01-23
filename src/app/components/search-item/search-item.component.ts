import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.less']
})
export class SearchItemComponent implements OnInit {
  @Input() data: object;
  
  show:boolean=false;
  constructor() {}

  ngOnInit(): void {
    if(this.data){
      this.show=true;
     }
  }
}
