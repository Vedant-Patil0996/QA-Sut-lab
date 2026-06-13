def authorize(role: str, required: str) -> bool:
    hierarchy = {"viewer": 1, "analyst": 2, "admin": 3}
    return hierarchy.get(role, 0) >= hierarchy.get(required, 0)

def validate_instance_id(token_instance: str, expected: str) -> bool:
    return token_instance == expected
