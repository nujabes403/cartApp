/**
 * Created by KIM on 2015-04-03.
 */
angular.module('cartApp',[])
    .controller('cartMainCtrl',function($scope,$http){

        //cart

        var refresh = function(){
            $http.get('/cart').success(function(response){
                $scope.cartData = response;
            });
        };

        refresh();

        $scope.addCart = function(){
            $http.post('/addCart',$scope.cartInput).success(function(response){
                refresh();
            });
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

        //Login Control
        $scope.initLoginForm = function(){
            $scope.user.id = "";
            $scope.user.password = "";
        };
        $scope.loginForm = true;
        $scope.loginError = false;

        $scope.submitLogin = function(user){
            $http.post('/login' , user).success(function(response){
                if(response == "error"){
                    console.log("Client : 로그인 실패");
                    $scope.loginError = true;
                }
                else{
                    $scope.loginForm = false;
                    $scope.loginError = false;
                }
            });
        }
        $scope.logout = function(){
            $scope.initLoginForm();
            $scope.loginError = false;
            $scope.loginForm = true;
        }
    });

