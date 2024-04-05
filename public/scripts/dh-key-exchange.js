class KeyExchange {
    favouriteNum;
    partnerPubKey;
    pubKey;
    privateKey;

    constructor(){
        this.favouriteNum = this.randomFavouriteNum()
    }

    /**
     * Generate a randmom number from 1-100
     */
    randomFavouriteNum(){
        // Generates the private key for the frontend
        return Math.floor(Math.random() * 101);
    }
    
    /**
     * Splits a number like 0417 into [04, 17]
     * @param {number} roomKey The roomkey number of a room
     * @returns {Array} An array of the two numbers
     */
    splitRoomKey(roomKey){
        if(roomKey.length != 4){
            throw new Error("Room key has to have 4 numbers E.g: 0314")
        }
        if (typeof(roomKey) == String) {
            roomKey = roomKey.toString()
        }
        return [roomKey.slice(0,2), roomKey.slice(2,4)]
    }
    
    /**
     * Performs calcuations to generate the public key
     * @param {Number} p prime number 1
     * @param {Number} g prime number 2
     */
    setPublicKey(p, g){
        if(isNaN(p) || isNaN(g)){
            throw new Error('Parameters are not a number')
        }
        this.pubKey = (BigInt(p)**BigInt(this.favouriteNum)) % BigInt(g)
        this.pubKey = this.pubKey.toString()
    }

    /**
     * Sets the partnerPubKey Variable in this class            
     * @param {Number} partnerPubKey Partner's public key
     */
    setPartnerPubKey(partnerPubKey){
        if(isNaN(partnerPubKey)){
            throw new Error('Parameters are not a number')
        }
        this.partnerPubKey = partnerPubKey
    }

    /**
     * Generates the private key for this class
     * @param {number} g prime number 2
     */
    generatePrivateKey(g) {
        if(isNaN(g)){
            throw new Error('Parameters are not a number')
        }
        this.privateKey = (BigInt(this.partnerPubKey)**BigInt(this.favouriteNum)) % BigInt(g)
        this.privateKey = this.privateKey.toString()
    }
}