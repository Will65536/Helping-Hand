export function logger(req, res, next) {
    let userRole = 'Non-Authenticated User';
    if (req.session && req.session.loggedIn) {
        userRole = 'Authenticated User';
    }
    console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} (${userRole})`);
    next();
}


// Add any middleware functions you need here.
export function redirectLogin(req, res, next) {
    if (req.session && req.session.loggedIn) res.redirect('/home');
    else next();
}

export function redirectSignup(req, res, next) {
    if (req.session && req.session.loggedIn) res.redirect('/home');
    else next();
}

// export function redirectLogout(req, res, next){
//     if (req.session && req.session.loggedIn) {
//         next();
//     }else{
//         res.redirect('/login');
//     }
// }