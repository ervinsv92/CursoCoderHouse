const fs = require('fs');
const path = require("path");

class FileHelper{
    constructor(fileName){
        this.fileName = fileName;
    }

    async getAll(){
        let data = [];
        try {
            data = await fs.promises.readFile(path.join(__dirname, '/',this.fileName), 'utf-8');
        } catch (error) {
            console.error("getAll:", error);
        }
        return JSON.parse(data);
    }

    async saveFile(list){
        try {
            await fs.promises.writeFile(path.join(__dirname, '/',this.fileName), JSON.stringify(list));
        } catch (error) {
            console.error("saveFile: ", error);
        }
    }
}

module.exports = FileHelper;