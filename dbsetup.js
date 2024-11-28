const mysql = require('mysql2')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'wpr',
    password: 'fit2024',
    port: 3306,
}).promise()

async function setupDatabase() {
    try {
        await db.query("DROP DATABASE IF EXISTS wpr2101040115;")
        await db.query("CREATE DATABASE IF NOT EXISTS wpr2101040115;")
        await db.query("USE `wpr2101040115`;")
        await db.query(`
            CREATE TABLE IF NOT EXISTS \`emails\` (
                \`id\` int(11) NOT NULL,
                \`sender_email\` varchar(100) NOT NULL,
                \`receiver_email\` varchar(100) NOT NULL,
                \`subject\` varchar(255) DEFAULT NULL,
                \`body\` text NOT NULL,
                \`sent_at\` timestamp NOT NULL DEFAULT current_timestamp(),
                \`is_sender_deleted\` tinyint(1) DEFAULT 0,
                \`is_receiver_deleted\` tinyint(1) DEFAULT 0,
                \`file\` varchar(255) DEFAULT NULL
            )
        `);
        await db.query(`
            CREATE TABLE IF NOT EXISTS \`users\` (
                \`id\` int(11) NOT NULL,
                \`fullname\` varchar(50) NOT NULL,
                \`email\` varchar(100) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                \`created_at\` timestamp NOT NULL DEFAULT current_timestamp()
            );
        `);
        await db.query(`
            INSERT INTO \`users\` (\`id\`, \`fullname\`, \`email\`, \`password\`, \`created_at\`)
            VALUES
                (15, 'Sieu nhan gao do', 'long@gmail.com', 'JfTvvwRDlrUzQwTuTh6flw==', '2024-10-26 01:26:33'),
                (16, 'Long Nguyen', 'longnguyenthanh2003@gmail.com', 'JfTvvwRDlrUzQwTuTh6flw==', '2024-10-26 01:33:52'),
                (17, 'Quan DD', 'DDQ@mymail.com', 'JfTvvwRDlrUzQwTuTh6flw==', '2024-10-26 01:35:20'),
                (18, 'Required user', 'a@a', 'JfTvvwRDlrUzQwTuTh6flw==', '2024-10-26 01:35:45');
        `);
        await db.query(`
            INSERT INTO \`emails\` (\`id\`, \`sender_email\`, \`receiver_email\`, \`subject\`, \`body\`, \`sent_at\`, \`is_sender_deleted\`, \`is_receiver_deleted\`)
            VALUES
                (24, 'a@a', 'DDQ@mymail.com', 'Don xin qua mon', 'em xin phep duoc qua mon WPR\r\n', '2024-10-26 01:36:31', 0, 0),
                (25, 'a@a', 'DDQ@mymail.com', 'Don xin qua doi', 'het cuu', '2024-10-26 01:36:48', 0, 0),
                (26, 'a@a', 'DDQ@mymail.com', 'Don xin hoc bong', 'Cho e xin hoc bong', '2024-10-26 01:37:22', 0, 0),
                (27, 'a@a', 'DDQ@mymail.com', 'Don xin nop bai ASM', 'E xin phep duoc nop bai ASM WPR\r\n', '2024-10-26 01:37:49', 0, 0),
                (28, 'a@a', 'longnguyenthanh2003@gmail.com', 'Thong bao nghi viec', 'De tap trung vao viec hoan thanh bai ASM WPR, toi xin phep nghi viec', '2024-10-26 01:38:39', 0, 0),
                (29, 'a@a', 'longnguyenthanh2003@gmail.com', 'Thong bao lai cho thong bao nghi viec', 'E dua day! nghi viec thi tien dau ma mua do an', '2024-10-26 01:39:16', 1, 0),
                (30, 'a@a', 'long@gmail.com', 'Thong bao tai khoan ngan hang', 'tai khoan ngan hang cua ban da bi hack, vui long truy cap link https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1s de lay lai tai khoan', '2024-10-26 01:40:48', 0, 0),
                (31, 'a@a', 'long@gmail.com', 'Thong bao quan trong', 'Su xuat hien cua sieu trom tai khoan ngan hang', '2024-10-26 01:41:20', 0, 0),
                (32, 'longnguyenthanh2003@gmail.com', 'a@a', 'Don xin loi', 'E xin loi vi thoi gian qua da khong lam viec cham chi, xin hay tha cho e', '2024-10-26 01:42:05', 0, 0),
                (33, 'longnguyenthanh2003@gmail.com', 'a@a', 'Don xin tien', 'Cong ti oi! Tra tien luong thang 9 cho e!', '2024-10-26 01:42:40', 0, 0),
                (34, 'longnguyenthanh2003@gmail.com', 'a@a', 'Don xin ung tien', 'em dung het tien roi... Cong ti cho e ung 1 it duoc k', '2024-10-26 01:43:07', 0, 0),
                (35, 'long@gmail.com', 'a@a', 'Thong bao lam gi', 'Biet lua dao roi, khong can gui mail sang day dau', '2024-10-26 01:43:43', 0, 0),
                (36, 'long@gmail.com', 'a@a', 'Nhac nho hoi quan trong', 'dung gan link linh tinh vao trong mail duoc k', '2024-10-26 01:44:12', 0, 0),
                (37, 'DDQ@mymail.com', 'a@a', 'Thong bao buoc thoi hoc', 'em da bi thoi hoc', '2024-10-26 01:45:02', 0, 0),
                (38, 'DDQ@mymail.com', 'long@gmail.com', 'Thong bao buoc thoi hoc', 'em da bi buoc thoi hoc', '2024-10-26 01:45:22', 0, 0),
                (39, 'DDQ@mymail.com', 'longnguyenthanh2003@gmail.com', 'Chuc mung qua mon', 'Chuc mung em da qua mon SE2', '2024-10-26 01:45:41', 0, 0),
                (40, 'a@a', 'long@gmail.com', 'Thu xoa mail nay xem', 'Xoa di va xem web phan ung the nao', '2024-10-26 01:47:37', 0, 0),
                (41, 'a@a', 'DDQ@mymail.com', 'The Attachment feature should be manually tested', 'All of the mails are not attached', '2024-10-26 01:49:37', 0, 0),
                (42, 'DDQ@mymail.com', 'a@a', 'All of the initial mails are not attached with files, try to do it yourself', 'All of the mails are not attached', '2024-10-26 01:49:37', 0, 0);
        `);
        await db.query(`
            ALTER TABLE \`emails\` 
                ADD PRIMARY KEY (\`id\`),
                ADD KEY \`sender_email\` (\`sender_email\`),
                ADD KEY \`receiver_email\` (\`receiver_email\`);
        `);

        await db.query(`
            ALTER TABLE \`users\` 
                ADD PRIMARY KEY (\`id\`),
                ADD UNIQUE KEY \`email\` (\`email\`);
        `);

        await db.query(`
            ALTER TABLE \`users\` 
                ADD FULLTEXT KEY \`username\` (\`fullname\`);
        `);

        await db.query(`
            ALTER TABLE \`emails\`
                MODIFY \`id\` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
        `);

        await db.query(`
            ALTER TABLE \`users\` 
                MODIFY \`id\` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
        `);

        await db.query(`
            ALTER TABLE \`emails\` 
                ADD CONSTRAINT \`emails_ibfk_1\` FOREIGN KEY (\`sender_email\`) REFERENCES \`users\` (\`email\`),
                ADD CONSTRAINT \`emails_ibfk_2\` FOREIGN KEY (\`receiver_email\`) REFERENCES \`users\` (\`email\`);
        `);

        await db.query("COMMIT;");

    } catch (err) {
        console.log(err)
    }
}

setupDatabase()

module.exports = { db }
