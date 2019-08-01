[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh
nvm use

npm install && npm install --global rollup
NODE_ENV=production rollup -c rollup.config.js
mkdir -p dist && cd dist && cp ../package.json ./ && npm i --production && zip -rq ./lambda.zip ./node_modules ./handler.js && cd ..

aws lambda update-function-code --function-name lambda-rollup --zip-file fileb://dist/lambda.zip --publish --region eu-central-1
aws lambda invoke --function-name lambda-rollup --payload file://events/alb.json --region eu-central-1 out.json && cat out.json | jq ".body"

rm -rf dist/*