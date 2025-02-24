import { Construct } from "constructs";
import { App, TerraformOutput, TerraformStack } from "cdktf";
import { provider } from "@cdktf/provider-aws";
import { LambdaFunction } from "./constructs/LambdaFunction";
import { getConstructName } from "./utils/utils";
import { LambdaRestApi } from "./constructs/LambdaRestApi";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new provider.AwsProvider(this, 'aws-provider', {
      region: 'us-west-2',
    });

    // Create Lambda function using our custom construct
    new LambdaFunction(this, 'lambda-function-1', {
      functionName: getConstructName(this, 'api'),
      bundle: './function-name-picker',
      handler: 'index.handler',
    });

    // Create a second Lambda function
    const functionNamePicker = new LambdaFunction(this, 'lambda-function', {
      functionName: getConstructName(this, 'api'),
      bundle: './function-name-picker', // fixed typo
      handler: 'index.handler',
    });

    // Create API Gateway REST API that invokes the Lambda
    new LambdaRestApi(this, 'lambda-rest-api', {
      handler: functionNamePicker.lambdaFunction, // ensure this property exists in your construct
      stageName: 'dev',
    });
  }
}

const app = new App();
new MyStack(app, "cdktf-aws-project-1");
app.synth();
