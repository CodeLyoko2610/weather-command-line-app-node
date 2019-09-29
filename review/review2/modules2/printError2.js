const print = (err)=>{
    if(err.message) console.error(`Errors here: ${err.message}`);
    else{
        console.error(`Errors here: ${err}`);
    }
}

module.exports.print = print;