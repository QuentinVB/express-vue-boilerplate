const PostModel = require('../../api/models/post.model');
const UserModel = require('../../api/models/user.model'); // Assurez-vous d'avoir un modèle User

const createFixtures = async () => {
    const user = new UserModel({
        userName: "testUser",
        email: "testuser@example.com",
        password: "hashedpassword" // Assurez-vous de hacher les mots de passe
    });

    await user.save();

    const post1 = new PostModel({
        message: "This is a test post 1",
        userId: user._id,
        accountCreation: new Date(),
        accountLastConnection: new Date(),
    });

    const post2 = new PostModel({
        message: "This is a test post 2",
        userId: user._id,
        accountCreation: new Date(),
        accountLastConnection: new Date(),
    });

    await post1.save();
    await post2.save();
};

module.exports = createFixtures;
