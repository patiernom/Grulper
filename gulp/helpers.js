var path = require('path');

module.exports = function (settings) {
    var basePath = settings.projectDirectory + settings.projectConfig + '/',
        getConfigFile = function(name){
            return settings.projectConfigFiles[settings.projectConfigFiles.indexOf(name + ".json")];
        };

    return {
        getLibrary: function (name) {
            var file = basePath + getConfigFile(name);

            return require(path.resolve(file));
        },
        getProjectSetting: settings
    }
};
