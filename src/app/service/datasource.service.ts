import { Injectable } from "@angular/core";
import { Datasource } from "../datasource/datasource";
import { DynamoDBService } from "./ddb.service";
import * as AWS from "aws-sdk/global";

@Injectable()
export class DatasourceService {

    constructor(public ddb: DynamoDBService) {

    }

    async save(datasource: Datasource): Promise<boolean> {
        console.log("DatasourceService: user is " + datasource);

        await this.ddb.writeDatasource(datasource);

        return true;
    }
}
