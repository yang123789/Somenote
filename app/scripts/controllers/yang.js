
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
          $cookieStore.put("yang",e.uid);
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
}]).controller("c",["$scope","$http","servers","$stateParams","$cookies","$cookieStore",function ($scope,$http,servers,$stateParams,$cookies,$cookieStore) {
  var aa=0;
     $scope.add=function(){
      window.location.href="index.html#/add"
     }
     $scope.uid=$cookieStore.get('yang');
     $scope.zy={"uid":$cookieStore.get('yang')};
      var arr=[];
      $('.tag').find('span').click(function(){
        $(this).attr('class','label label-warning')
        arr.push($(this).text())
      })
      $scope.push=function(){
       $http({
        url:servers+"/item",
        method:'post',
        data:{'title':$scope.title,'content':$scope.content,'tag':arr,'uid':$scope.uid}
       }).success(function(e){
        debugger
       $scope.tid=e.id
       });
       $http({
        url:servers+"/tag",
        method:"POST",
        data:{'tag':arr,'tid':$scope.tid,'uid':$scope.uid}
      }).success(function(e){
        debugger;
         window.location.href="index.html#/contain";
      })
      
     }
     $scope.del=function(e){
        $http({
          url:servers+"/item/"+e.id,
          method:"delete"
        }).success(function(){
          $scope.data.splice($scope.data.indexOf(e),1)
        })
     }
     $scope.zy1=$stateParams
    $scope.save=function(){
      $http({
      url:servers+"/item/"+$scope.zy1.id,
      method:"put",
      data:$scope.zy1
      //withCredentials:true
    }).success(function(e){
      debugger;
      window.location.href="index.html#/contain";
      //$scope.data.push($scope.edddata)
    })
    };
   
    //$scope.xia=true;
  $scope.next=function(){
    aa+=5;
    $http({
       url:servers+"/item/",
       method:"get",
       params:{"$skip":aa,"$limit":5,"uid":$scope.uid}
    }).success(function(e){
      $scope.data=e;
      // if(e.length!=5){
      //   $scope.xia=false
      // }else{
      //   $scope.xia=true
      // }
      //debugger
    })
  }
  $scope.prev=function(){
    if(aa<0){aa=0}
    aa-=5;
    $http({
       url:servers+"/item/",
       method:"get",
       params:{"$skip":aa,"$limit":5,"uid":$scope.uid}
    }).success(function(e){
      $scope.data=e;
      // if(data.length==5){
      //   $scope.xian=true
      // }else{
      //   $scope.xian=false
      // }
      //debugger
    })
  };
 $scope.out=function(){
        $http({
           url:servers+"/users/logout",
           method:"POST",
         }).success(function(e){
         $cookies.remove('abc',$scope.updata) ;
         $cookies.remove('yang')
           window.location.href="index.html#/denglu";
         })
    }
    $scope.yin=false;

    $scope.chazhao=function(){
      $scope.yin=true;
    }
  // $http({
  //   url:servers+"/item",
  //   method:"get"
  // }).success(function(e){
  //   $scope.data=e
  // })
  $http({
       url:servers+"/item",
       method:"get",
       params:{"$skip":aa,"$limit":5,"uid":$scope.uid,'tag':arr}
    }).success(function(e){
      $scope.data=e
      //debugger
    })
}])
