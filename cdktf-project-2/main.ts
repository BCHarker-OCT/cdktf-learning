import { Construct } from "constructs";
import { App, TerraformOutput, TerraformStack } from "cdktf";
import { provider, file } from '@cdktf/provider-local';
import * as path from 'path';

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // define resources here
    new TerraformOutput(this, 'lets-go', { value: 'Let\'s go!'});

    // Init provider 
    new provider.LocalProvider(this, 'local', {});

    // Make project folder 
    const projectDirectory = path.join(process.env.INIT_CWD!, './authors-projects');
    const projectName = 'project-1';
    const basePath = `${projectDirectory}/${projectName}`;

    // Add a README file 
    // Logical id in this case is readme-file
    const readMeFile = new file.File(this, 'readme-file-1', {
      filename: `${basePath}/README.md`,
      content: `# ${projectName} \n\nThis is the ${projectName} project`,
      // lifecycle: { ignoreChanges: ['content']}, 
    });

    // Add package.json file 
    new file.File(this, 'package-json-file', {
      filename: `${basePath}/package.json`,
      content: `# content here`
    });

    new TerraformOutput(this, 'readMeContents', {
      value: readMeFile.content,
    });

  }
}

const app = new App();
new MyStack(app, "cdktf-project-2");
app.synth();
