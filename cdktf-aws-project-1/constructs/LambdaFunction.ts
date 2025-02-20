import {iamRole, iamRolePolicyAttachment, lambdaFunction} from '@cdktf/provider-aws';
import { LambdaFunctionConfig } from '@cdktf/provider-aws/lib/lambda-function';
import { Construct } from 'constructs';

interface LambdaFunctionProps extends Omit<LambdaFunctionConfig, 'role'> {
    functionName: string;
}

export class LambdaFunction extends Construct {
    public readonly lambdaFunction: lambdaFunction.LambdaFunction;

    constructor(scope: Construct, id: string, { functionName, ...rest }: LambdaFunctionProps) {
        super(scope, id);

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
            timeout: 30,
            ...rest
        });






    }
}