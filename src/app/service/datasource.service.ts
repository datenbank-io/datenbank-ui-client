import { Injectable } from "@angular/core";
import { DatasourceStuff } from "../datasource/list/list.component";
import { DynamoDBService } from "./ddb.service";
import * as AWS from "aws-sdk/global";

@Injectable()
export class DatasourceService {

    constructor(public ddb: DynamoDBService) {

    }

    async register(datasource: DatasourceStuff): Promise<boolean> {
        console.log("DatasourceService: user is " + datasource);

        await this.ddb.writeDatasource(datasource);

        return true;
    }
}
