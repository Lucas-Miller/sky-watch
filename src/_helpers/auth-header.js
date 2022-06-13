// authHeader is a helper function that returns an HTTP authorization header
// which contains the JSON Web Token of the currently logged in user. 
// If no user is logged in, then an empty object is returned.

export function authHeader() {
    // Returns an authorization header with a JWT token
    let user = JSON.parse(localStorage.getItem('user'));

    if(user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}