/**
 * GET /
 * Home page
 */
export const index = (req, res) => res.send('HCA Day of Assignments API')

/**
 * GET /health
 * Health check
 */
export const healthCheck = (req, res) => res.json({ success: true })
