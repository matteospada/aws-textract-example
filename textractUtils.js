const aws = require("aws-sdk");
const config = require("./config");

aws.config.update({
  accessKeyId: config.awsAccesskeyID,
  secretAccessKey: config.awsSecretAccessKey,
  region: config.awsRegion
});

const textract = new aws.Textract();


module.exports = async buffer => {
  const params = {
    Document: {
      /* required */
      Bytes: buffer
    },
    FeatureTypes: ["FORMS"]
  };

  const request = textract.analyzeDocument(params);
  const data = await request.promise();

  if (data && data.Blocks) {
    //const { keyMap, valueMap, blockMap } = getKeyValueMap(data.Blocks);
    //const keyValues = getKeyValueRelationship(keyMap, valueMap, blockMap);
    return data.Blocks
  }

  // in case no blocks are found return undefined
  return undefined;
};