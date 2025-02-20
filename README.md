# cdktf-learning
Repository for CDKTF Typescript learning

## Typescript Fundamentals 

Install node. 
Package managers: 
- npm
- yarn
- bun
- pnpm 

Init the project commands: 

```
corepack enable 
# say yes when yarn asks you a question 
yarn init   
# tell yarn how to manage dependencies 
yarn config set nodeLinker node-modules
# setup dev dependency 
yarn add -D typescript
# verify 
yarn info typescript version
```

Execute the script: 
```
yarn add -D ts-node
# add script or run 
ts-node index.ts 

# respawn 
yarn add -D ts-node-dev
```

## Importing 

- Why Import?
  - Organizes code by splitting it across multiple files
  - Enables code reuse and modularity
- Basic Syntax:
  - `import { exportedMember } from './fileName';`
- Importing Default Exports:
  - `import defaultExport from './fileName';`
- Importing Everything:
  - `import * as utils from './utils';`
- Importing an installed package: 
  - `import lodash from 'lodash;'
- ECMAScript Modules / (ESM) import statements are preferred

## CDK Terraform 

Install Terraform: 
```
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
brew update
```

Install CDKTF & Init a Project: 
```
npm install -g cdktf-cli
cdktf --version

# Init a Project (equivalent of terraform init) 
cdktf init --template=typescript

# Switch to yarn if you want to 
rm package-lock.json 

# commands 
corepack prepare yarn@stable --activate;
touch yarn.lock; 
yarn config set nodeLinker

# update .gitignore
# Yarn
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions
.pnp.*
node_modules/
``` 

Add the cdktf-cli into the project (optional):
```
yarn add -D cdktf-cli
```

## Structure 

```typescript
//construct = used to define components of infrastructure 
import { Construct } from 'constructs';
//app = root of construct, all stacks are defined and synthesized in the app
import { App,) TerraformStack } from 'cdktf';

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {}
    // scope parent construct for the stack (usually app) 
    super (scope, id);
    // define resources here
  }
}

const app = new App();
new MyStack(app, 'cdktf-project-builder');
//synthesizes your code into Terraform 
app.synth();
```

## Deploying the code 

1. The `cdktf.json` file is the configuration and command used to execute the cdktf actions (synth, deploy, etc.). We changed the deploy method to use `yarn` rather than `npx`. 

2. To synthesize the terraform code, run `yarn cdktf synth`. This produces the the `cdktf.out` folder. 
3. To deploy run `yarn cdktf deploy` 

Or use cdktf cli 
```
cdktf synth 
cdktf deploy # if you want add --auto-approve 
```

from the help docs: 
```
  Synthesize:
    cdktf synth [stack]   Synthesize Terraform resources from stacks to cdktf.out/ (ready for 'terraform apply')

  Diff:
    cdktf diff [stack]    Perform a diff (terraform plan) for the given stack

  Deploy:
    cdktf deploy [stack]  Deploy the given stack

  Destroy:
    cdktf destroy [stack] Destroy the stack
```

## Adding providers 

Adding local provider using yarn: `yarn add @cdktf/provider-local`

## Output 

```typescript
// Output the readMefile content 
new TerraformOutput(this, 'readMeContent', {
    value: readMeFile.content,
});
```

## CDK Constructs 

Similar to Terraform modules, but can be more dynamic that Terraform Modules. 

```
interface ProjectFolderProps { 
    readonly projectName: string;
    readonly projectDirectory: string; 
}



export class ProjectFolder extends Construct {
    constructor( scope: Construct, id: string, props: ProjectFolderProps) {
        super(scope,id);

        const { projectName, projectDirectory } = props; 

        // resusable code 
    }
}
```