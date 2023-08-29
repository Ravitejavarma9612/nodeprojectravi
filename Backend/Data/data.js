const UserDB = {
    Users : [{
        username: "Ravi",
        school: "sunshine",
        password: "varma@123"
    }],
    setUser : function(data){this.Users = data}
};

const studentDB = {
    students : [{
        firstname: "Ravi",
        school: "sunshine",
        lastname: "kucherlapati"
    }],
    setStudent : function(data){this.Users = data}
};



module.exports = {UserDB,studentDB};