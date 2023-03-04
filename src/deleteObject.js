import { DeleteObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client.js";

const S3_BUCKET = process.env.REACT_APP_AWS_BUCKET_NAME;

const bucketParams = {
  Bucket: S3_BUCKET,
  Key: "candy.png",
};

async function listAllObjects() {
  try {
    const data = await s3Client.send(new ListObjectsCommand(bucketParams));
    console.log("Success! Here's all current objects: ", data);
  } catch (err) {
    console.log("ERROR", err);
  }
}

async function deleteSingleObject() {
  try {
    const data = await s3Client.send(new DeleteObjectCommand(bucketParams));
    console.log("Success! Here's the deleted object: ", data);
  } catch (err) {
    console.log("ERROR", err);
  }
}

function DeleteObject() {
  return (
    <div>
      <h1>List All Objects</h1>
      <button onClick={listAllObjects}>List All Objects</button>
      <h1>Delete Object</h1>
      <button onClick={deleteSingleObject}>Delete Object</button>
    </div>
  );
}

export default DeleteObject;
