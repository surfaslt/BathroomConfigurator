//features/step_definitions/my_step_definitions.js
import {browser} from "protractor";
import {Given, Then, When} from "cucumber";

module.exports = function() {

    Given('I go to {string}', function (string, callback) {
      // Write code here that turns the phrase above into concrete actions
      browser.get(string);
      callback(null, 'pending');
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
