import { Construct } from 'constructs';
import { S3Bucket } from '@cdktf/provider-aws/lib/s3-bucket';

export interface S3BucketConstructProps {
  bucketName: string;
}

export class S3BucketConstruct extends Construct {
  public readonly bucket: S3Bucket;

  constructor(scope: Construct, id: string, props: S3BucketConstructProps) {
    super(scope, id);

    // Create the S3 bucket without an ACL resource
    const bucket = new S3Bucket(this, 'bucket', {
      bucket: props.bucketName,
      // Optionally, if you need to enforce object ownership, you can add:
      // objectOwnership: 'BucketOwnerEnforced'
    });

    this.bucket = bucket;
  }
}
