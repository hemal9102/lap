@../AGENTS.md

# Commands
- `npm run dev`: Start the server with Nodemon for hot-reloading.
- `npm start`: Start the server with Node (production).

# Style Guidelines
- Use Express.js for routing.
- Group routes logically (Public vs Admin).
- Return consistent JSON responses (e.g., `{ success: true, data: ... }`).
- Use HTTP status codes correctly (200 OK, 201 Created, 400 Bad Request, 404 Not Found).

# 🚨 AI INSTRUCTION: ARCHITECTURE UPDATE REQUIRED
If you add new API endpoints, change the data structure, or modify routing logic in `server.js`, you MUST immediately update `H:\laptop\backend\ARCHITECTURE.md` and the root `H:\laptop\README.md`. This ensures any future AI reading this repository has accurate context.
