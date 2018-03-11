import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { DynamoDBService } from "../../service/ddb.service";

@Component({
  selector: 'awscognito-angular2-app',
  templateUrl: './remove.component.html'
})

export class DatasourceRemoveComponent implements OnInit, OnDestroy {
  id: string;
  private sub: any;

  constructor(private route: ActivatedRoute, private router: Router, public ddb: DynamoDBService) {}

  async ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
    });

    await this.ddb.removeDatasourceEntry(this.id);

    this.router.navigate(['/securehome/datasource/list']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
