//var filmes = axios.get('http://www.omdbapi.com/?s=home&apikey=7176bc1f')


$(document).ready(() => {
    $('#buscaForm').on('submit', (e) => {
        let buscaText = $('#buscaText1').val();
        getMovies(buscaText);
        e.preventDefault();
    });
});

var titulos = [];
function buscarTitulos(){
    titulos.push( 'http://www.omdbapi.com/?t='+$('#buscaText1').val().replace(" ", "&")+'&apikey=7176bc1f')
    titulos.push( 'http://www.omdbapi.com/?t='+$('#buscaText2').val().replace(" ", "&")+'&apikey=7176bc1f')
    titulos.push( 'http://www.omdbapi.com/?t='+$('#buscaText3').val().replace(" ", "&")+'&apikey=7176bc1f')
    titulos.push( 'http://www.omdbapi.com/?t='+$('#buscaText4').val().replace(" ", "&")+'&apikey=7176bc1f')
    titulos.push( 'http://www.omdbapi.com/?t='+$('#buscaText5').val().replace(" ", "&")+'&apikey=7176bc1f')

    let botao =  `<input type= "button" class= "btn btn-primary" onclicK = "gerarGrafico();"  value= "Obter Avaliação" /> `
    var elemento = document.getElementById("bot");
    elemento.innerHTML = botao;

  
    buscarFilmes() 

}

var label = [];
var dados = [];
var output = ''; 
function buscarFilmes(){
        //for (var i=0; i<titulos.length; i++){
            $.each(titulos, (index, titulo) => {
                url = titulos[index];
                fetch(url)
		            .then(response => response.json())
		            .then(data => {
                        label.push(data.Title);
                        dados.push(data.imdbRating);
                        output +=`
                            <div class="col-md-2">
                                <div class="well text-center">
                                    <img src="${data.Poster}">
                                    <h5>${data.Title}</h5>
                                </div>
                            </div>
                            ` 
                         })
                     
        })
        
        
    }


var ctx = document.getElementById("line-chart");
function gerarGrafico(){
    $('#movies').html(output);
    console.log(dados)

    
    var chartgraph = new Chart(ctx, {
        type: 'bar',
        data: {
            labels:label,
            datasets:[{
                label:"Avaliação IMdb ",
                data:dados,
                borderWidth: 5,
                borderColor: 'rgba(77, 166, 253, 0.85)',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)'

                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)'
                  ],
                  borderWidth: 1
                }]
              },
              options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Avaliação IMDB',
                        font:{
                            weight: 'bold',
                            size:20
                        }
                    }
                }
            }
              
            })
        

            document.getElementById("legendaDiv").innerHTML = chartgraph.generateLegend("texto para a Div");
        }
   

