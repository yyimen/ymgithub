const Database = require('better-sqlite3');

const os = require('os');
console.log(`系统 version ：${os.version()}`);
console.log(`     系统架构：${os.arch()}`);
console.log(`     当前架构：${process.arch}`);
console.log(`    platform：${process.platform}`);
console.log('CPU',os.EOL,JSON.stringify(os.cpus(), null, 2));

// 初始化内存数据库
const db = new Database(':memory:');
try {
    // 创建表
    db.prepare(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER
    )
  `).run();

    // 插入数据
    const insert = db.prepare('INSERT INTO users (name, age) VALUES (?, ?)');
    insert.run('Alice', 30);

    // 批量插入（事务）
    const insertMany = db.transaction((users) => {
        users.forEach(user => insert.run(user.name, user.age));
    });
    insertMany([{ name: 'Bob', age: 25 }, { name: 'Charlie', age: 28 }]);

    // 查询数据
    const rows = db.prepare('SELECT * FROM users').all();
    console.log('查询结果:', rows);

} catch (err) {
    console.error('数据库操作失败:', err.message);
} finally {
    db.close(); // 关闭数据库连接
}