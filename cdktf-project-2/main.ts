import { Construct } from "constructs";
import { App, TerraformOutput, TerraformStack } from "cdktf";
import { provider } from '@cdktf/provider-local';
import * as path from 'path';
import { ProjectFolder } from "./constructs/ProjFolder";

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

    const projectFolder = new ProjectFolder(this, 'project-folder', {
      projectName,
      projectDirectory,
    });

    // projectFolder.readMeFile

    new TerraformOutput(this, 'readMeContent', {
      value: projectFolder.readMeFile.content,
    });

  }
}

const app = new App();
new MyStack(app, "cdktf-project-2");
app.synth();
