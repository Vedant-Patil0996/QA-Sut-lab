# QA SUT Lab

System Under Test (SUT) designed exclusively for QA Nova Assurance.

## Deployment

```bash
docker compose up --build
```

Access frontend at `http://localhost:5173` and API at `http://localhost:8099`.

## QA Nova Sample Integration

```bash
curl -sS -X POST http://127.0.0.1:8000/api/assurance/runs/start \
  -H "Content-Type: application/json" \
  -d '{
    "ticket_id": "<CLICKUP_TICKET_ID>",
    "repo_url": "https://github.com/OrbitronAI-Repo/qa-sut-lab",
    "e2e_base_url": "http://localhost:5173",
    "force_suites": [2, 3, 4, 10],
    "runners": ["E2E", "API", "CODE"],
    "use_mock_gateway": true,
    "skip_plan_debate": false,
    "skip_spec_debate": false,
    "skip_layer_b": false,
    "skip_execution": false,
    "skip_execution_triage": false,
    "credentials": {
      "strategy": "form_login",
      "username": "admin@lab.local",
      "password": "Admin123!"
    }
  }'
```

See `docs/` for bugs, surfaces, and features.
