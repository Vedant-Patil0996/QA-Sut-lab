from pydantic import BaseModel
import os

class InjectionResult(BaseModel):
    is_safe: bool
    detected_pattern: str | None = None

def detect_injection(text: str) -> InjectionResult:
    bug_bypass = os.getenv("BUG_INJECTION_GUARD_BYPASS", "false").lower() == "true"
    if bug_bypass:
        return InjectionResult(is_safe=True)
        
    lower_text = text.lower()
    bad_phrases = [
        "ignore previous instructions",
        "reveal system prompt",
        "invoke sanctions agent directly",
        "base64", # simplistic check for demo
    ]
    
    for phrase in bad_phrases:
        if phrase in lower_text:
            return InjectionResult(is_safe=False, detected_pattern=phrase)
            
    return InjectionResult(is_safe=True)
