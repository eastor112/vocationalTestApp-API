const User = require('../users/users.model');
const University = require('../universities/universities.model');

const searchUsers = async (query, limit, page) => {
  const queryRegex = new RegExp(query, 'i');

  const criteria = {
    $or: [
      { names: queryRegex },
      { email: queryRegex },
      { username: queryRegex },
      { fatherName: queryRegex },
      { motherName: queryRegex },
      { role: queryRegex },
      { 'address.country': queryRegex },
      { 'address.city': queryRegex }],
    $and: [{ state: true }],
  };

  const [total, users] = await Promise.all([
    User.countDocuments(criteria),
    User.find(criteria)
      .limit(limit)
      .skip(limit * (page - 1))
      .populate('university', 'name'),
  ]);

  return { total, users };
};

const searchUniversities = async (query, limit, page) => {
  const queryRegex = new RegExp(query, 'i');

  const criteria = {
    $or: [
      { name: queryRegex },
      { 'location.city': queryRegex },
      { 'location.Country': queryRegex },
      { 'offer.career': queryRegex }],
    $and: [{ state: true }],
  };

  const [total, universities] = await Promise.all([
    University.countDocuments(criteria),
    University.find(criteria),
  ]);

  return { total, universities };
};

module.exports = {
  searchUsers,
  searchUniversities,
};
