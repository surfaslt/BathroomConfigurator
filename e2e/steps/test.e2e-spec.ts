//features/step_definitions/my_step_definitions.js.
import {browser, by, element, protractor} from "protractor";
import {Given, Then, When} from "cucumber";
import {SelectionsMadeService} from "../../src/app/selections-made.service";
import {HelperService} from "../../src/app/helper.service";
const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

let selectionsMadeService: SelectionsMadeService = new SelectionsMadeService();
let helperService: HelperService = new HelperService();

let target = null;

Given('user is on {string}', (url: string, callback) => {
  browser.get(url)
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

When('I write {val} inside {inputBoxName} input box', (val: string, inputBoxName: string, callback) => {
  let inputbox = element(by.name(inputBoxName));
  inputbox.clear();
  inputbox.sendKeys(protractor.Key.BACK_SPACE + val);
  inputbox.getAttribute('value').then( (realValue) => {
    expect(val).to.equals(realValue);
    callback();
  });
});

When('I click the {buttonText} hyperlink {numberOfTimes} times', (buttonText, numberOfTimes, callback) => {
  for( let i = 0; i < numberOfTimes; i++) {
    element(by.cssContainingText('a', buttonText)).click().then( () => {
      if( i == numberOfTimes - 1) callback();
    });
    browser.waitForAngular();
  }
})

When('I click the {buttonText} button', (buttonText: string, callback) => {
  element(by.buttonText(buttonText)).click().then(callback);
})

When('I select the first {string} element', (string: string, callback) => {
  target = element(by.css('H1'));
  callback();
});

Then('The selected elements text should be {elementsValue}', (elementsValue:string, callback) => {
  target.getText().then( (value:string) => {
    expect(value).to.equals(elementsValue);
    callback();
  });
});


Then ('I should be on {pageName} page', (pageName: string) => {
  let url = browser.getCurrentUrl();
  expect(url).to.eventually.contain(pageName);
});

Then ('I should see {text} in the list', (text: string, callback) => {
  element(by.cssContainingText("li", text)).isPresent().then( (present) => {
    expect(present).to.be.true;
    callback();
  });
});
