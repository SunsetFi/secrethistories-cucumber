Feature: Mariner Curses
  Scenario: The Parched Throat has the Concealer element
    Given I have a mariner.curses.parchedthroat tabletop verb with recipe mariner.curses.parchedthroat.start
    When 1 second has elapsed
    Then the mariner.curses.parchedthroat tabletop verb should contain a card with the following aspects:
      | aspect                   | amount |
      | mariner.curses.concealer | 1      |

  @preservePreviousState
  Scenario: Singing removes the concealer element
    Given I have a mariner.sing tabletop verb with recipe mariner.performances.revealcurses
    When 20 seconds have elapsed
    Then the mariner.curses.parchedthroat tabletop verb should not contain a card with the following aspects:
      | aspect                   | amount |
      | mariner.curses.concealer | 1      |