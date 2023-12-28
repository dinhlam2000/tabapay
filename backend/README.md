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
