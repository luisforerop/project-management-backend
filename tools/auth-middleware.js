import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import passport from 'passport';

export const init = () => {
    const opts = {};
    
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    // Esto deber�a estar en una variable de entorno ya que es nuestra clave
    opts.secretOrKey = 'NuestraClaveSecreta'; 
    
    passport.use(new JwtStrategy(opts, (decoded, done) => {
        console.log('decoded jwt', decoded);
        return done(null, decoded);
    }));
}

export const protectWithJwt = (req, res, next) => {
    if (req.path == '/' || req.path == '/auth/login' || req.path == '/dbconsult' || req.path == '/auth/signUp' || req.path == '/garage/dbcars') {
        return next();
    }
    else {
        return passport.authenticate('jwt', { session: false })(req, res, next);
    }
}

