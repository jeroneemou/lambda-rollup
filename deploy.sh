rm dist/lambda.zip

[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh
nvm use
npm install --global rollup
rollup -c rollup.config.js

cd dist && zip -rq ./lambda.zip ../node_modules ./handler.js && cd ..
aws lambda update-function-code --function-name lambda-rollup --zip-file fileb://dist/lambda.zip --publish --region eu-central-1

## Invoke
## aws lambda invoke --function-name lambda-rollup --payload file://events/alb.json --region eu-central-1 out.txt
