# Chainlink NodeJS External Adapter for CoinPaprika

Template: https://github.com/thodges-gh/CL-EA-NodeJS-Template

Adapter built as a technical challenge

## Todo
- Validate the input format of the inputs $symbol-$name
- Validate given input token against stored/queried list of valid tokens
- Create custom error for tokens not found in the stored/queried list
- Allow input parameter to determine the currency results are shown in

## Input Params

- `token`, `asset`, or `coin`: The symbol of the currency to query. Formatted like: 'btc-bitcoin' or 'eth-ethereum'

## Output

```json
{
   "jobRunID":"1",
   "data":{
      "result":{
         "symbol":"BTC",
         "timestamp":"2022-07-03T17:19:02Z",
         "price":"19148.312319325745",
         "market_cap":"365429858147",
         "volume_24h":"13413446262.168247"
      }
   },
   "result":{
      "symbol":"BTC",
      "timestamp":"2022-07-03T17:19:02Z",
      "price":"19148.312319325745",
      "market_cap":"365429858147",
      "volume_24h":"13413446262.168247"
   },
   "statusCode":200
}
```

## Install Locally

Install dependencies:

```bash
yarn
```

### Test

Run the local tests:

```bash
yarn test
```

Natively run the application (defaults to port 8080):

### Run

```bash
yarn start
```

## Call the external adapter/API server

```bash
 curl -X POST -H "content-type:application/json" "http://localhost:8080/" --data '{"data": { "token": "btc-bitcoin"} }' 
```

## Docker

If you wish to use Docker to run the adapter, you can build the image by running the following command:

```bash
docker build . -t coinpaprika-external-adapter
```

Then run it with:

```bash
docker run -p 8080:8080 -it coinpaprika-external-adapter:latest
```

## Serverless hosts

After [installing locally](#install-locally):

### Create the zip

```bash
zip -r coinpaprika-external-adapter.zip .
```

### Install to AWS Lambda

- In Lambda Functions, create function
- On the Create function page:
  - Give the function a name
  - Use Node.js 16.x for the runtime
  - Choose an existing role or create a new one
  - Click Create Function
- Under Function code, select "Upload a .zip file" from the Code entry type drop-down
- Click Upload and select the `external-adapter.zip` file
- Handler:
    - index.handler for REST API Gateways
    - index.handlerv2 for HTTP API Gateways
- Save

#### To Set Up an API Gateway (HTTP API)

If using a HTTP API Gateway, Lambda's built-in Test will fail, but you will be able to externally call the function successfully.

- Click Add Trigger
- Select API Gateway in Trigger configuration
- Under API, click Create an API
- Choose HTTP API
- Select the security for the API
- Click Add

#### To Set Up an API Gateway (REST API)

If using a REST API Gateway, you will need to disable the Lambda proxy integration for Lambda-based adapter to function.

- Click Add Trigger
- Select API Gateway in Trigger configuration
- Under API, click Create an API
- Choose REST API
- Select the security for the API
- Click Add
- Click the API Gateway trigger
- Click the name of the trigger (this is a link, a new window opens)
- Click Integration Request
- Uncheck Use Lamba Proxy integration
- Click OK on the two dialogs
- Return to your function
- Remove the API Gateway and Save
- Click Add Trigger and use the same API Gateway
- Select the deployment stage and security
- Click Add