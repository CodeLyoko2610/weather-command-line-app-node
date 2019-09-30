const print = (error)=>{
    if(error.message) console.log(`Errors here: ${error.message}\n-------------------\n`);
    else{
        console.log(`Errors here: ${error}\n-------------------\n`)
    }
}

module.exports.print = print;