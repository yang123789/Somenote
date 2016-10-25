'use strict';

/**
 * @ngdoc overview
 * @name noteApp
 * @description
 * # noteApp
 *
 * Main module of the application.
 */


  angular
  .module('noteApp', ['ui.router','ngCookies']).constant('servers','http://www.somenote.cn:1510').controller("app",function($scope,$http){
    
  }).config(function ($stateProvider,$urlRouterProvider){
    $stateProvider.state("denglu",{
      url:"/denglu",
      templateUrl:"views/denglu.html",
      controller:"b"
    }).state("zhuce",{
      url:"/zhuce",
      templateUrl:"views/zhuce.html",
      controller:"a"
    }).state("contain",{
      url:"/contain",
      templateUrl:"views/contain.html",
    })
    $urlRouterProvider.when('','/denglu')
  })

