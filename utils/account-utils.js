const { db } = require('../dbsetup')
function registerUser(user, res) {
    const { fullname, email, password } = user;
    if (!fullname || !email || !password) {
        return res.status(400).render('signup', { errorMessage: 'Please provide all fields' });
        // res.render('signup', { errorMessage: 'Email already exists. Please use a different email.' });
    }

    const query = 'INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)';
    db.query(query, [fullname, email, password], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send({ message: 'Error posting data' });
        }
        res.status(201).send({ message: 'User created successfully', userId: results.insertId });
    });
}

module.exports = { registerUser }
