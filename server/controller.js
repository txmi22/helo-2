const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res)=>{
        const { username, password, profile_pic } = req.body; 
        const db = req.app.get('db'); 

        let user = await db.check_user(username);
        if (user[0]) {
            return res.status(400).send('Username exists')
        }
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt); 

        let newUser = await db.create_user(username, hash, profile_pic); 
        console.log(newUser); 
        req.session.user = newUser[0]
        res.status(201).send(req.session.user); 
        },
    login: async (req, res) => {
        const { username, password } = req.body 
        const db = req.app.get('db'); 
        console.log(req.body)

        let user = await db.check_user(username);
        if (!user[0]) {
            return res.status(400).send('Username not found')
        }

        let authenticated = bcrypt.compareSync(password, user[0].password); 
        if (!authenticated) {
            return res.status(401).send('Password incorrect'); 
        }
        req.session.user = user[0]
        res.status(202).send(req.session.user); 
        },
    logout: (req, res) => {
		req.session.destroy();
		res.sendStatus(200);
        },
    getUser: async (req, res) => {
		console.log(req.session.user)
		if (req.session.user) {
			res.status(200).send(req.session.user);
		} else {
			res.status(200).send("No user on session");
        }
        },
    addPost: (req, res) => {
        const db = req.app.get("db")
        const {id} = req.params;
        const {title, image, content} = req.body;
    
        db.add_post(id, title, image, content).then(() => {
            res.sendStatus(200)
            })
        },
    getPosts: async (req, res) => {
            const db = req.app.get("db");
    
           await db.get_post().then(data => {
                res.status(200).send(data);
        });
    }
}