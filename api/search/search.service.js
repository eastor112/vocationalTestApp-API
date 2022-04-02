const User = require('../users/users.model');
const University = require('../universities/universities.model');
const Billing = require('../billings/billings.model');

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
    University.find(criteria)
      .limit(limit)
      .skip(limit * (page - 1)),
  ]);

  return { total, universities };
};

const searchBilling = async (query, limit, page) => {
  const queryRegex = new RegExp(query, 'i');

  const criteria = {
    $or: [
      { paymentMethod: queryRegex },
      { condition: queryRegex }],
    $and: [{ state: true }],
  };

  const [total, billings] = await Promise.all([
    Billing.countDocuments(criteria),
    Billing.find(criteria)
      .limit(limit)
      .skip(limit * (page - 1))
      .populate('user', 'names email'),
  ]);

  return { total, billings };
};

module.exports = {
  searchUsers,
  searchUniversities,
  searchBilling,
};
