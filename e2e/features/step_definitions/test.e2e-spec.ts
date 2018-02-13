//features/step_definitions/my_step_definitions.js
module.exports = function() {

  this.Given(/^I go to "([^"]*)"$/, function (site, callback) {
    browser.get(site)
      .then(callback);
  });

  Given('I go to {site}', function (site, callback) {
    browser.get(site)
      .then(callback);
  });

  When('I add {string} in the task field', function (string, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });

  When('I click the add button', function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });

  Then('I should see my new task in the list', function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });

}
