const bcrypt = require('bcrypt');


/***********************************************
 ASYNC MODE IS RECOMMENDED!
 Bcrypt hashing is CPU intensive that will cause the sync APIs to block the event loop and prevent our application
 from servicing any inbound requests or events. The async version uses a thread pool which does not block the main
 event loop.
     ********************************************/

const encryptPassword = async (password) => {
    try {
        // with hash method, we can salt and hash the password in one go.
        // hash itself is not enough to prevent attacks, adding salt makes it more unpredictable for attackers.
        const salt = 11;
        return await bcrypt.hash(password, salt);

    }catch(e){
        console.error(e.message);
    }
}


module.exports = {
    encryptPassword
}