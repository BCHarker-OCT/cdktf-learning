import { TerraformStack } from "cdktf";
import { Construct } from "constructs";

// export const getConstructName = (scope: Construct, id: string) => `${TerraformStack.of(scope)}-${id}`;

// export const getConstructName = (scope: Construct, id: string) => `${TerraformStack.of(scope).stackName}-${id}`;

export const getConstructName = (scope: Construct, id: string): string =>
    `${scope.node.id}-${id}`;
