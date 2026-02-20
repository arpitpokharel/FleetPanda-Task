const users = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  invalid: { username: 'invalid_user', password: 'invalid_pass' },
};

const checkoutData = {
  valid: { firstName: 'John', lastName: 'QA', postalCode: '12345' },
  missingFirstName: { firstName: '', lastName: 'QA', postalCode: '12345' },
};

module.exports = { users, checkoutData };
