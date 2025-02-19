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