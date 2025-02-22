import {iamRole, iamRolePolicyAttachment, lambdaFunction} from '@cdktf/provider-aws';
import { LambdaFunctionConfig } from '@cdktf/provider-aws/lib/lambda-function';
import { Construct } from 'constructs';
import * as path from 'path';
// import { execSync } from 'child_process';
import { AssetType, TerraformAsset } from 'cdktf';

interface LambdaFunctionProps extends Omit<LambdaFunctionConfig, 'role' | 'filename'> {
    bundle: string;
    functionName: string;
}

export class LambdaFunction extends Construct {
    public readonly lambdaFunction: lambdaFunction.LambdaFunction;

    constructor(scope: Construct, id: string, { functionName,bundle, ...rest }: LambdaFunctionProps) {
        super(scope, id);

        // Done: zip the bundle using execsync 
        // This is the less code aware option
        // const filename = path.join(process.env.INIT_CWD!,`./out/${bundle}.zip`);
        // execSync(`rm -rf ./out && mkdir -p ./out && cd ${bundle} && zip -r ${filename} .`, {cwd: process.env.INIT_CWD!, });

        const asset = new TerraformAsset(this, 'lambda-asset', {
            path: path.join(process.env.INIT_CWD!, bundle),
            type: AssetType.ARCHIVE,
        })


        // Create IAM role for Lambda 
        const lambdaRole = new iamRole.IamRole(this, 'lambda-execution-role', {
            name: `${functionName}-execution-role`,
            assumeRolePolicy: JSON.stringify({
                Version: '2012-10-17',
                Statement: [
                    {
                        Effect: 'Allow',
                        Principal: {
                            Service: 'lambda.amazonaws.com',
                        },
                        Action: 'sts:AssumeRole',
                    },
                ],
            }),
        });

        // Attach AWSLambdaBasicExecutionRole policy to the IAM role
        new iamRolePolicyAttachment.IamRolePolicyAttachment(this, 'LambdaExecutionRolePolicy', {
            role: lambdaRole.name,
            policyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
        });

        // add lambda function
        this.lambdaFunction = new lambdaFunction.LambdaFunction(this, 'lambda-function', {
            functionName,
            role: lambdaRole.arn,
            runtime: 'nodejs18.x',
            filename: asset.path,
            timeout: 30,
            ...rest
        });






    }
}