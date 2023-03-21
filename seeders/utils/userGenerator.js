const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

/**
 *
 * @param {Number} count how many user you want.
 * @returns {Array<Object>}
 * @author Yadi Apriyadi
 */
async function userGenerator(count) {
  let data = [];
  // const now = new Date();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('123456', salt);

  for (let user = 0; user < count; user++) {
    const newUser = {
      fullname: faker.name.fullName(),
      username: faker.internet.userName(),
      password: hashedPassword,
    };
    data = [...data, newUser];
  }

  return data;
}

module.exports = userGenerator;
