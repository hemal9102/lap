# Global AI Instructions for NextTop Laptop Store

## 🚨 CRITICAL RULE: DOCUMENTATION & ARCHITECTURE SYNC
Whenever you (the AI) make **ANY** changes to the codebase (adding a new feature, changing a route, adding a component, modifying data structures), you **MUST** follow these steps before finishing your task:
1. Update `H:\laptop\ARCHITECTURE.md` and `H:\laptop\README.md` to reflect the new system-wide flow.
2. Update `H:\laptop\frontend\ARCHITECTURE.md` (if frontend changed).
3. Update `H:\laptop\backend\ARCHITECTURE.md` (if backend changed).

## Purpose
This ensures that the architecture diagrams, function mappings, and component relationships are ALWAYS 100% up-to-date. Any future AI that crawls this codebase will rely entirely on these `ARCHITECTURE.md` and `README.md` files to understand the project context instantly.

## AI Crawling Optimization
- Keep all documentation in standard Markdown.
- Use Mermaid (`mermaid`) diagrams for flows.
- Map out precise file imports and component hierarchy.
- Document API requests/responses format accurately.
