let moment = require('moment');

class Fechas{
    constructor(cumple){
        this.today = moment();
        this.birth = moment(cumple, "DD/MM/YYYY");
    }

    getToday(){
        return this.today.format("L");
    }

    getMyBirthday(){
        return this.birth.format("L");
    }

    getDiffYears(){
        return this.today.diff(this.birth, "years");
    }

    getDiffDays(){
        return this.today.diff(this.birth, "days");
    }

    getDiff(time){
        return this.today.diff(this.birth, time);
    }
}

module.exports = Fechas;