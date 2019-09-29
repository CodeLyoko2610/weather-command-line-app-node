//Functions
const print = (err)=>{
    if(err.message){
        console.error(`Errors happen: ${err.message}`);
    } else {
        console.error(`Errors happen: ${err}`);        
    }
}

module.exports.print = print;