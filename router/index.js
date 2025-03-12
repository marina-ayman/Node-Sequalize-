// routes/index.js
const express = require('express');
const router = express.Router();
const glob = require('glob');
const path = require('path');

glob.sync('./**/*.js', { cwd: __dirname })
  .filter(file => file !== 'index.js')
  .forEach(file => {
    const route = require(path.join(__dirname, file));

    const prefix = file
      .replace('./', '') 
      .replace('.js', '') 
      .replace('/index', '')

    router.use(`/${prefix}`, route);
  });

module.exports = router;