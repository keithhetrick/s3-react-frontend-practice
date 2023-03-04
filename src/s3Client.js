// snippet-start:[s3.JavaScript.buckets.createclientv3]
// Create service client module using ES6 syntax.
import { S3Client } from "@aws-sdk/client-s3";
// Set the AWS Region.
const REGION = process.env.REACT_APP_AWS_BUCKET_REGION;
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });

export { s3Client };
// snippet-end:[s3.JavaScript.buckets.createclientv3]
