'use strict';
var packageJson = require('./package.json');
var banner = '/**\n' +
  '* ' + packageJson.name + ' v' + packageJson.version + '\n' +
  '* Homepage : ' + packageJson.homepage + '\n' +
  '* Author : ' + packageJson.author + '\n' +
  '* Copyright 2015\n' +
  '* Licensed under ' + packageJson.license.type + ' (' + packageJson.license.url + ')\n' +
  '*/\n';

var concat = require('broccoli-concat');
var funnel = require('broccoli-funnel');
var compileLess = require('broccoli-less-single');
var mergeTrees = require('broccoli-merge-trees');

var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefixPlugin = new LessPluginAutoPrefix();

var publicFolder = funnel('public');
var projectFiles = funnel('app');
var lessFiles = funnel(projectFiles, {
  srcDir: 'styles'
});
var scriptFiles = funnel(projectFiles, {
  srcDir: 'scripts'
});
var less = compileLess(lessFiles, 'app.less', 'app.css', {
  plugins: [autoprefixPlugin]
});
var concatenatedLess = concat(less, {
  inputFiles: [
    'app.css'
  ],
  outputFile: '/metis-layout.css',
  header: banner
});
var concatenatedScripts = concat(scriptFiles, {
  inputFiles: [
    'app.js'
  ],
  outputFile: '/metis-layout.js',
  header: banner
});
var lessMin = compileLess(lessFiles, 'app.less', 'app.min.css', {
  compress: true,
  plugins: [autoprefixPlugin]
});
var concatenatedLessMin = concat(lessMin, {
  inputFiles: [
    'app.min.css'
  ],
  outputFile: '/metis-layout.min.css',
  header: banner
});

module.exports = mergeTrees([publicFolder, concatenatedLess, concatenatedLessMin, concatenatedScripts]);
