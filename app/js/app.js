
(function() {
    'use strict';

var value = {
	'host': 'http://192.168.1.154:8083'
    // 'host': 'http://www.epipe.cn:3001'
}

var app = angular.module("app", ["ui.bootstrap", "ui.router","oc.lazyLoad"])
	.config(appConfig)
	.constant('config', value);

function appConfig($provide,$compileProvider,$controllerProvider,$filterProvider){
    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service  =$provide.service;
    app.constant = $provide.constant;
};

})();