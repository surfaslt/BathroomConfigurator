//features/step_definitions/my_step_definitions.js
import {browser, by, element} from "protractor";
import {Given, Then, When} from "cucumber";
import {expect} from "chai";
import { SelectionsMadeService } from "./../../src/app/selections-made.service";

let selectionsMadeService = new SelectionsMadeService();

let target = null;

Given('I go to {string}', (string: string, callback) => {
  browser.get(string)
    .then(callback);
});

Given('all data is set to its default values', (callback) => {
  selectionsMadeService.setData({
    roomWidth: 2000,
    roomLength: 2000,
    doorPosition: 'Left',
    tubWidth: 700,
    tubLength: 1700,
    tubPosition: 'Left Bottom'
  })
  selectionsMadeService.setCurrentQuestionNumber(1);
  callback();
})

When('I write {value} inside {inputBoxName} input box', (value: string, inputBoxName: string, callback) => {
  // element(by.name(inputBoxName))
  browser.wait(function() {
    console.log('hello2');
    return element(by.css('[name="roomWidth"]')).isPresent();
  }, 2000).then( () => {
    console.log('hello3');
    let inputBox = element(by.css('[name="roomWidth"]'));
    inputBox.getText().then( (txt) => {
      console.log(txt);
    })
    inputBox.clear().then( () => {
      inputBox.sendKeys(value).then( () => {
        callback();
      });
    });
  });
  console.log('hello1');
});


When('I click the {buttonText} button', (buttonText: string, callback) => {
  element(by.buttonText(buttonText)).click().then(callback);
})


Then ('I should be on {pageName} page', (pageName: string) => {
  let url = browser.getCurrentUrl();
  expect(url).to.contain(pageName);
});

Then ('I should see {text} in the list', (text: string) => {
  expect(element(by.cssContainingText(".summaryElement", text)).isPresent()).to.be.true;
});
