//Functions
const printError = (err)=>{
    if(err.message){
        console.error(`Errors happen: ${err.message}`);
    } else {
        console.error(`Errors happen: ${err}`);        
    }
}

module.exports.printError = printError;