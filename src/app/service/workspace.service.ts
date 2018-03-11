import { Injectable } from "@angular/core";
import { DatasourceModel } from "../datasource/datasource.model"

@Injectable()
export class WorkspaceService {
  public datasource: DatasourceModel;

  constructor() {
    this.datasource = new DatasourceModel();
  }
}
