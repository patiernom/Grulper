var path     = require('path');
var glob     = require('glob');
var defaults = require('defaults');

function isString(str) {
    return typeof str === 'string' || str instanceof String;
}

function isFunction(func) {
    return typeof func === 'function';
}

module.exports = function(gulp, plugins, helpers, options){
    if (isString(options)) {
        options = { dirname: options };
    }

    // Establish the defaults
    options = defaults(options, {
        dirname: 'tasks',
        cwd: process.cwd(),
        pattern: '*.js'
    });

    var tasksPattern = path.join(helpers.getProjectSetting.projectDirectory,helpers.getProjectSetting.projectConfig,options.dirname, options.pattern);
    var taskFiles    = glob.sync(tasksPattern, {cwd: options.cwd});

    taskFiles.map(function (taskFile) {
        var basename     = path.basename(taskFile, path.extname(taskFile));
        var task         = require(path.join(options.cwd, taskFile));
        var taskFunc     = isFunction(task) ? task(gulp, plugins, helpers) : null;
        taskFunc = isFunction(taskFunc) ? taskFunc : null;

        gulp.task(basename, taskFunc);
    });

    return gulp;
};
