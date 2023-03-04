import { useState } from "react";
import AWS from "aws-sdk";

// =============================================================== \\
// ================= Upload File Via Native SDK ================== ||
// =============================================================== //

const S3_BUCKET = process.env.REACT_APP_AWS_BUCKET_NAME;
const REGION = process.env.REACT_APP_AWS_BUCKET_REGION;

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY_ID,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

function UploadImageToS3WithNativeSdk() {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [fileDeleted, setFileDeleted] = useState(false);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = (file) => {
    if (!file) {
      setError("Please select a valid image file.");
      return;
    }
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file?.name,
    };
    console.log("FILE: ", file);
    console.log(`Uploading file ${file?.name} to S3 bucket ${S3_BUCKET}...`);
    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
        console.log(`PROGRESS: ${Math.round((evt.loaded / evt.total) * 100)}`);
      })
      .send((err) => {
        if (err) {
          setError(err);
          console.log(`ERROR: ${err}`);
        } else {
          setProgress(100);
          console.log("Upload complete!");
        }
      });

    // stop upload when abortMultipartUpload is called
    myBucket.abortMultipartUpload = () => {
      console.log(`Upload of ${file?.name} cancelled.`);
      myBucket.putObject(params).abort();
      setProgress(0);
      setError(null);
      setSelectedFile(null);
    };
  };

  // delete file from S3 bucket
  const deleteFile = (file) => {
    const params = {
      Bucket: S3_BUCKET,
      Key: file,
    };
    console.log(`Deleting file ${file?.name} from S3 bucket ${S3_BUCKET}...`);
    myBucket.deleteObject(params, (err, data) => {
      if (err) {
        console.log(`ERROR: ${err}`);
      } else {
        console.log(`Delete ${file?.name} complete!`);
        setFileDeleted(true);
      }
    });
  };

  const styling = {
    margin: "5px",
  };

  return (
    <div>
      <h3>Native SDK File Upload</h3>
      <div>
        {/* if there's a file and progress is not 100, show uploading file */}
        {selectedFile && progress !== 100 ? (
          <div style={styling}>
            {progress === 0
              ? `File to upload: ${selectedFile?.name}`
              : `Uploading file ${selectedFile?.name}...`}
          </div>
        ) : null}

        {/* if progress is 100, show upload complete, else if progress is 0, show nothing, else show progress. Also, hid id file has been deleted */}
        {/* {progress === 100 ? (
          <div style={styling}>Upload {selectedFile.name} Complete!</div>
        ) : progress === 0 ? null : !fileDeleted ? (
          <div style={styling}>
            Progress: {progress}%
            <progress value={progress} max="100" />
          </div>
        ) : null} */}

        {progress === 100 ? (
          <div style={styling}>
            {fileDeleted ? (
              <div>
                <div>File {selectedFile.name} has been deleted!</div>
              </div>
            ) : (
              <div style={styling}>Upload {selectedFile.name} Complete!</div>
            )}
          </div>
        ) : progress !== 0 ? (
          <div style={styling}>
            Progress: {progress}%
            <progress value={progress} max="100" />
          </div>
        ) : null}

        {/* if there's a file, hid error */}
        {error && !selectedFile ? (
          <div style={styling}>Error: {error}</div>
        ) : null}
      </div>

      <div id="upload__delete__buttons">
        <input
          type="file"
          onChange={handleFileInput}
          value={progress === 100 ? "" : undefined}
        />

        {/* when progress is 0 or 100, show uploadFile, else show cancelUpload */}
        {progress === 0 || progress === 100 ? (
          <button
            onClick={() => uploadFile(selectedFile)}
            disabled={progress === 100}
          >
            Upload to S3
          </button>
        ) : (
          <button onClick={() => myBucket.abortMultipartUpload()}>
            Cancel Upload
          </button>
        )}

        {/* if there's a file and progress is 100, show deleteFile, then hide button & show "File has been deleted!" */}
        {selectedFile && progress === 100 ? (
          <div>
            {!fileDeleted ? (
              <button onClick={() => deleteFile(selectedFile.name)}>
                Delete {selectedFile.name} File
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default UploadImageToS3WithNativeSdk;
