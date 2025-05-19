const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { configDotenv } = require("dotenv");
const {readFile} = require('fs/promises')
const mime = require("mime-types");
configDotenv()

const client = new S3Client({
    region: "ap-south-1",
    credentials:{
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey
    }
})
async function getBucketObjURL(key){
    const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME, //Your Bucket Name
        Key: key //Object Key
    })
    const url = await getSignedUrl(client, command, {expiresIn: 120})
    return url;
}


async function putBucketObj(key, filePath) {

    const fileBuffer = await readFile(filePath);
    const contentType = mime.lookup(filePath) || "application/octet-stream";

    const putCommand = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        Body: fileBuffer, //objectURL
        ContentType: contentType, 
        ContentDisposition: "inline" // to make browser open it
    });   
    await client.send(putCommand);
    console.log(`Uploaded ${key} with Content-Type: ${contentType}`);
}

async function init(){
    await putBucketObj("uploadImg.jpg", "../img/uploadImg.jpg");
    // console.log('URL for imgone(Object)', await getBucketObjURL("imgg.png"))
}
init()