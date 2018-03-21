//features/step_definitions/my_step_definitions.js.
import {browser, by, element} from "protractor";
import {Given, Then, When} from "cucumber";
import {expect} from "chai";
import {SelectionsMadeService} from "../../src/app/selections-made.service";
import {HelperService} from "../../src/app/helper.service";

let selectionsMadeService: SelectionsMadeService = new SelectionsMadeService();
let helperService: HelperService = new HelperService();

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
  helperService.setCurrentQuestionNumber(1);
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

When('I click the {buttonText} button {numberOfTimes} times', (buttonText, numberOfTimes, callback) => {
  element(by.buttonText(buttonText)).click().then(callback);
})

When('I click the {buttonText} button', (buttonText: string, callback) => {
  element(by.buttonText(buttonText)).click().then(callback);
})

When('I select the first {string} element', (string: string, callback) => {
  target = element.all(by.css('H1')).first();
  callback();
});

Then('The selected elements text should be {elementsValue}', (elementsValue:string, callback) => {
  target.getText().then( (value:string) => {
    console.log(value);
    expect(value).to.equals(elementsValue);
  })
  // Welcome to bathroom configurator!
  callback();
});


Then ('I should be on {pageName} page', (pageName: string) => {
  let url = browser.getCurrentUrl();
  expect(url).to.contain(pageName);
});

Then ('I should see {text} in the list', (text: string) => {
  expect(element(by.cssContainingText(".summaryElement", text)).isPresent()).to.be.true;
});
