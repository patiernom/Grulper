'use strict';

var gulp     = require('gulp');
var plugins  = require('gulp-load-plugins')();
var settings = require('./gulp/loadSettings')('gulp/config.json');
var helpers  = require('./gulp/helpers')(settings);
var tasks    = require('./gulp/loadTasks');

gulp = tasks(gulp, plugins, helpers, {
    dirname: settings.projectTasks,   // The directory that tasks are located in
    pattern: '*.js',    // Pattern to use when looking for task files
    cwd: process.cwd() // Current working directory configuration
});

gulp.task('default', ['scripts']);
