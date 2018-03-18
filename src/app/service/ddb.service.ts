import {Injectable} from "@angular/core";
import {CognitoUtil} from "./cognito.service";
import {environment} from "../../environments/environment";

import { LogStuff } from "../secure/useractivity/useractivity.component";
import { Datasource } from "../datasource/datasource";

import * as AWS from "aws-sdk/global";
import * as DynamoDB from "aws-sdk/clients/dynamodb";
import * as cuid from "cuid";

/**
 * Created by Vladimir Budilov
 */

@Injectable()
export class DynamoDBService {

    constructor(public cognitoUtil: CognitoUtil) {
        console.log("DynamoDBService: constructor");
    }

    getAWS() {
        return AWS;
    }

    getLogEntries(mapArray: Array<LogStuff>) {
        console.log("DynamoDBService: reading from DDB with creds - " + AWS.config.credentials);
        var params = {
            TableName: environment.ddbTableName,
            KeyConditionExpression: "userId = :userId",
            ExpressionAttributeValues: {
                ":userId": this.cognitoUtil.getCognitoIdentity()
            }
        };

        var clientParams:any = {};
        if (environment.dynamodb_endpoint) {
            clientParams.endpoint = environment.dynamodb_endpoint;
        }
        var docClient = new DynamoDB.DocumentClient(clientParams);
        docClient.query(params, onQuery);

        function onQuery(err, data) {
            if (err) {
                console.error("DynamoDBService: Unable to query the table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                // print all the movies
                console.log("DynamoDBService: Query succeeded.");
                data.Items.forEach(function (logitem) {
                    mapArray.push({type: logitem.type, date: logitem.activityDate});
                });
            }
        }
    }

    writeLogEntry(type: string) {
        try {
            let date = new Date().toString();
            console.log("DynamoDBService: Writing log entry. Type:" + type + " ID: " + this.cognitoUtil.getCognitoIdentity() + " Date: " + date);
            this.write(this.cognitoUtil.getCognitoIdentity(), date, type);
        } catch (exc) {
            console.log("DynamoDBService: Couldn't write to DDB");
        }

    }

    write(data: string, date: string, type: string): void {
        console.log("DynamoDBService: writing " + type + " entry");

        let clientParams:any = {
            params: {TableName: environment.ddbTableName}
        };
        if (environment.dynamodb_endpoint) {
            clientParams.endpoint = environment.dynamodb_endpoint;
        }
        var DDB = new DynamoDB(clientParams);

        // Write the item to the table
        var itemParams =
            {
                TableName: environment.ddbTableName,
                Item: {
                    userId: {S: data},
                    activityDate: {S: date},
                    type: {S: type}
                }
            };
        DDB.putItem(itemParams, function (result) {
            console.log("DynamoDBService: wrote entry: " + JSON.stringify(result));
        });
    }

    getDatasourceEntries(mapArray: Array<Datasource>) {
      console.log("DynamoDBService: reading from DDB with creds - " + AWS.config.credentials);
      var params = {
          TableName: 'datasource',
          KeyConditionExpression: "userId = :userId",
          ExpressionAttributeValues: {
              ":userId": this.cognitoUtil.getCognitoIdentity()
          }
      };

      var clientParams:any = {};
      if (environment.dynamodb_endpoint) {
          clientParams.endpoint = environment.dynamodb_endpoint;
      }
      var docClient = new DynamoDB.DocumentClient(clientParams);
      docClient.query(params, onQuery);

      function onQuery(err, data) {
          if (err) {
              console.error("DynamoDBService: Unable to query the table. Error JSON:", JSON.stringify(err, null, 2));
          } else {
              // print all the movies
              console.log("DynamoDBService: Query succeeded.");
              data.Items.forEach(function (logitem) {
                  mapArray.push({
                    userId: logitem.userId,
                    id: logitem.id,
                    dialect: logitem.dialect,
                    host: logitem.host,
                    port: logitem.port,
                    database: logitem.database,
                    username: logitem.username,
                    password: logitem.password
                  });
              });
          }
      }
    }

    async writeDatasource(datasource: Datasource): Promise<boolean> {
      console.log("DynamoDBService: writing " + datasource.dialect + " entry");

      datasource.userId = this.cognitoUtil.getCognitoIdentity();
      if (!datasource.id)
        datasource.id = cuid();

      let clientParams:any = {
          params: {TableName: 'datasource'}
      };
      if (environment.dynamodb_endpoint) {
          clientParams.endpoint = environment.dynamodb_endpoint;
      }
      var DDB = new DynamoDB(clientParams);

      // Write the item to the table
      var itemParams =
          {
              TableName: 'datasource',
              Item: {
                  userId: {S: datasource.userId},
                  id: {S: datasource.id},
                  dialect: {S: datasource.dialect},
                  host: {S: datasource.host},
                  port: {S: datasource.port},
                  database: {S: datasource.database},
                  username: {S: datasource.username},
                  password: {S: datasource.password}
              }
          };

      return new Promise<boolean>((resolve) => {
          DDB.putItem(itemParams, function (result) {
            console.log("DynamoDBService: wrote entry: " + JSON.stringify(result));
            resolve(true);
        });
      })

    }

    async removeDatasourceEntry(id: string): Promise<boolean> {
      console.log("DynamoDBService: deleting " + id + " entry");

      const userId = this.cognitoUtil.getCognitoIdentity();

      let clientParams:any = {
          params: {TableName: 'datasource'}
      };
      if (environment.dynamodb_endpoint) {
          clientParams.endpoint = environment.dynamodb_endpoint;
      }
      var DDB = new DynamoDB(clientParams);

      // Write the item to the table
      var itemParams =
          {
              TableName: 'datasource',
              Key: {
                  userId: {S: userId},
                  id: {S: id}
              }
          };

      return new Promise<boolean>((resolve) => {
          DDB.deleteItem(itemParams, function (result) {
            console.log("DynamoDBService: deleted entry: " + JSON.stringify(result));
            resolve(true);
        });
      })
    }

    async getDatasourceEntry(id: string): Promise<Datasource> {
      console.log("DynamoDBService: getting " + id + " entry");

      const userId = this.cognitoUtil.getCognitoIdentity();

      let clientParams:any = {
          params: {TableName: 'datasource'}
      };
      if (environment.dynamodb_endpoint) {
          clientParams.endpoint = environment.dynamodb_endpoint;
      }
      var DDB = new DynamoDB(clientParams);

      // Write the item to the table
      var itemParams =
          {
              TableName: 'datasource',
              Key: {
                  userId: {S: userId},
                  id: {S: id}
              }
          };

      return new Promise<Datasource>((resolve) => {
          DDB.getItem(itemParams, function (err, result) {
            console.log("DynamoDBService: got entry: " + JSON.stringify(result));
            const datasource = new Datasource();
            datasource.userId = result.Item.userId.S;
            datasource.id = result.Item.id.S;
            datasource.dialect = result.Item.dialect.S;
            datasource.host = result.Item.host.S;
            datasource.port = result.Item.port.S;
            datasource.database = result.Item.database.S;
            datasource.username = result.Item.username.S;
            datasource.password = result.Item.password.S;
            return resolve(datasource);
        });
      })
    }
}


