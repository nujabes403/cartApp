/**
 * Created by KIM on 2015-04-03.
 */
angular.module('cartApp',[])
    .controller('cartMainCtrl',function($scope,$http){

        var refresh = function(){
            $http.get('/cart').success(function(response){
                $scope.cartData = response;
                $scope.cartInput ="";
            });
        };

refresh();

        $scope.addCart = function(){
            $http.post('/addCart',$scope.cartInput);
            refresh();
        };
    });

