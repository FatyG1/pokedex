//Creación de variables
let data;

//Creación de botones
const pokemon = document.getElementById('namePokemon')   
const btSearch = document.getElementById('btSearch')
const btInfo = document.getElementById('btInfo')
const btStats = document.getElementById('btStats')
const btAbilities= document.getElementById('btAbilities')

//Función insertPokemon conectara con la PokeApi y devolvera el pokemon solicitado
const insertPokemon = async() =>{
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.value.toLowerCase()}`)
        data = await res.json()
       
        const img = data.sprites.other.dream_world.front_default;
            document.querySelector('.containerImg').innerHTML = `
            <img id="image" src=  ${img} >
            `
    }catch (error){
        console.log(error)        
        document.querySelector('.containerModal').innerHTML =`
            
                <dialog id="modal1">
    
                <div class="containerLbModalNull">
                    <label> pokemon not found </label>
                </div> 
    
                <div class="containerModalButtonsNull">
                    <button id="btClose1" onclick="window.modal1.close();">Exit</button>
                </div>
        
                `
                btSearch.addEventListener('click', window.modal1.showModal())        
}
return data; 
}

//Creación de EventListener
btModalSearch.addEventListener('click', insertPokemon)
btAbilities.addEventListener('click', abilitiesPokemon)
btStats.addEventListener('click', statsPokemon)
btInfo.addEventListener('click', infoPokemon)
btSearch.addEventListener('click', clean)

/*Función infopokemon devolvera información sobre el pokemón solicitado
  Si no se ha introducido ningún pokemón lanzará una ventana emergente avisándolo*/
async function infoPokemon(){
    //Variables 
    const pk = await insertPokemon();
    const name = pk.name;
    const experience = pk.base_experience;
    const height = pk.height;
    const weight = pk.weight;

    try{    
        if(pokemon.value == ""){
            document.querySelector('.containerModal').innerHTML =`
            
                <dialog id="modal1">
    
                <div class="containerLbModalNull">
                    <label> You must first look for a pokemon  </label>
                </div> 
    
                <div class="containerModalButtonsNull">
                    <button id="btClose1" onclick="window.modal1.close();">Exit</button>
                </div>
        
                `
            btInfo.addEventListener('click', window.modal1.showModal())
    
        }else{
        document.querySelector('.containerTxt').innerHTML =  `
            <h1> INFO </h1>
            <OL id="list">
                <LI>Name: ${name}</LI> 
                <LI>Experience: ${experience}</LI>    
                <LI>Height: ${height}</LI>
                <LI>Weiht: ${weight}</LI>            
            </OL>
             `
        console.log("Name: " + name + "\n Experience: " + experience + "\n Height: " + height + "\n Weight " + weight)    
        }
    }catch(error){
        console.log(error);
    }
 }

/*Función infopokemon devolvera las estadísticas del pokemón solicitado
  Si no se ha introducido ningún pokemón lanzará una ventana emergente avisándolo*/
async function statsPokemon(){
    //Variables
    const pk = await insertPokemon();
    let statName=[] 
    let statBasic=[]
    let statEffort=[]

    try{
        
        if(pokemon.value == ""){
            document.querySelector('.containerModal').innerHTML =`            
                <dialog id="modal1">

                <div class="containerLbModalNull">
                    <label> You must first look for a pokemon  </label>
                </div> 

                <div class="containerModalButtonsNull">
                    <button id="btClose1" onclick="window.modal1.close();">Exit</button>
                </div>

                </dialog>
                `
            btStats.addEventListener('click', window.modal1.showModal())

        }else{
            document.querySelector('.containerTxt').innerHTML =  `
            <h1> STATS </h1>
            <OL id="list"></OL>
        `
            for(let i = 0; i < pk.stats.length; i++){            
                statName.push([pk.stats[i].stat.name])
                statBasic.push([pk.stats[i].base_stat])
                statEffort.push([pk.stats[i].effort])

                const element = document.createElement("LI");
                const text = document.createTextNode("Name: " + statName[i] + " Basic stat: " + statBasic[i] + " Effort: " + statEffort[i]);
                element.appendChild(text);
                const list = document.getElementById("list");
                list.appendChild(element);

                console.log( console.log("Name: " + statName[i] + "\n Base_stat: " + statBasic[i] + "\n Effort: " + statEffort[i]))
            }    
        }
    }catch(error){
        console.log(error)
    }
 }

/*Función infopokemon devolvera las abilidades del pokemón solicitado.
  Si no se ha introducido ningún pokemón lanzará una ventana emergente avisándolo*/
async function abilitiesPokemon(){
    //Variables
    const pk = await insertPokemon();      
    let ab=[] 

    try{    
        if(pokemon.value == ""){
            document.querySelector('.containerModal').innerHTML =`            
                <dialog id="modal1">

                <div class="containerLbModalNull">
                    <label> You must first look for a pokemon  </label>
                </div> 

                <div class="containerModalButtonsNull">
                    <button id="btClose1" onclick="window.modal1.close();">Exit</button>
                </div>

                </dialog>        
                `
            btAbilities.addEventListener('click', window.modal1.showModal())
        }else{
            document.querySelector('.containerTxt').innerHTML =  ` 
                <h1> ABILITIES </h1>
                <OL id="list"></OL>
                ` 

            for(let i = 0; i < pk.abilities.length; i++){
                console.log(pk.abilities[i].ability.name)
                ab.push([pk.abilities[i].ability.name])
                
                const element = document.createElement("LI");
                const text = document.createTextNode("Name: " + ab[i]);
                element.appendChild(text);
                const list = document.getElementById("list");
                list.appendChild(element);

                console.log(ab[i]) 
                }
            }
    }catch(error){
        console.log(error)
    }
}    

//Función clean limpiara la imagen y el texto cuando se busque un nuevo pokemon
function clean(){
    document.querySelector('.containerTxt').innerHTML =  ``
    document.querySelector('.containerImg').innerHTML =  ``
}
   
            