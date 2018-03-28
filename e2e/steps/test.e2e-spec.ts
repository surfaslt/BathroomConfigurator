//features/step_definitions/my_step_definitions.js.
import {browser, by, element} from "protractor";
import {Given, Then, When} from "cucumber";
import {SelectionsMadeService} from "../../src/app/selections-made.service";
import {HelperService} from "../../src/app/helper.service";
const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

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

When('I write {val} inside {inputBoxName} input box', (val: string, inputBoxName: string, callback) => {

  var scrpt = "return document.getElementById('roomWidthInput');";
  browser.executeScript(scrpt).then(function (text) {
    console.log('info' + text);
  });

  let inputbox = element(by.css('#roomWidthInput'));
  console.log('inputBox promise set');

  inputbox.isPresent().then(function(isElementVisible) {
    console.log('hello!');
    expect(isElementVisible).to.be.true;
    callback();
  });

  /*target.getText().then( (value:string) => {
    console.log("This is Then the selected elements text should be....");
    callback();
  });*/
  /*
  inputbox.click().then( () => {
    console.log('inputBox cleared');
  });
  */
    /*
    inputbox.isPresent().then( (bool) => {
      console.log("inside!");
      expect(bool).to.be.true;
    });
      inputbox.getAttribute('value').then( (realValue) => {
      console.log("This is When I write value inside inputboxname input box ....");
      //inputbox.clear();
      //inputbox.sendKeys(value);
      //expect(value).to.equals(realValue);
    });
*/
});

When('I click the {buttonText} button {numberOfTimes} times', (buttonText, numberOfTimes, callback) => {
  element(by.buttonText(buttonText)).click().then(callback);
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
    console.log("This is Then the selected elements text should be....");
    expect(value).to.equals(elementsValue);
    callback();
  });
});


Then ('I should be on {pageName} page', (pageName: string) => {
  let url = browser.getCurrentUrl();
  expect(url).to.contain(pageName);
});

Then ('I should see {text} in the list', (text: string) => {
  expect(element(by.cssContainingText(".summaryElement", text)).isPresent()).to.be.true;
});
