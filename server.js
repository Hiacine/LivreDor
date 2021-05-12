let express = require('express')
let bodyParser = require('body-parser')
let session = require('express-session')

const { request } = require('express')
let app = express()


// Middleware
app.use('/assets', express.static('public/'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// les sessions
app.use(session({
    secret: 'clé secrette qui chiffre le cookie',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false  }
  }))

app.use(require('./middlewares/flash'))

// Moteur de templates
app.set("view engine", "ejs")



// routes
app.get('/', (req,res) => {
    let Message = require('./models/message')
    Message.all((messages) => {
        res.render("pages/index", {messages: messages })
    })
})

app.get('/message/:id', (req,res) => {
    let Message = require('./models/message')
    Message.find(req.params.id, (message) => {
        res.render('messages/show', {message : message})
    })
})

app.post('/', (req, res) => {
    if (req.body.message === undefined || req.body.message === ''){
        req.flash('error',"Vous n'avez pas posté de message !");
        res.redirect('/')    
    } else {
        let Message = require('./models/message')
        Message.create(req.body.message, () => {
            req.flash('success', 'Merci');
            res.redirect('/')
        })
    }

    
    
})


app.listen(8000)