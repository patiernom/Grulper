'use strict';

var gulp     = require('gulp');
var plugins  = require('gulp-load-plugins')();
var settings = require('./gulp/loadSettings')('gulp/config.json');
var helpers  = require('./gulp/helpers')(settings);
var tasks    = require('grulper-load-tasks');
var options = {
    dirname: settings.projectDirectory + settings.projectTasks
};

gulp = tasks(gulp, options, plugins, helpers);

gulp.task('default', ['scripts']);
