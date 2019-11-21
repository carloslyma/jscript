(function(){
    
    /**array para armazenar os objetos com imagem e id 
     * da carta 1 a 8
     */
    var images = [];
    //fim de jogo 
    var modal = document.querySelector("#gameOver");
    //array para armazenar as cartas viradas 
    var flippedCards = [];
    //imagem de acertos 
    var matchSing = document.querySelector("#match");
    //variavel conta os acertos até o 8
    var matches = 0;
    
    
    
    
    
    
    /** imagens para as cartas
     * objeto var e seus atributos(imagem e id )
     */
    for ( var i = 0; i < 16; i++ ){
        var img = {
            src:"imgweb/" + i +".png",
            id: i % 8
        };


        images.push(img);
         /** cada objeto gerado é inserido no array*/
    }


    /** chamar fução */ 
	startGame();
    


    /** função para iniciar jogo */ 
	function startGame () {
        //zera o array de cartas viradas 
        flippedCards = [];
        //zera o contador de acertos
        matches = 0;
        //embaralhar as imagens do array
        images = randomSort(images);
      

        /** var -> armazenar referencia de todos os divs 
        que possui clace face */
        
        /** getelements -> trazer todos os elementos 
         * que possui a classe passada no parametro 
        */
        var backFaces = document.getElementsByClassName("back");
        var frontFaces = document.getElementsByClassName("front");
        
        
        /**distribuir e organizar as cartas */
        for(var i = 0; i < 16; i++){
            //limpa as cartas marcadas
            backFaces[i].classList.remove("match","flipped");
            frontFaces[i].classList.remove("match","flipped");
            //posiciona as cartas 
            var card = document.querySelector("#card" + i);
            card.style.left = (i % 8) === 0 ? 5 + "px" : 5 + ((i % 8) * 165) + "px";
            card.style.top = i/8 >= 1 ? 250 + "px" : 5 + "px";
            /** atribuir a cada carta um evento que vai
            disparar função que movimenta a carta*/
            card.addEventListener("click",flipCard,false);


            /** pra cada div que ele capturou atribuir um backgroud (imagem) */
            backFaces[i].style.background = "url("+images[i].src +")";
            backFaces[i].setAttribute = ("id, images[i].id");
        
        }  
        //joga a imagem de gameover para o plano de fundo
        modalGameOver.style.zIndex = -2;
        //remove o evento click da imagem game over
		modalGameOver.removeEventListener('click',function(){
            startGame();
        },false);
    }

   //funçao de virar cartas 
    function flipCard(){
        //verifica se o numero de cartas é menor que dois 
        if(flippedCards.length < 2){
    
            //pega as faces das cartas clicadas 
            var faces = this.getElementsByClassName("face");

            // impede que a msm carta seja virada mais de uma vez
            if(faces[0].classList.length >2){
                return;
            }
            // adiciona a classe fliped as faces da carta para que sejam viradas 
            faces[0].classList.toggle("flipped");
            faces[1].classList.toggle("flipped"); 

            flippedCards.push(this);


            if(flippedCards.length === 2){
				//compara o id das cartas viradas para ver se houve um acerto
				if(flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id){
					//em caso de acerto adiciona a classe match a todas as faces das duas cartas presentes no array de cartas viradas
					flippedCards[0].childNodes[1].classList.toggle("match");
					flippedCards[0].childNodes[3].classList.toggle("match");
					flippedCards[1].childNodes[1].classList.toggle("match");
					flippedCards[1].childNodes[3].classList.toggle("match");
					
					//chama a função que exibe a mensagem MATCH
					matchCardsSign();
					
					//limpa o array de cartas viradas
					flippedCards = [];
					
					//soma um ao contador de acertos
					matches++;
					
					//verifica se o contador de acertos chegou a 8
					if(matches >= 8){
						//caso haja 8 acertos, chama a função que finaliza o jogo
						gameOver();
					}
				} 
			} 

        }

            else {
                /**em caso haver duas cartas no array de cartas viradas
                 * (terceiro click) remove a classe flipped das cartas 
                 * no array de cartas viradas*/
                flippedCards[0].childNodes[1].classList.toggle("flipped");
                flippedCards[0].childNodes[3].classList.toggle("flipped");
                flippedCards[1].childNodes[1].classList.toggle("flipped");
                flippedCards[1].childNodes[3].classList.toggle("flipped");

                //limpa o array de cartas viradas
                flippedCards = [];

    
            }
    }




    /**Funçao embaralhar carta
     * recebendo um array de cartas por parâmetro
    */
    function randomSort(oldArray){

        /**criar array vazio, avaliar o numero de elementos do array
         * criar um indice  com valor aleatório
         * avaliar se o elemento indicado já existe no novo array
         * inserir o elemento indicado no novo array 
        */
       //array vazio 
        var newArray = [];
        /**executa o while até que o novo array tenha quantidade de elementos igual 
         * ao array passado no parametro
        */
        while(newArray.length !== oldArray.length){
            /**cria uma variável i recebendo um número 
            aleatório entre 0 e o número de elementos no array -1*/
            var i = Math.floor (Math.random()*oldArray.length);
            if(newArray.indexOf(oldArray[i]) < 0 ){
                newArray.push(oldArray[i]);
            }
        }

        return newArray;
    }



    window.setTimeout(function(){
        gameOver();
    },1000);
            
   
    function gameOver(){
        modalGameOver.style.zIndex = 99;
        modalGameOver.addEventListener("click",startGame,false);
    }


    
    }
}());