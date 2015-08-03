var fs = require('fs'),
    path = require('path'),
    minimist = require('minimist'),
    knownOptions = {
        string: 'env',
        default: {env: process.env.NODE_ENV || 'development'}
    },
    options = minimist(process.argv.slice(2), knownOptions),
    getOptions = function (opt) {
        return (options[opt]) ? options[opt] : '';
    },
    getProjectOptions = function (source, name) {
        var projectOpts,
            projectConfig = [],
            current;

        if (fs.existsSync(source)) {
            projectOpts = require(path.resolve(source));
            if (projectOpts.hasOwnProperty(name)) {
                current = projectOpts[name];
                projectConfig[0] = current.rootDirectory;
                projectConfig[1] = current.configuration.base;
                projectConfig[2] = current.configuration.files;
                projectConfig[3] = current.tasks.base;
                projectConfig[4] = current.tasks.default;
            }
        }

        return {
            projectName: name,
            projectDirectory: projectConfig[0],
            projectConfig: projectConfig[1],
            projectConfigFiles: projectConfig[2],
            projectTasks: projectConfig[3],
            projectTasksDefault: projectConfig[4],
            projectPkg: projectConfig[0] + '/package.json',
            processPkg: path.resolve('package.json')
        };
    };

module.exports = function (settings) {
    return getProjectOptions(
            settings || './gulp/config.json',
            getOptions('project') || 'default')
        || {};
};
