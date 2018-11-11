# cognito-cloudformation-setup
Deploy an aws cognito through cloudformation

Requirements:
1. AWS CLI must be installed


cd serverless
npm install

npm install -g serverless
serverless deploy


cd..

aws cloudformation create-stack --stack-name cognito-infrastructure-template --template-body file://cognito-template.yaml --parameters file://cognito-template-dev.json  --capabilities CAPABILITY_NAMED_IAM

