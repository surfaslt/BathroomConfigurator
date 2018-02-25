#features/test.feature
Feature: Testing Input values

  Scenario: Changing Room Width changes it on Summary page as well
    Given I go to questionPage
    And all data is set to its default values
    When I write 3000 inside roomWidth input box
    And I click the Next Page button
    And I click the Next Page button
    And I click the Next Page button
    And I click the Next Page button
    Then I should be on summaryPage page
    And I should see roomWidth: 3000 in the list
