let $pokemonJSON = 'https://pokeapi.co/api/v2/pokemon/';
let $main = $('#main');
let $mainDetail = $('#mainDetail');
let $pagination = $('#pagination');

function responseHandler()
{
    $.ajax({
        "url": $pokemonJSON,
    }).done((data) => {

        $main.empty();
        $mainDetail.empty();

        for(var i = 0; i < data.results.length; i++)
        {
            let imageID = data.results[i].url.split('/')
            let pokemonID = imageID.pop() || imageID.pop();
            let url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemonID + '.png'
            var pokemon = data.results[i];
            detailPokemonUrl = "Detail.htm?id=" + pokemonID;
            
            (detailPokemonUrl !== "") ? '<href="' + detailPokemonUrl + '">' : '<href="Index.htm">';
            $main.append(
                '<div class="card col-sm-3 middle">' + 
                    '<a href=" ' + detailPokemonUrl + ' ">' +
                        '<img src="' + url + '">' + 
                        '<p>' + pokemonID + ', ' + pokemon.name + '</p>' + 
                    '</a>' + 
                '</div>'
            );
        }
        
        let url = window.location.href;
        let arrayId = url.split("=");
        let id = arrayId[1];
        let $pokemonDetailJSON = 'https://pokeapi.co/api/v2/pokemon/' + id;
        let imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png'
        $.ajax({
            "url": $pokemonDetailJSON,
        }).done((data) => {
            $mainDetail.append(
                '<div class="col-sm-12 middle darkgrey">' +
                    '<div class="col-sm-6 lightgray">' +
                        '<div class="middle">' +
                            '<p>#' + id + ', ' + data.name +'</p>' +
                            '<img src="' + imgUrl + '">' +
                            '<p>Type: <br />' 
            )       
                                for (i = 0; i < data.types.length; i++)
                                { 
                                    $mainDetail.append(data.types[i].type.name + '<br />'); 
                                }
            $mainDetail.append(
                            '</p>' +
                        '</div>' +
                    '</div>' +
                    '<div class="col-sm-6 lightgray middle">' +
                        '<p>Abilities: <br />'
            )
                                for (i = 0; i < data.abilities.length; i++) 
                                {
                                    $mainDetail.append(data.abilities[i].ability.name + '<br />');
                                }
            $mainDetail.append(
                        '</p>' +
                        '<div class="middle">' +
                        '<p>Basestats:'
            )
                        for (i = 0; i < data.stats.length; i++)
                        {
                            $mainDetail.append(data.stats[i].stat.name + ': ' + data.stats[i].base_stat + '<br />');
                        }
            $mainDetail.append(
                        '</p>' + 
                        '</div>' +
                    '</div>' +
                '</div>'
            )
        });
        

        $("#next").off("click").on("click", function()
        {
            if (data.next !== null)
            {
                $pokemonJSON = data.next;
                responseHandler()
            }
        });

        $("#previous").off("click").on("click", function ()
         {
            if(data.previous !== null)
            {
                $pokemonJSON = data.previous;
                responseHandler()
            }
        });

        $("#nextDetail").off("click").on("click", function ()
         {
            if (data.next !== null) 
            {
                let url = window.location.href;
                let arrayId = url.split("=");
                let id = arrayId[1];
                id++;
                let $pokemonDetailJSON = 'https://pokeapi.co/api/v2/pokemon/' + id;
                $pokemonJSON = $pokemonDetailJSON;
                responseHandler()
            }
        });

        $("#previousDetail").off("click").on("click", function () 
        {
            if (data.previous !== null) 
            {
                let url = window.location.href;
                let arrayId = url.split("=");
                let id = arrayId[1];
                id--;
                let $pokemonDetailJSON = 'https://pokeapi.co/api/v2/pokemon/' + id;
                $pokemonJSON = $pokemonDetailJSON;
                responseHandler()
            }
        });
    });
}

responseHandler();