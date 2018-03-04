import { Component, OnInit } from '@angular/core';

import { MainService } from '../../main.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {

  constructor(private mainService: MainService) { }

  ngOnInit() {
  }

}
