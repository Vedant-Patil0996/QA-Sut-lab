#!/bin/bash
# start.sh

# Run the database seed (if SQLite is used, it will create lab.db here)
python -m app.seed

# Start the uvicorn server on the port provided by the environment, or 8099
exec uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8099}
