import { Injectable } from "@angular/core";
import { DatasourceModel } from "../datasource/datasource.model";
import { DynamoDBService } from "./ddb.service";
import * as AWS from "aws-sdk/global";

@Injectable()
export class DatasourceService {

    constructor(public ddb: DynamoDBService) {

    }

    async register(datasource: DatasourceModel): Promise<boolean> {
        console.log("DatasourceService: user is " + datasource);

        await this.ddb.writeDatasource(datasource);

        return true;
    }
}
