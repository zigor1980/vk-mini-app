import AWS from 'aws-sdk';

AWS.config.credentials = new AWS.Credentials({
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_S3_SECRET,
});

AWS.config.update({
  region: 'eu-west-2',
});

const s3 = new AWS.S3({ signatureVersion: 'v4' });

export function getSignedUrl(url) {
  return s3.getSignedUrl('getObject', {
    Bucket: 'disney-soul',
    Key: url,
    Expires: 60 * 60,
  });
}

export default s3;
