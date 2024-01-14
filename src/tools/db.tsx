import serverlessMysql from 'serverless-mysql';

interface CreateUser {
    insertId: number
}

const db = serverlessMysql({
  config: {
    host: '127.0.0.1',
    user: 'virgo',
    password: '123456',
    database: 'opc_helpdesk2',
    port:3306
  },
});

export async function createUser(username: string, password: string): Promise<number> {
    const result = await db.query<CreateUser>('INSERT INTO users (username, password) VALUE (?, ?)', [username, password]);
    return result.insertId;
}

export async function findUserByUsername(username:string): Promise<any> {
    const [users] = await db.query<any>('SELECT * FROM users WHERE username = ?', [username]);
    return users[0];
}


export default db;
