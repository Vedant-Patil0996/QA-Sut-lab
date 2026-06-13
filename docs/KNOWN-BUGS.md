# Known Bugs

This file catalogs the intentional, toggleable defects shipped in this SUT.

| Flag | Bug ID | Description | Suite | Expected Behavior |
|------|--------|-------------|-------|-------------------|
| `BUG_REFLECT_INJECTION=true` | BUG-001 | Raw query params echoed in DOM | 3 E2E | Injection string visible in page |
| `BUG_RBAC_VIEWER_ADMIN=true` | BUG-002 | Viewer gets 200 on `/api/admin/health` | 2 CODE/API | Viewer should be 403 |
| `BUG_CROSS_TENANT_LEAK=true` | BUG-003 | 403 response includes other tenant ID | 2 | Leak in error JSON |
| `BUG_INSTANCE_ID_SKIP=true` | BUG-004 | Ignore instance_id mismatch | 2 | Mismatched instance accepted |
| `BUG_CHAT_404=true` | BUG-005 | `/chat` route missing | 3 E2E | INCONCLUSIVE / 404 |
| `BUG_CONSOLE_ERROR=true` | BUG-006 | `/home` throws console error | 10 E2E | console_stable fail |
| `BUG_BLANK_404=true` | BUG-007 | Unknown routes render empty | 10 E2E | not_found fail |
| `BUG_UPLOAD_NO_VALIDATION=true` | BUG-008 | Accept `.exe`, no size limit | 10 | Upload AC fail |
| `BUG_INJECTION_GUARD_BYPASS=true` | BUG-009 | `detect_injection` always safe | 3 CODE | Malicious payload passes |
| `BUG_HISTORY_AUTH=true` | BUG-010 | `/history` accessible without login | 10 | Auth journey fail |
