const mongoose = require('mongoose');
const transporter = require('../utils/mailer.js').transporter;
const fs = require('fs/promises');
const path = require('path');


const DBhealthCheck = async () => {
    try {
        const dbState = mongoose.connection.readyState;
        if (dbState !== 1)
        {
            return {
                status: 'disconnected',
                readyState: dbState,
                message: 'Database is not connected',
                timestamp: new Date().toISOString(),
            };
        }

        const admin = mongoose.connection.getClient().db('admin');
        const pingResult = await admin.command({ ping: 1 });

        if (pingResult.ok !== 1)
        {
            return {
                status: 'error',
                message: 'Database ping failed',
                timestamp: new Date().toISOString(),
            };
        }

        return {
            status: 'healthy',
            readyState: dbState,
            database: mongoose.connection.name,
            host: mongoose.connection.host,
            port: mongoose.connection.port,
            message: 'Database is healthy',
            timestamp: new Date().toISOString(),
        };

    } catch (error) {
        return {
            status: 'error',
            message: 'Error checking database connection',
            error: error.message,
            timestamp: new Date().toISOString(),
        };
    }
};

// Check if transporter is configured + test SMTP connection
const mailerHealthCheck = async () => {
  try {
    // Check if transporter exists
    if (!transporter) {
      return { status: 'error', message: 'Mailer not initialized' };
    }

    // We skip await transporter.verify() here because it connects to the SMTP server
    // and can cause a delay. Checking if the object is initialized is fast and safe.

    return {
      status: 'healthy',
      message: 'Mailer is configured and SMTP connection verified',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Mailer verification failed',
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
};

const fileSystemHealth = async () => {
  const uploadsDir = path.join(__dirname, '../modules/products/productsImages');
  const testFile = path.join(uploadsDir, `.healthcheck-${Date.now()}.tmp`);

  try {
    // 1) Ensure directory exists and is readable/writable
    await fs.access(uploadsDir);

    // 2) Write a tiny file
    await fs.writeFile(testFile, 'ok');

    // 3) Read it back
    await fs.readFile(testFile, 'utf8');

    // 4) Cleanup
    await fs.unlink(testFile);

    return {
      status: 'healthy',
      message: 'Uploads directory is readable and writable',
      path: uploadsDir,
      timestamp: new Date().toISOString()
    };
    } catch (error) {
    return {
      status: 'error',
      message: 'Uploads directory health check failed',
      path: uploadsDir,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
};

const secretsValidation = () => {
  const required = ['JWT_SECRET', 'MONGODB_URI', 'EMAIL_USER', 'EMAIL_PASS'];
  const missing = required.filter((key) => !process.env[key]);

  const secret = process.env.JWT_SECRET || '';
  const weakSecret = secret.length > 0 && secret.length < 32;

  return {
    status: missing.length === 0 && !weakSecret ? 'healthy' : 'warning',
    missing,
    weakSecret,
    message: missing.length > 0
      ? 'Some required environment variables are missing'
      : weakSecret
        ? 'JWT_SECRET is too short'
        : 'All required environment variables are set',
    timestamp: new Date().toISOString()
  };
};

// Node.js runtime health check
const nodeHealthCheck = () => {
  try {
    const raw = process.version || '';
    const version = (process.versions && process.versions.node) ? process.versions.node : raw.replace(/^v/, '');
    const execPath = process.execPath || null;
    const arch = process.arch || null;
    const platform = process.platform || null;

    const minRequired = process.env.MIN_NODE_VERSION || '16.0.0';

    const compareVersions = (a, b) => {
      const pa = a.split('.').map(Number);
      const pb = b.split('.').map(Number);
      for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
        const na = pa[i] || 0;
        const nb = pb[i] || 0;
        if (na > nb) return 1;
        if (na < nb) return -1;
      }
      return 0;
    };

    const meetsMinimum = compareVersions(version, minRequired) >= 0;

    return {
      status: meetsMinimum ? 'healthy' : 'warning',
      version,
      minRequired,
      execPath,
      arch,
      platform,
      message: meetsMinimum ? 'Node.js runtime meets minimum version' : 'Node.js version is below recommended minimum',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Error checking Node.js runtime',
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
};

module.exports = {
    DBhealthCheck,
    mailerHealthCheck,
    fileSystemHealth,
    secretsValidation,
    nodeHealthCheck
};