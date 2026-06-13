def use_vision(enabled: bool) -> list[str]:
    # returns tool names; screenshot only if enabled
    if enabled:
        return ["screenshot", "click", "type"]
    return ["click", "type"]
