## Run local environment
```bash
export $(cat env/local.env) # this is needed to run local server
docker compose up # Spin up local dynamodb
```
## Deploy into AWS 
```
refer to SAM_README.md
```

## Important script file to inject data into DynamoDB
```
Refer to scripts/add_data_to_aws.py
```

## API ENDPOINT
https://n4ae4vqh0g.execute-api.us-west-2.amazonaws.com/v0

## AWS DynamoDB (Fully managed serverless NoSQL database)
```
# Unique field (Primary key)
id = fields.UUID(dump_only=True)

# Name of the node (either a folder or a file)
name = fields.String(required=True, type=str)

# A boolean that determines if this node is a folder
isFolder = fields.Bool(required=True, type=bool)

# Holding the full content of the file. Currently, only supporting storing strings
content = fields.String(dump_only=False, required=True, type=str)

# Used to identify when the field is created
createdTime = fields.DateTime(dump_only=True, format='iso8601')

# Used to identify when the field is last updated
updatedTime = fields.DateTime(dump_only=True, format='iso8601')

# Each item in the table follows the format above, representing an individual node
# A node can be either a file or folder, holding contents. This DynamoDB table stores
# all the node's data, and the frontend parses the data to generate a tree view.
```
## Current supported APIs
```
~~Refer to GenericFunction inside template.yaml for more details~~

GetAllFileSystems:
    Path: /file_system
    Method: get
    Response: All the data inside dynamodb table in an array json format, which ultimately will be parsed by the client to generate a tree view
CreateFileSystems:
    Path: /file_system
    Method: post
    Purpose: To add new item into dynamodb table
DeleteFileSystem:
    Path: /file_system/{file_system_id}
    Method: delete
    Purpose: Delete a field inside the table, based off of an id
    
# Currently, the data is injected into the table using the scripts/add_data_to_aws.py
```

## Future Expansion
- **Change data field**: Another endpoint to make changes to data, such as modifying the node's content
- **User Model**: Create a user model system, where only each user is able to obtain certain file systems
- **Storing all type of files**: Currently, the table is not storing data for file types like images, videos, gif. We want to support this in the future

## How data from table is parsed to generate a tree view
Refer to [Frontend TreeParser](https://github.com/dinhlam2000/tabapay/blob/master/frontend/src/utils/TreeParser.tsx) to see how the data is parsed

## To publish data into dynamoDB 
```
API_ENDPOINT = 'https://n4ae4vqh0g.execute-api.us-west-2.amazonaws.com/v0'
python3 scripts/add_data_to_aws.py
```
## To run unit test locally
```bash
pip install -r app/requirements.txt
pip install -r tests/requirements.txt
pytest tests/unit -v

pytest tests/unit/test_05_service.py -v
pytest tests/unit/appointment/test_03_book_appointment.py::TestClass::test_unlimited_appts
```


