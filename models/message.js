let connection = require('./config/db');
let moment = require('./config/moment')

class Message {

    constructor(row){
        this.row = row
    }


    get id() {
        return this.row. id
    }

    get content(){
        return this.row.content
    }

    get created_at(){
        return moment(this.row.created_at) 
    }


    static create(content, cb) {
        connection.query("INSERT INTO messages SET content = ?, created_at = ?", [content, new Date()], (err,results ) => {
            if (err) throw err;

            cb(results)
        });
    }


    static all(cb) {
        connection.query("SELECT * from messages", (err, rows) => {
            if (err) throw err;

            cb(rows.map((row) => new Message(row)))

        })
    }

    static find(id, cb) {
        connection.query("SELECT * from messages WHERE id = ? LIMIT 1",[id] , (err, row) => {
            if (err) throw err;

            cb(new Message(row[0]))

        })
    }   

}

module.exports = Message