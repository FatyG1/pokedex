import "../css/style.css"
import "./pokemon.js"
import {getPokemonEventListener} from "./pokemon"

document.querySelector(`#pokedex`).innerHTML = `
<div class="containerCircle">
    <div class="camera">

    </div>

    <div class="circleGreen">

    </div>
    <div class="circleYellow">
        
    </div>
</div>

<div class="containerImg">
    <img class="imgPokemon" />
</div>

<div class="containerTxt">

</div>

<div class="containerButtons">
    <button id="btInfo">INFO</button>
    <button id="btStats">STATS</button>
    <button id="btAbilities">ABILITIES</button>
</div>

<div class="ContainerBtSearch">
    <button id="btSearch" onclick="window.modal.showModal();"></button> 
</div>

<dialog id="modal">

    <div class="containerLbModal">
        <label> Search Pokemon:  </label>
        <input type="text" class:="lbModal" placeholder="Pikachu" />
    </div> 

    <div class="containerModalButtons">
        <button id="btModalSearch">Search</button>
        <button id="btClose" onclick="window.modal.close();">Close</button>
    </div>

</dialog>     
`

getPokemonEventListener(document.querySelector("#getPokemon"))