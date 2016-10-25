
angular.module("noteApp").controller("a",["$scope","$http","servers",function ($scope,$http,servers) {
	$scope.sign=function(){
         $http({
           url:servers+"/users",
           method:"POST",
           data:$scope.updata
         }).success(function(e){     
            window.location.href="index.html#/denglu"
         })
      }
}]).controller("b",["$scope","$http","servers","$cookies","$cookieStore",function ($scope,$http,servers,$cookies,$cookieStore) {
      if($cookies.get('abc',$scope.updata)){
                window.location.href="index.html#/contain";
            };
       $scope.log=function(){
        $http({
           url:servers+"/users/login",
           method:"POST",
           data:$scope.updata
         }).success(function(e){    
           if($scope.check==true){
                $cookieStore.put("abc",$scope.updata);        
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 6);
                // Setting a cookie
                $cookies.put('abc', $scope.updata, {'expires': expireDate});
                window.location.href="index.html#/contain";
              } else{
                 window.location.href="index.html#/contain";
              }
         })
      }
}])
