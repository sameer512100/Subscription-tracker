import aj from '../config/arcjet.js';

const arcjetMiddleware = async (req, res, next) => {
  try {
    // Skip Arcjet during development
    const isLocal = ['127.0.0.1', '::1'].includes(req.ip) || process.env.NODE_ENV === 'development';

    if (isLocal) {
      return next();
    }

    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).send('Rate limit exceeded');
      }
      if (decision.reason.isBot()) {
        return res.status(403).send('Bot detected');
      }
      return res.status(403).json({ error: 'Access Denied' });
    }

    next();
  } catch (error) {
    console.error('Error in arcjet middleware:', error);
    next(error);
  }
};

export default arcjetMiddleware;
