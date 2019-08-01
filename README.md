# Lambda rollup example

Simple lambda based on express, typescript and bundled with rollup.

## Prerequisities
- Install nvm - https://github.com/nvm-sh/nvm
- Install aws cli - https://aws.amazon.com/cli/
- Install jq - https://stedolan.github.io/jq/

## Development

### Install
Simply by `nvm use && npm install`.

### Run
Run on local by `npm start`.

## Deployment

### Initial

#### Create role

Before executing blindly, just think of to what function has to have access, current one has access to everything.

After you're done with selecting just run `aws iam create-role --role-name lambda_rollup_role --assume-role-policy-document file://aws/function_role.json` and make sure to copy the output ARN of role

#### Build the application
For initial build run: `rollup -c rollup.config.json`.

#### Prepare zip
To pack everything to one zip file run `cd dist && zip -rq ./lambda.zip ../node_modules ./handler.js && cd ..`

#### Create function

Now simply create function and upload the zip file by running:
```
aws lambda create-function --region eu-central-1 --function-name lambda-rollup --zip-file fileb://dist/lambda.zip --role <your_arn_from_above> --handler handler.handler --runtime nodejs8.10
```

#### Test
To test successful deployment simply run:
```
aws lambda invoke --function-name lambda-rollup --payload file://events/alb.json --region eu-central-1 out.txt
```

Feel free to change the event. Currently loadbalancer lambda event is in use.

### Incremental
Just run `./deploy.sh`! 

What does it do?

    - builds app to ./dist/handler.js
    - creates zip with node_modules and handler
    - uploads incremental update to aws
    - invokes lambda to test if it really works