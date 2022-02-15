console.log("inicio cant desde el hijo")

process.on('message', message=>{
    let list = [];
    for(let cont = 0;cont < message.message;cont++){
        let random = (Math.floor(Math.random() * (1000 - 1)) + 1);
        let index = list.findIndex(x=>x.random == random);
        if(index>-1){
            list[index].cant = list[index].cant+1;
        }else{
            list.push({
                random:random,
                cant:1
            })
        }
    }

    process.send({list})
})

