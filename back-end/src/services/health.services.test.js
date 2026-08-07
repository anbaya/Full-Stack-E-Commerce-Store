const { describe } = require('node:test');
const {
  secretsValidation,
  nodeHealthCheck,
  DBhealthCheck,
} = require('./health.services');

describe('Health Services', () => {
  describe('secretsValidation', () => {
    // Save original env vars to restore them after tests
    const originalEnv = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...originalEnv };
    });

    afterAll(() => {
      process.env = originalEnv;
    });

    it('should return healthy if all required secrets are present and valid', () => {
      process.env.JWT_SECRET = 'super_secret_key_that_is_32_characters_long!!!';
      process.env.MONGODB_URI = 'mongodb://localhost:27017/db';
      process.env.EMAIL_USER = 'user@test.com';
      process.env.EMAIL_PASS = 'password123';

      const result = secretsValidation();

      expect(result.status).toBe('healthy');
      expect(result.missing).toHaveLength(0);
      expect(result.weakSecret).toBe(false);
    });

    it('should return warning if required secrets are missing', () => {
      delete process.env.EMAIL_PASS; // simulate missing variable

      const result = secretsValidation();

      expect(result.status).toBe('warning');
      expect(result.missing).toContain('EMAIL_PASS');
    });

    it('should return warning if JWT_SECRET is too short', () => {
      process.env.JWT_SECRET = 'short'; // under 32 chars
      process.env.MONGODB_URI = 'mongodb://localhost:27017/db';
      process.env.EMAIL_USER = 'user@test.com';
      process.env.EMAIL_PASS = 'password123';

      const result = secretsValidation();

      expect(result.status).toBe('warning');
      expect(result.weakSecret).toBe(true);
    });
  });

  describe('nodeHealthCheck', () => {
    it('should return healthy if Node version meets minimum requirements', () => {
      const result = nodeHealthCheck();

      // We assume the system running the test has at least Node v16
      expect(result.status).toBe('healthy');
      expect(result.message).toBe('Node.js runtime meets minimum version');
    });
  });
});
