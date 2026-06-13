# Agent Smoke Documentation

This document describes the session lifecycle and vision flag for QA Nova Suite 4 CODE targets.

## BrowserSession

The `BrowserSession` class manages the browser context for testing.
- `start(headless: bool)`: Initializes the browser.
- `kill()`: Terminates the browser and cleans up resources.

## Vision Flag

The `use_vision(enabled: bool)` function returns a list of tools. If `enabled` is true, the `screenshot` tool is included, otherwise only `click` and `type` are available.
