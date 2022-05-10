const moment = require('moment');
const Billings = require('../billings/billings.model');
const Users = require('../users/users.model');
const Universities = require('../universities/universities.model');
const TestResults = require('../testResults/testResults.model');

const handlerGetStats = async (req, res) => {
  const totalUsers = await Users.countDocuments({ state: true });
  const totalUniversities = await Universities.countDocuments({ state: true, isPublicated: true });
  const totalTestsResults = await TestResults.countDocuments({ state: true });

  return res.json({
    totalUsers,
    totalUniversities,
    totalTestsResults,
  });
};

const handlerGetBalance = async (req, res) => {
  const billingsSelected = await Billings.find({
    state: true,
  });

  const utility = billingsSelected.reduce((acc, billing) => {
    acc += billing.amount;
    return acc;
  }, 0);

  const fees = billingsSelected.reduce((acc, billing) => {
    acc += billing.fees;
    return acc;
  }, 0);

  const taxes = billingsSelected.reduce((acc, billing) => {
    acc += billing.taxes;
    return acc;
  }, 0);

  res.json({
    utilities: utility.toFixed(2),
    fees: fees.toFixed(2),
    taxes: taxes.toFixed(2),
  });
};

const handlerGetBalanceByDate = async (req, res) => {
  const { date } = req.params;

  const billingsSelected = await Billings.find({
    state: true,
    createdAt: {
      $gte: moment(date).startOf('day').toDate(),
      $lte: moment(date).endOf('day').toDate(),
    },
  });

  const utility = billingsSelected.reduce((acc, billing) => {
    acc += billing.amount;
    return acc;
  }, 0);

  const fees = billingsSelected.reduce((acc, billing) => {
    acc += billing.fees;
    return acc;
  }, 0);

  const taxes = billingsSelected.reduce((acc, billing) => {
    acc += billing.taxes;
    return acc;
  }, 0);

  return res.json({
    utilities: utility.toFixed(2),
    fees: fees.toFixed(2),
    taxes: taxes.toFixed(2),
  });
};

const handlerBalanceLastMonth = async (req, res) => {
  const report = await Billings.aggregate([
    {
      $match: {
        state: true,
        createdAt: {
          $gte: moment().startOf('month').toDate(),
          $lte: moment().endOf('month').toDate(),
        },
      },
    },
    {
      $group: {
        _id: null,
        utilities: {
          $sum: '$amount',
        },
        fees: {
          $sum: '$fees',
        },
        taxes: {
          $sum: '$taxes',
        },
      },
    },
  ]);

  res.json({ report: report[0] });
};

const handlerGetBalanceDayByDay = async (req, res) => {
  const report = [];
  const ArrayPromises = [];
  const dates = [];

  for (let i = 0; i < 30; i += 1) {
    const date = moment().subtract(i, 'days');
    dates.push(date);

    const billingsSelected = Billings.find({
      state: true,
      createdAt: {
        $gte: date.startOf('day').toDate(),
        $lte: date.endOf('day').toDate(),
      },
    });

    ArrayPromises.push(billingsSelected);
  }

  const billings = await Promise.all(ArrayPromises);

  billings.forEach((billing, index) => {
    const utility = billing.reduce((acc, bill) => {
      acc += bill.amount;
      return acc;
    }, 0);

    const fees = billing.reduce(
      (acc, bill) => {
        acc += bill.fees;
        return acc;
      },
      0,
    );

    const taxes = billing.reduce(
      (acc, bill) => {
        acc += bill.taxes;
        return acc;
      },
      0,
    );

    report.push({
      date: dates[index].format('YYYY-MM-DD'),
      utility: utility.toFixed(2),
      fees: fees.toFixed(2),
      taxes: taxes.toFixed(2),
    });
  });

  res.json(report);
};

module.exports = {
  handlerGetBalance,
  handlerGetBalanceByDate,
  handlerBalanceLastMonth,
  handlerGetBalanceDayByDay,
  handlerGetStats,
};
