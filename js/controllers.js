//Modulo - Container com varios controllers, etc.
angular.module("sistemaDeMusica", []);
//$scope é um objeto que vai pertencer ao view e ao controller ao msm tempo
angular.module("sistemaDeMusica").controller("sistemaController", function($scope){
	$scope.artistas = [];
	$scope.adicionarArtista = function(artista){
		if(existeArtista(artista)){
			//Se ja existe, nao faz nada, nao adiciona
		}else{
			$scope.artistas.push(angular.copy(artista)) //Cria uma copia do objeto artista e ela que sera adicionada ao array
			delete $scope.artista; //Deleta o artista que esta no $scope, a copia ja foi add no array
		}
	};
	//funcao que retorna se o array esta populado ou nao
	$scope.isPopulated = function(array){
		return array.length > 0;
	}

	//Verifica se existe artista no array de artistas
	function existeArtista(artista){
		for(i = 0; i < $scope.artistas.length; i++){
			if($scope.artistas[i].nome === artista.nome){
				return true;
			}
		}
		return false;
	}


});
