//features/step_definitions/my_step_definitions.js
import {browser, by, element} from "protractor";
import {Given, Then, When} from "cucumber";

  let textEntered: string = '';

  Given('I go to {string}', function (string: string, callback) {
    browser.get(string);
  });

  When('I add {string} in the task field', function (string: string, callback) {
    element(by.model('todoList.todoText')).sendKeys(string);
    textEntered = string;
  });

  When('I click the {string} button', function (string: string, callback) {
    element(by.css('[value="' + string + '"]')).click();
  });

  Then('I should see my new task in the list', function (callback) {
    let todoList = element.all(by.repeater('todo in todoList.todos'));
    expect(todoList.count()).toEqual(3);
    expect(todoList.get(2).getText()).toEqual(textEntered);
  });
