#System tests
Feature: Testing summary page getting the right info and displaying it

  Scenario: Testing if protractor works
    Given user is on splashPage
    And all data is set to its default values
    When I select the first H1 element
    Then The selected elements text should be Welcome to bathroom configurator!

  Scenario Outline: Changing Room Width changes it on Summary page as well
    Given user is on questionPage
    And all data is set to its default values
    When I write <roomWidth> inside roomWidth input box
    And I click the Next Page hyperlink 4 times
    Then I should see roomWidth: <roomWidth> in the list
    Examples:
      | roomWidth |
      | 3000 |
      | 2500 |
      | 2250 |
