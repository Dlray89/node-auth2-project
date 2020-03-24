const userDB = require("../data/db.config")

module.exports = {
    find,
    findBy,
    findById,
    add,
}

function find() {

    return userDB("users")
    .select("id", "username")
}

function findById(filter){
    return userDB("username")
    .where(filter)
}

function findById(id){
    return userDB("users")
    .where({ id })
    .first()
}

async function add(user){
    const [id] = await userDB("users")
    .insert(user, "id")

    return findById(id)
}