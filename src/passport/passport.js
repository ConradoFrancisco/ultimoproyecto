const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


passport.use('local.signup', new LocalStrategy({
    usernameField: 'NombreUsuario',
    passwordField: 'Contraseña',
    passReqToCallback: true
    
}, async (req,username,password,done) =>{
    const {Nombre, Apellido} = req.body
    const newUser = {
        username,
        password,
        Nombre,
        Apellido
    }
    req.getConnection((err,conn)=>{
        conn.query("INSERT INTO usuarios set ?",[newUser],(err,rows)=>{
            newUser.id = rows.insertId
        })
        return done(null,newUser)
    })

}));

/* passport.serializeUser((user,done) => {
    done(null,user.id)
});

 */