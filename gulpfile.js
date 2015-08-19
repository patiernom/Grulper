'use strict';

var gulp     = require('gulp');
var plugins  = require('gulp-load-plugins')();
var helpers = require('grulper-load-projects')('gulp/config.json');
var tasks    = require('grulper-load-tasks');
var options = {
    dirname: helpers.projectSetting.projectDirectory + helpers.projectSetting.projectTasks
};

gulp = tasks(gulp, options, plugins, helpers);

gulp.task('default', helpers.projectSetting.projectTasksDefault);
