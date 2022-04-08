const adminUser = {
  names: 'admin',
  email: 'admin@test.com',
  password: '123456',
  role: 'ADMIN',
};

const initialBillings = [{
  paymentMethod: 'CREDIT CARD',
},
{
  paymentMethod: 'DEBIT CARD',
},
{
  paymentMethod: 'PAYPAL',
}];

const initialCareers = [{
  name: 'Engineer',
  description: 'Engineer',
  field: {
    description: 'Engineer',
    list: ['Engineer'],
    references: ['Engineer'],
  },
  skills: {
    description: 'Engineer',
    list: ['Engineer'],
    references: ['Engineer'],
  },
  photo: 'Engineer',
}, {
  name: 'Lawer',
  description: 'Lawer',
  field: {
    description: 'Lawer',
    list: ['Lawer'],
    references: ['Lawer'],
  },
  skills: {
    description: 'Lawer',
    list: ['Lawer'],
    references: ['Lawer'],
  },
  photo: 'Lawer',
}, {
  name: 'Doctor',
  description: 'Doctor',
  field: {
    description: 'Doctor',
    list: ['Doctor'],
    references: ['Doctor'],
  },
  skills: {
    description: 'Doctor',
    list: ['Doctor'],
    references: ['Doctor'],
  },
  photo: 'Doctor',
}];

const initialTests = [{
  title: 'Test 1',
}, {
  title: 'Test 2',
}, {
  title: 'Test 3',
}];

const initialQuestions = [{
  test: null,
  type: 'BINARI',
  statement: 'What is Jest?',
  optionA: 'JavaScript Testing Framework',
}, {
  test: null,
  type: 'MULTIPLE',
  statement: 'What is react?',
  optionA: 'JavaScript front-end Framework',
}, {
  test: null,
  type: 'BINARI',
  statement: 'What is redux?',
  optionA: 'JavaScript front-end Framework',
},
];

const initialUsers = [{
  names: 'user1',
  email: 'test1@test.com',
  password: '123456',
  role: 'ADMIN',
},
{
  names: 'user2',
  email: 'test2@test.com',
  password: '123456',
  role: 'INSTITUTION',
},
{
  names: 'user3',
  email: 'test3@test.com',
  password: '123456',
  role: 'STUDENT',
}];

const initialUniversities = [{
  name: 'Universidad de los Andes',
}, {
  name: 'UHarvard university',
}, {
  name: 'Cambridge university',
}];

module.exports = {
  adminUser,
  initialBillings,
  initialCareers,
  initialTests,
  initialQuestions,
  initialUsers,
  initialUniversities,
};
