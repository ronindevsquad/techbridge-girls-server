const aws = require('aws-sdk');
const secretAccessKey = require('../../keys').secretAccessKey
const sig = require('amazon-s3-url-signer');

aws.config.update({
  secretAccessKey: secretAccessKey,
  accessKeyId: 'AKIAIFF4LTNLXH75IA2A',
  region: 'us-west-1'
});
const s3 = new aws.S3();
const urlSigner = sig.urlSigner('AKIAIFF4LTNLXH75IA2A', secretAccessKey, {
  host: 's3-us-west-1.amazonaws.com'
});

module.exports = {
  s3: s3,
  urlSigner: urlSigner
}