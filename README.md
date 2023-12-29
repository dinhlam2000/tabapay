# File System + IDE Supported Full Stack Project

# Demo Video

https://www.youtube.com/watch?v=qznFmP73Wb0

# Git Hub Link

https://github.com/dinhlam2000/tabapay

### DEMO GIF

<img width="960" alt="image" src="./docs/GifyDemoWellSpring.gif">

## Tech Stack

### FrontEnd (refer to FrontEnd Readme for more info)

- React + Typescript
- React-Query (state management)
- Material UI (styling)
- Frontend Deployed Using Amplify AWS: https://dev.d6nv8d6ct5cz4.amplifyapp.com/

### BackEnd (refer to Backend Readme for more info)

- Python
- AWS
- DynamoDB (Serverless DB)
- AWS Lambda (serverless computing)
- API Gateway (serverless API)
- Docker
- API ENDPOINT Deployed On AWS: https://n4ae4vqh0g.execute-api.us-west-2.amazonaws.com/v0

### Summary

The Frontend initiates a call to the API Endpoint hosted on AWS Cloud. The data is retrieved from a deployed DynamoDB, managed by AWS Lambda. Once fetched, the data is parsed and handled using react-query, facilitating its display on the UI.

The UI presents a tree view encompassing all nodes, effectively constructing a file system within the frontend. An integrated editor accommodates various file types such as ['py', 'tsx', 'css', 'scss', 'js', 'txt', 'md', 'yaml', 'toml', 'ts', 'yml', 'json', 'gitignore'].

This implementation draws inspiration from the concept of creating an online web IDE.
