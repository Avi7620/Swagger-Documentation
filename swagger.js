
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

module.exports = function(app) {
 
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API documentation for the public API retrieval service',
      },
    },
    apis: ['./server.js'], 
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  
  // Serve Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

 
  app.get('/api/data', async (req, res) => {
    try {
      const fetch = require('node-fetch');
      const { category, limit } = req.query;
      const response = await fetch('https://api.publicapis.org/entries');
      const data = await response.json();
      const filteredData = data.entries
        .filter(entry => !category || entry.Category === category)
        .slice(0, limit || data.entries.length);
      res.json({ entries: filteredData });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data from public API' });
    }
  });
};
