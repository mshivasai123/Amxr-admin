import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  color:any = 'primary';
  mode:any = 'indeterminate';
  value:any = 50;
  constructor() { }

  ngOnInit(): void {
  }

}
