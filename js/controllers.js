//Modulo - Container com varios controllers, etc.
angular.module("sistemaDeMusica", []);
//$scope é um objeto que vai pertencer ao view e ao controller ao msm tempo
angular.module("sistemaDeMusica").controller("sistemaController", function($scope){
	$scope.artistas = [];
	$scope.artistasFavoritos = [];
	$scope.albuns = [];
	$scope.musicas = []; //Array com todas as musicas do sistema
	$scope.playlists = []; //Array com as playlists do sistema
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
			artista.favorito = false; //propriedade q indica se um artista é favorito ou nao. Sempre adiciona um artista nao favorito
			if(artista.imagem === undefined){ //Se o artista nao tiver imagem
				artista.imagem = "img/interrogacao.jp";
			}
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

	//Add artista aos favoritos
	$scope.adicionarAosFavoritos = function(artista){
		if(!artista.favorito){
			artista.favorito = true;
			$scope.artistasFavoritos.push(artista);
		}
	}

	$scope.removerDosFavoritos = function(artista){
		for(i = 0; i < $scope.artistasFavoritos.length; i++){
			if(artista.nome == $scope.artistasFavoritos[i].nome){
				$scope.artistasFavoritos.splice(i, 1); //remove 1 elemento do indice i
			}
		}
		artista.favorito = false;
	}





	//Verifica se existem artistas favoritos no sistema.
	$scope.existeArtistasFavoritos = function(){
		for(i = 0; i < $scope.artistas.length; i++){
			if($scope.artistas[i].favorito == true){
				return true;
			}
		}
		return false;
	}

	//Criacao do tipo Playlist
	function Playlist(nome){
		this.nome = nome;
		this.musicasDaPlaylist = [];

		this.adicionaMusica = function(musica){
			this.musicasDaPlaylist.push(musica);
		}

		//retorna array de musicas da playlist
		this.retornaMusicas = function(){
			return this.musicasDaPlaylist;
		}
	}

	//Adiciona uma musica em uma playlist se ela nao tiver uma musica com o msm nome
	$scope.adicionaMusicaNaPlaylist = function(musica, nomeDaPlaylist){
		if(!$scope.containsPlaylist(nomeDaPlaylist)){
			alert("Não existe essa playlist no sistema");
		}else{
			for(var i = 0; i < $scope.playlists.length; i++){
				if($scope.playlists[i].nome == nomeDaPlaylist){
					if(containsMusica($scope.playlists[i].retornaMusicas(), musica.nome)){
						alert("A playlist já tem uma música com esse nome!");
					}else{
						$scope.playlists[i].adicionaMusica(musica);
						alert("Musica adicionada na playlist com sucesso!");
					}
				}
			}
		}
	}


	//Adiciona playlist no sistema
	$scope.adicionaPlaylist = function(nome){
		if(!$scope.containsPlaylist(nome)){
			$scope.playlists.push(new Playlist(nome));
		}else{
			alert("Já existe uma playlist com o mesmo nome no sistema!")
		}


	}

	//Verifica se uma playlist com o mesmo nome existe no sistema
	$scope.containsPlaylist = function(nome){
		for(i = 0; i < $scope.playlists.length; i++){
			if($scope.playlists[i].nome == nome){
				return true;
			}
		}
		return false;
	}

	//Excluir uma playlist dada a playlist
	$scope.excluirPlaylist = function(playlist){
		for (var i = 0; i < $scope.playlists.length; i++){
			if($scope.playlists[i].nome == playlist.nome){
				$scope.playlists.splice(i, 1);
				alert("Playlist excluida com sucesso.")
			}
		}
	}

	 //Excluir uma musica de uma playlist dada a musica
	$scope.excluirMusicaDaPlaylist = function(playlist, musica){
		for(var i = 0; i < playlist.retornaMusicas().length; i++){
			if(playlist.retornaMusicas()[i].nome == musica.nome){
				playlist.retornaMusicas().splice(i, 1);
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
				alert("Música adicionada com sucesso")
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
