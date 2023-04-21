import loginRoutes from './login.js'

const constructorMethod = (app) => {
    app.use('/home', (req, res) => {
        res.render('homepage', {
            title: "Helping Hands"
        })
    })
    app.use('/login', loginRoutes)

    app.use('*', (req, res) => {
        res.redirect('/home')
    })
}

export default constructorMethod;