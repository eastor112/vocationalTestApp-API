const adminUser = {
  names: 'admin',
  email: 'admin@test.com',
  password: '123456',
  role: 'ADMIN',
};

const initialBillings = [{
  paymentMethod: 'CREDIT CARD',
  condition: 'PENDING',
}, {
  paymentMethod: 'DEBIT CARD',
  condition: 'COMPLETED',
}, {
  paymentMethod: 'PAYPAL',
  condition: 'CANCELED',
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
  type: 'VOCATIONAL',
}, {
  title: 'Test 2',
  type: 'SURVEY',
}, {
  title: 'Test 3',
  type: 'VOCATIONAL',
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
}];

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
  location: {
    country: 'Colombia',
    city: 'Bogota',
  },
}, {
  name: 'Harvard university',
  location: {
    country: 'United States',
    city: 'Cambridge',
  },
}, {
  name: 'Cambridge university',
  location: {
    country: 'Peru',
    city: 'Cambridge',
  },
}];

const initialOffers = [{
  name: 'arts',
  duration: 10,
  description: 'This is a description',
  url: 'https://www.arts.com',
  photo: 'https://www.arts.com/images/logo.png',
  university: null,
  career: null,
}, {
  name: 'engineering',
  duration: 10,
  description: 'This is a description',
  url: 'https://www.engineering.com',
  photo: 'https://www.engineering.com/images/logo.png',
  university: null,
  career: null,
}, {
  name: 'law',
  duration: 10,
  description: 'This is a description',
  url: 'https://www.law.com',
  photo: 'https://www.law.com/images/logo.png',
  university: null,
  career: null,
}];

const initialTestResults = [{
  user: null,
  test: null,
  description: 'This is a description 1',
  careers: [],
  questionResponses: [],
}, {
  user: null,
  test: null,
  description: 'This is a description 2',
  careers: [],
  questionResponses: [],
}, {
  user: null,
  test: null,
  description: 'This is a description 3',
  careers: [],
  questionResponses: [],
}];

module.exports = {
  adminUser,
  initialBillings,
  initialCareers,
  initialTests,
  initialQuestions,
  initialUsers,
  initialUniversities,
  initialOffers,
  initialTestResults,
};
