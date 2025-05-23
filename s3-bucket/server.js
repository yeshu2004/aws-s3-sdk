const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { configDotenv } = require("dotenv");

configDotenv()
const client = new S3Client({
    region: "ap-south-1",
    credentials:{
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey
    }
})

//logic for getting preSigned URL for put command in frontend
async function putObjectFunc(key, contentType){
    const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME, //Your Bucket Name
        Key: key,
        ContentType: contentType,
        // ContentDisposition: 'inline'
    })
    const url = await getSignedUrl(client, command, {expiresIn: 120})
    return url;
}

async function GetObjectFunc(key) {
    const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
    })
    const url = await getSignedUrl(client, command, {expiresIn: 120})
    return url;
}

async function PutImage(){
    console.log('URL for imgone(Object)', await putObjectFunc(`user-upload/img-${Date.now()}.jpg`, 'image/jpg'))
}
async function GetImage() {
    console.log('URL for object:', await GetObjectFunc("user-upload/img-1747930100780.jpg"))
}
// PutImage()
GetImage()

