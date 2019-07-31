# Lambda rollup example

- Install rollup `npm install --global rollup`
- Install aws cli


# Deployment

## Initial

### Create role
`aws iam create-role --role-name lambda_rollup_role --assume-role-policy-document file://aws/function_role.json`

Make sure to keep your ARN 

### Build the application
`rollup -c rollup.config.json`

### Create function

```
aws lambda create-function --region eu-central-1 --function-name lambda-rollup --zip-file fileb://dist/lambda.zip --role <your_arn_from_above> --handler handler.handler --runtime nodejs8.10
```

## Incremental
`./deploy.sh`