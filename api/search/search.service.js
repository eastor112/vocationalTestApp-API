const User = require('../users/users.model');

const searchUsers = async (query, limit, page) => {
  const queryRegex = new RegExp(query, 'i');

  const criteria = {
    $or: [
      { names: queryRegex },
      { email: queryRegex },
      { username: queryRegex },
      { fatherName: queryRegex },
      { motherName: queryRegex },
      { role: queryRegex }],
    $and: [{ state: true }],
  };

  const [total, users] = await Promise.all([
    User.countDocuments(criteria),
    User.find(criteria)
      .limit(limit)
      .skip(limit * (page - 1)),
  ]);

  return { total, users };
};

module.exports = {
  searchUsers,
};
