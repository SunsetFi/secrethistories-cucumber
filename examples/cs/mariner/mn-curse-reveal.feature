# Spawn the curse verb mariner.curses.parchedthroat (running the recipe mariner.curses.parchedthroat.start)
# Run for 1s
# Check the storage of curse verb  mariner.curses.parchedthroat has mariner.curses.concealer element
# Spawn mariner.sing verb
# Execute recipe mariner.performances.revealcurses in mariner.sing verb
# Check the storage of curse verb doesn't have mariner.curses.concealer element
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