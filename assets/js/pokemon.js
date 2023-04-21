const pokemon = document.getElementById('namePokemon')   
const btnSearch= document.getElementById('btModalSearch')

const insertPokemon = async() =>{
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.value.toLowerCase()}`)
        const data = await res.json()
        console.log(data.name)
        console.log(data)
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
}

btnSearch.addEventListener('click', insertPokemon)

