import { file } from "@cdktf/provider-local";
// import { TerraformOutput } from "cdktf";
import { Construct } from "constructs";


interface ProjectFolderProps {
    readonly projectName: string;
    readonly projectDirectory: string;
}

export class ProjectFolder extends Construct {
    public readMeFile: file.File;

    constructor(scope: Construct, id: string, props: ProjectFolderProps) {
        super(scope,id);

        // const projectName = props.projectName; 
        // const projectDirectory = props.projectDirectory;
        const { projectName, projectDirectory } = props; 

        const basePath = `${projectDirectory}/${projectName}`;

        // Add a README file 
        // Logical id in this case is readme-file
        this.readMeFile = new file.File(this, 'readme-file-1', {
        filename: `${basePath}/README.md`,
        content: `# ${projectName} \n\nThis is the ${projectName} project`,
        // lifecycle: { ignoreChanges: ['content']}, 
        });

        // Add package.json file 
        new file.File(this, 'package-json-file', {
        filename: `${basePath}/package.json`,
        content: `# content here`
        });

        // new TerraformOutput(this, 'readMeContents', {
        // value: this.readMeFile.content,
        // });
    }
}