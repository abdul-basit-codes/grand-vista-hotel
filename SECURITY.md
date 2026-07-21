# Security Policy

## Known Limitations

### In-Memory API Storage
The Vercel serverless API stores all data in memory. Data resets on cold start. For production use, integrate a database.

### CORS Configuration
API endpoints use `Access-Control-Allow-Origin: *`. Restrict to your domain in production.

### No Authentication
API endpoints have no authentication. Add JWT or session-based auth for production use.

## Recommendations

- Use a database (PostgreSQL, MongoDB) for persistent storage
- Restrict CORS origins to your domain
- Add authentication and authorization
- Implement rate limiting on API endpoints
- Validate and sanitize all user inputs
