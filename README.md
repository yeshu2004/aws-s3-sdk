# AWS S3 File Upload and URL Generator

This Node.js script provides utilities to interact with an AWS S3 bucket. It allows you to:
- Upload files to an S3 bucket with appropriate content types and inline disposition.
- Generate signed URLs for accessing objects in the S3 bucket.

## Prerequisites

- **Node.js**: Version 14 or higher.
- **AWS Account**: With access to an S3 bucket and IAM credentials (Access Key ID and Secret Access Key).
- **Environment Variables**: Set up in a `.env` file.

## Installation

1. **Clone or set up the project**:
   Create a project directory and initialize a Node.js project:
   ```bash
   npm init -y
   ```

2. **Install dependencies**:
   Install the required npm packages:
   ```bash
   npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner dotenv mime-types
   ```

3. **Set up environment variables**:
   Create a `.env` file in the project root and add the following:
   ```
   accessKeyId=YOUR_AWS_ACCESS_KEY_ID
   secretAccessKey=YOUR_AWS_SECRET_ACCESS_KEY
   BUCKET_NAME=YOUR_S3_BUCKET_NAME
   ```
   Replace `YOUR_AWS_ACCESS_KEY_ID`, `YOUR_AWS_SECRET_ACCESS_KEY`, and `YOUR_S3_BUCKET_NAME` with your AWS credentials and bucket name.

## Usage

1. **Code Overview**:
   The script (`index.js`) contains two main functions:
   - `putBucketObj(key, filePath)`: Uploads a file to the S3 bucket with the specified key and file path.
   - `getBucketObjURL(key)`: Generates a signed URL for accessing an object in the S3 bucket (valid for 120 seconds).

2. **Running the Script**:
   - Ensure the file path in the `init()` function points to a valid file (e.g., `../img/uploadImg.jpg`).
   - Run the script:
     ```bash
     node index.js
     ```
   - The script uploads the specified file to the S3 bucket and logs the upload details.

3. **Example**:
   To upload an image and get its signed URL:
   ```javascript
   async function init() {
       await putBucketObj("uploadImg.jpg", "./img/uploadImg.jpg");
       const url = await getBucketObjURL("uploadImg.jpg");
       console.log("Signed URL:", url);
   }
   init();
   ```

## Configuration

- **Region**: The S3 client is configured for the `ap-south-1` region. Update the `region` in the `S3Client` constructor if your bucket is in a different region.
- **Signed URL Expiry**: The signed URL expires in 120 seconds. Modify the `expiresIn` option in `getBucketObjURL` to change this duration.
- **Content Disposition**: Files are uploaded with `ContentDisposition: "inline"`, making them viewable in browsers. Change to `"attachment"` for download behavior.

## Notes

- Ensure the IAM user has permissions for `s3:PutObject` and `s3:GetObject` on the target bucket.
- The `mime-types` package automatically detects the file's content type. If detection fails, it defaults to `application/octet-stream`.
- File paths in `putBucketObj` should be relative to the script's execution directory or absolute paths.

## Troubleshooting

- **File Not Found**: Verify the file path in `putBucketObj` is correct.
- **Permission Errors**: Check IAM permissions and bucket policies.
- **Invalid Credentials**: Ensure `.env` variables are correctly set and loaded.

## License

This project is unlicensed. Use it at your own discretion.