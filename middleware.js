import xss from 'xss';

export const sanitizeUserInput = (req, res, next) => {
     const inputString = JSON.stringify(req.body);
    // console.log(inputString)
    const sanitizedInput = xss(inputString);
    const outputObject = JSON.parse(sanitizedInput);
    //console.log(outputObject)
    req.body = outputObject;
    next();
  };
  
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
export function redirectHistory(req, res, next) {
    if (req.session && req.session.loggedIn) next();
    else res.redirect('/login');
}


export function redirectSignup(req, res, next) {
    if (req.session && req.session.loggedIn) res.redirect('/home');
    else next();
}

export function redirectProfile(req, res, next) {
    if (req.session && req.session.loggedIn) next();
    else res.redirect('/login');
}

export function redirectLogout(req, res, next){
    if (req.session && req.session.loggedIn) {
        next();
    }else{
        res.redirect('/login');
    }
}

export function redirectEditEvent(){
    return function(req, res, next){
        if (req.session && req.session.loggedIn) {
            next();
        }else{
            res.redirect('/login');
        }
    }
}

export function redirectCreateEvent(){
    return function(req, res, next){
        if (req.session && req.session.loggedIn) {
            next();
        }else{
            res.redirect('/login');
        }
    }
}




