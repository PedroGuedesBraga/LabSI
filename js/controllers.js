//Modulo - Container com varios controllers, etc.
angular.module("sistemaDeMusica", []);
//$scope é um objeto que vai pertencer ao view e ao controller ao msm tempo
angular.module("sistemaDeMusica").controller("sistemaController", function($scope){
	$scope.artistas = [];
	$scope.adicionarArtista = function(artista){
		$scope.artistas.push(angular.copy(artista)) //Cria uma copia do objeto artista e ela que sera adicionada ao array
	};
	delete $scope.artista; //Deleta o artista que esta no $scope, a copia ja foi add no array
});




