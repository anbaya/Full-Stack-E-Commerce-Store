const healthServices = require('../services/health.services.js');

const healthCheck = async (req, res) => {
  try {
    const dbHealth = await healthServices.DBhealthCheck();
    const mailerHealth = await healthServices.mailerHealthCheck();
    const fileHealth = await healthServices.fileSystemHealth();
    const secretsValidation = healthServices.secretsValidation();
    const nodeHealth = healthServices.nodeHealthCheck();

    const overallStatus =
      dbHealth.status === 'healthy' && mailerHealth.status === 'healthy'
        ? 'healthy'
        : 'degraded';

    res.json({
      status: overallStatus,
      checks: {
        database: dbHealth,
        mailer: mailerHealth,
        fileSystem: fileHealth,
        secrets: secretsValidation,
        node: nodeHealth,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Health check failed',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

module.exports = healthCheck;
