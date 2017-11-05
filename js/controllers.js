//Modulo - Container com varios controllers, etc.
angular.module("sistemaDeMusica", []);
//$scope é um objeto que vai pertencer ao view e ao controller ao msm tempo
angular.module("sistemaDeMusica").controller("sistemaController", function($scope){
	$scope.artistas = [];
	$scope.albuns = [];
	$scope.musicas = []; //Array com todas as musicas do sistema
	$scope.statusCaixaDePesquisaDeArtistas = true;
	$scope.selected; //Variavel usada para se referir ao artista que se está tratando se quiser exibir mais informacoes (US03) - Ver: https://stackoverflow.com/questions/33904251/ng-repeat-does-not-work-in-bootstrap-modal

	//Metodo usado para atualizar o select
	$scope.select = function(artista){
		$scope.selected = artista;
	}


	$scope.changeStatusCaixaPesquisa = function(){ //Usado no botão de pesquisar artistas, deixar visivel caixa de pesquisa
		$scope.statusCaixaDePesquisaDeArtistas = !$scope.statusCaixaDePesquisaDeArtistas;
	}


	$scope.adicionarArtista = function(artista){
		if(existeArtista(artista)){
			alert("Artista já existente no sistema");
		}else{
			$scope.artistas.push(angular.copy(artista)); //Cria uma copia do objeto artista e ela que sera adicionada ao array
			delete $scope.artista; //Deleta o artista que esta no $scope, a copia ja foi add no array
		}
	};
	//funcao que retorna se o array esta populado ou nao
	$scope.isPopulated = function(array){
		return array.length > 0;
	}

	//Verifica se existe artista no array de artistas
	existeArtista = function(artista){
		for(i = 0; i < $scope.artistas.length; i++){
			if($scope.artistas[i].nome === artista.nome){
				return true;
			}
		}
		return false;
	}



	//Atualizar artista - Ultima musica que o usuario ouviu e nota
	$scope.atualizaArtista = function(selectedItem){
		for(i = 0; i < $scope.artistas.length; i++){
			if($scope.artistas[i].nome == selectedItem.nome){
				$scope.artistas[i].nota = selectedItem.nota;
				$scope.artistas[i].ultimaMusica = selectedItem.ultimaMusica;
			}
		}
	}


	//Criacao do tipo album
	function Album(nomeDoAlbum, autorDoAlbum){
		this.musicas = []; //Array de musicas
		this.nomeDoAlbum = nomeDoAlbum;
		this.autorDoAlbum = autorDoAlbum;

		this.pushMusic = function(musica){//Add musica ao album, o album NAO pode ter 2 musicas com o mesmo nome
			if(!containsMusica(this.musicas, musica.nome)){
				this.musicas.push(musica);
				$scope.musicas.push(musica);
			}else{
				alert("Musica ja existente no álbum");
			}
		}
	}


	//Metodo que verifica se existe uma musica em um dado array de musicas
	containsMusica = function(arrayMusica, nomeDaMusica){
		for(i = 0; i < arrayMusica.length; i++){
			if(arrayMusica[i].nome == nomeDaMusica){
				return true;
			}
		}
		return false;
	}



	//Verifica se existe um determinado album com determinado nome, se existir, retorna o album, se nao, retorna um novo album vazio
	retornaAlbum = function(nomeDoAlbum, autor){ //Parametro autor (do album) usado somente se for necessario criar um novo album
		for(i = 0; i < $scope.albuns.length; i++){
			if($scope.albuns[i].nomeDoAlbum == nomeDoAlbum){
				return $scope.albuns[i];
			}
		}
		var novoAlbum = new Album(nomeDoAlbum, autor);
		$scope.albuns.push(novoAlbum);
		alert("Um novo album foi criado - TIRAR ALERT");
		return novoAlbum;
	}


	//Adiciona uma musica a um album que está no array de albuns.
	$scope.adicionaMusica = function(musica){
		album = retornaAlbum(musica.album, musica.autor);
		album.pushMusic(angular.copy(musica));
		delete musica;
	}

	//retorna um array de albuns de um determinado autor dado no parametro
	$scope.retornaAlbuns = function(autor){
		retorno = [];
		for(i = 0; i < $scope.albuns.length; i++){
			if($scope.albuns[i].autorDoAlbum == autor){
				retorno.push($scope.albuns[i]);
			}
		}
		return retorno;
	}






});
