const { db } = require('../dbsetup');

exports.inboxGet = async (req, res) => {
    const user = req.cookies.user;
    try {
        const [userMails] = await db.query(`
            SELECT * FROM emails WHERE receiver_email = ? AND is_receiver_deleted=0 ORDER BY sent_at DESC
            `, [user.email]);
        res.render('inbox', { user: user, emails: userMails });
    } catch (err) {
        res.render('404')
    }
};

exports.outboxGet = async (req, res) => {
    const user = req.cookies.user;
    try {
        const [userMails] = await db.query(`
            SELECT * FROM emails WHERE sender_email = ? AND is_sender_deleted=0 ORDER BY sent_at DESC`
            , [user.email]);
        res.render('outbox', {
            user: user,
            emails: userMails
        })
    } catch (err) {
        res.render('404')
    }
};

exports.sentEmailsGet = async (req, res) => {
    const user = req.cookies.user;
    try {
        const [emails] = await db.query(`
            SELECT * FROM emails WHERE sender_email = ? AND is_sender_deleted=0 ORDER BY sent_at DESC
            `, [user.email]);

        res.json(emails);
    } catch (err) {
        res.render('404')
    }
};

exports.receivedEmailsGet = async (req, res) => {
    const user = req.cookies.user;
    try {
        const [emails] = await db.query(`
            SELECT * FROM emails WHERE receiver_email = ? AND is_receiver_deleted=0 ORDER BY sent_at DESC
            `, [user.email]);
        res.json(emails);
    } catch (err) {
        res.render('404')
    }
}

exports.deleteEmails = async (req, res) => {
    const user = req.cookies.user;
    const emailIds = req.body.ids;
    const fromSender = req.body.fromSender;
    console.log(req.body)
    if (!Array.isArray(emailIds) || emailIds.length === 0) {
        return res.status(400).send({ message: 'Invalid email IDs provided.' });
    }

    try {
        const placeholders = emailIds.map(() => '?').join(', ');
        let query = `
                UPDATE emails 
                SET is_receiver_deleted = 1
                WHERE id IN (${placeholders}) AND receiver_email = ?
            `
        if (fromSender)
            query = `
                UPDATE emails 
                SET is_sender_deleted = 1
                WHERE id IN (${placeholders}) AND sender_email = ?`
        const result = await db.query(query, [...emailIds, user.email]);

        res.status(200).send({ message: 'Emails deleted successfully.' });

    } catch (err) {
        res.render('404')
    }

};


exports.composeGet = async (req, res) => {
    const user = req.cookies.user;
    try {
        const [existingUsers] = await db.query('SELECT fullname, email FROM users WHERE email != ?', [user.email]);
        res.render('compose', { user: user, users: existingUsers });
    } catch (err) {
        res.render('404')
    }
};

exports.composePost = async (req, res) => {
    const user = req.cookies.user;
    const { receiverEmail, subject, body } = req.body;
    const attachment = req.file;

    if (!receiverEmail) {
        return res.status(400).redirect('/compose');
    }

    try {
        const query = 'INSERT INTO emails (sender_email, receiver_email, subject, body, file) VALUES (?, ?, ?, ?, ?)';
        const values = [user.email, receiverEmail, subject, body, attachment ? attachment.filename : null];

        await db.query(query, values);
        res.redirect('/');
    } catch (err) {
        res.render('404')
    }
};

exports.emailGet = async (req, res) => {
    let user = req.cookies.user
    let emailId = req.params.id
    if (!emailId) {
        return res.status(400).redirect('/inbox');
    }
    try {
        const [email] = await db.query(`
            SELECT * FROM emails WHERE id = ? AND (sender_email = ? OR receiver_email = ?)
            `, [emailId, user.email, user.email])
        if (email[0] == null) res.render('404')
        else
            res.render('email-details', {
                user: user,
                email: email[0]
            })
    } catch (err) {
        res.render('404')
    }
}
