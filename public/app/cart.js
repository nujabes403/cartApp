/**
 * Created by KIM on 2015-04-03.
 */
angular.module('cartApp',[])
    .controller('cartMainCtrl',function($scope,$http){

        var refresh = function(){
            $http.get('/cart').success(function(response){
                $scope.cartData = response;
            });
        };

        refresh();

        $scope.addCart = function(){
            $http.post('/addCart',$scope.cartInput);
            refresh();
        };

        $scope.deleteCart = function(id){
            $http.delete('/deleteCart/' + id);
            refresh();
        };

        $scope.editCart = function(cart){
            $http.put('/editCart/' + cart._id , cart).success(function(response){
                refresh();
            });
            cart.editOn = false;
        };

    });

