## env
```bash
export $(cat env/local.env)
```

## To run unit test locally
```bash
pip install -r app/requirements.txt
pip install -r tests/requirements.txt
pytest tests/unit -v

pytest tests/unit/test_05_service.py -v
pytest tests/unit/appointment/test_03_book_appointment.py::TestClass::test_unlimited_appts
```


## To publish data into dynamoDB 
```
API_ENDPOINT = 'https://n4ae4vqh0g.execute-api.us-west-2.amazonaws.com/v0'
python3 scripts/add_data_to_aws.py
```
