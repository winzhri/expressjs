const connection = require ('../config/mysql');
const path = require ('path');
const fs = require ('fs');

const index = (req, res) => {
    const {search} = req.query;
    let exec = {};
    if (search) {
        exec = {
            sql: 'SELECT * FROM products WHERE name LIKE ?',
            value: ['%${search}%']    
        }
    } else {
        exec = {
            sql: 'SELECT * FROM products'
        }
    }

    //sequalize
    connection.query(exec, _response(res));
};

const view = (req, res) => {
    //sequalize
    connection.query({
        sql: 'SELECT * FROM products WHERE id = ?',
        values: [req.params.id]
    }, _response(res));
};

const destroy = (req, res) => {
    //sequalize
    connection.query({
        sql: 'DELETE * FROM products WHERE id = ?',
        values: [req.params.id]
    }, _response(res));
};

const store = (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync (image.path, target)
        // res.sendFile(target);
    }
    //sequalize
    connection.query({
        sql: 'INSERT INTO products (users_id, name, price, stock, status, image_url) VALUES (?, ?, ?, ?, ?, ?)',
        values: [parseInt(users_id), name, price, stock, status, 'http://loaclhost: 3000/public/${image.originalname}']
    }, _response(res));
};

const update = (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    let sql = '';
    let value = [];
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync (image.path, target);
        sql = 'UPDATE products SET user_id = ?, name = ?, price = ?, stock = ?, status = ?, image_url = ? WHERE id = ?',
        value = [parseInt(users_id), name, price, stock, status, 'http://loaclhost: 3000/public/${image.originalname}', req.params.id]
    } else {
        sql = 'UPDATE products SET user_id = ?, name = ?, price = ?, stock = ?, status = ? WHERE id = ?',
        value = [parseInt(users_id), name, price, stock, status, req.params.id]
    }

    //sequalize
    connection.query({sql, value}, _response(res));
}

const _response =(res) => {
    return (error, result) => {
        if(error) {
            res.send({
                status: 'failed',
                response: 'error'
            });
        }
        else {
            res.send({
                status: 'success',
                response: result
            })
        }
    }
};

module.exports = {
    index,
    view,
    store,
    update,
    destroy
}