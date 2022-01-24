
const axios=require('axios')

function sus(){
    const rest=axios.get('http://localhost:8000/total')
    .then((res)=>{
       res.json()
       console.log(res);
    })
    .catch((e)=>{
        console.log(e);
    })
}

const dab=sus()
console.log(dab);