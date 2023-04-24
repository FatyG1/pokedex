const pokemon = document.getElementById('namePokemon')   
const btnSearch= document.getElementById('btModalSearch')
const btInfo = document.getElementById('btInfo')
const btStats = document.getElementById('btStats')
const btAbilities= document.getElementById('btAbilities')
let data;

const insertPokemon = async(id) =>{
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.value.toLowerCase()}`)
        data = await res.json()
      
       
        if(data.status === 404){
            console.log('No se ha encontrado el Pokemon')
        }else{           
        
        const img = data.sprites.other.dream_world.front_default;
            document.querySelector('.containerImg').innerHTML = `
            <img id="image" src=  ${img} >
            `
        }
   }catch (error){
        console.log(error)        
}
return data; 
}

btnSearch.addEventListener('click', insertPokemon)
btAbilities.addEventListener('click', abilitiesPokemon)
btStats.addEventListener('click', statsPokemon)
btInfo.addEventListener('click', infoPokemon)

async function infoPokemon(){
    
    const pk = await insertPokemon();
    
        const name = pk.name;
        const experience = pk.base_experience;
        const height = pk.height;
        const weight = pk.weight;

    
         document.querySelector('.containerTxt').innerHTML =  `
             <p>${name}</p> 
             <p>${experience}</p>    
             <p>${height}</p>
             <p>${weight}</p>            
              
             `
         console.log("Name: " + name + "\n Experience: " + experience + "\n Height: " + height + "\n Weight " + weight)    
        
 }


async function statsPokemon(){
    
    const pk = await insertPokemon();
    
    let sn=[] 
    let bs=[]
    let se=[]

    for(let i = 0; i < pk.stats.length; i++){
         
         sn.push([pk.stats[i].stat.name])
         bs.push([pk.stats[i].base_stat])
         se.push([pk.stats[i].effort])
         document.querySelector('.containerTxt').innerHTML =  `
             <p>${sn}</p> 
             <p>${bs}</p>    
             <p>${se}</p>          
              
             `
         console.log("Name: " + sn[i] + "\n Base_stat: " + bs[i] + "\n Effort: " + se[i])    
     }    
 }

async function abilitiesPokemon(){
    
   const pk = await insertPokemon();
   console.log(pk);
let ab=[] 
       for(let i = 0; i < pk.abilities.length; i++){
        console.log(pk.abilities[i].ability.name)
        ab.push([pk.abilities[i].ability.name])
        
        document.querySelector('.containerTxt').innerHTML =  `
            <p>${ab}</p>  
            `
        console.log(ab[i])    
    }    
}
