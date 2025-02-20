import { Construct } from "constructs";
import { App, TerraformOutput, TerraformStack } from "cdktf";
import { iamRole, provider } from "@cdktf/provider-aws";
// import { LambdaFunction } from "@cdktf/provider-aws/lib/
// lambda-function";
import { LambdaFunction } from "./constructs/LambdaFunction";
import * as path from 'path';

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new provider.AwsProvider(this, 'aws-provider', {
      region: 'us-west-2',
    })

    // const lambdaRole = new iamRole.IamRole(this, 'lambda-execution-role', {
    //   name: `cdktf-name-picker-api-execution-role`,
    //   assumeRolePolicy: JSON.stringify({
    //     Version: '2012-10-17',
    //     Statement: [
    //       {
    //         Effect: 'Allow',
    //         Principal: {
    //           Service: 'lambda.amazonaws.com',
    //         },
    //         Action: 'sts:AssumeRole',
    //       }
    //     ],
    //   }),
    // });


    new LambdaFunction(this, 'lambda-function-1', {
      functionName: 'cdktf-name-picker-api',
      filename: path.join(process.env.INIT_CWD!, './function-name-picker/index.js.zip'),
      handler: 'index.handler'
    });

  }
}

const app = new App();
new MyStack(app, "cdktf-aws-project-1");
app.synth();
