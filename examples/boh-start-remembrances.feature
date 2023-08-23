# Feature: Book of Hours Rememberances
#   # TODO: Use a save file to skip the early game, or use Givens to build the state from scratch.
#   Scenario: Start the Game
#     When I start a new librarian legacy
#     And 10 seconds have elapsed
#     Then the consider.setup fixed verb should be available
#     And the consider.setup fixed verb should contain the following output:
#       | elementId             | quantity |
#       | xhea.halfdrowned      | 1        |
#       | journal.generic.start | 1        |
#       | mem.storm             | 1        |

#   @preservePreviousState
#   Scenario: Study the journal
#     Given all situations are concluded
#     When I drag the journal.generic.start card to the consider.setup fixed verb c slot
#     And I drag the mem.storm card to the consider.setup fixed verb memory slot
#     And I start the consider.setup fixed verb
#     Then the started recipe should be setup.librarian.shipwrecked
#     And the started recipe should have 5 seconds remaining

#   @preservePreviousState
#   Scenario: Finish studying the journal
#     When 5 seconds have elapsed
#     Then the consider.setup fixed verb should contain the following output:
#       | elementId             | quantity |
#       | journal.generic.start | 1        |
#       | zsha                  | 1        |
#       | zcho                  | 1        |
#       | zfet                  | 1        |

#   @preservePreviousState
#   Scenario: Take a checkpoint before testing the soul cards
#     Given all situations are concluded
#     And I make a new checkpoint called pre.soul

#   @preservePreviousState
#   Scenario: Remember Chor
#     Given I load the pre.soul checkpoint
#     When I drag the journal.generic.start card to the consider.setup fixed verb c slot
#     And I drag the zcho card to the consider.setup fixed verb memory slot
#     And I start the consider.setup fixed verb
#     Then the started recipe should be setup.librarian.cho
#     And the started recipe should have 5 seconds remaining

#   @preservePreviousState
#   Scenario: Finish Remembering Chor
#     Given 5 seconds have elapsed
#     Then the consider.setup fixed verb should contain the following output:
#       | elementId             | quantity |
#       | xcho                  | 1        |
#       | journal.generic.start | 1        |
#       | zmet                  | 1        |
#       | zwis                  | 1        |
#       | zpho                  | 1        |
#       | zere                  | 1        |
#     And I should not have the following cards:
#       | elementId |
#       | zsha      |
#       | zfet      |

#   @preservePreviousState
#   Scenario: Remember Shapt
#     Given I load the pre.soul checkpoint
#     When I drag the journal.generic.start card to the consider.setup fixed verb c slot
#     And I drag the zsha card to the consider.setup fixed verb memory slot
#     And I start the consider.setup fixed verb
#     Then the started recipe should be setup.librarian.shapt
#     And the started recipe should have 5 seconds remaining

#   @preservePreviousState
#   Scenario: Finish Remembering Shapt
#     Given 5 seconds have elapsed
#     Then the consider.setup fixed verb should contain the following output:
#       | elementId             | quantity |
#       | xsha                  | 1        |
#       | journal.generic.start | 1        |
#       | zmet                  | 1        |
#       | zwis                  | 1        |
#       | zpho                  | 1        |
#       | zere                  | 1        |
#     And I should not have the following cards:
#       | elementId |
#       | zcho      |
#       | zfet      |

#   @preservePreviousState
#   Scenario: Remember Fet
#     Given I load the pre.soul checkpoint
#     When I drag the journal.generic.start card to the consider.setup fixed verb c slot
#     And I drag the zfet card to the consider.setup fixed verb memory slot
#     And I start the consider.setup fixed verb
#     Then the started recipe should be setup.librarian.fet
#     And the started recipe should have 5 seconds remaining

#   @preservePreviousState
#   Scenario: Finish Remembering Fet
#     Given 5 seconds have elapsed
#     Then the consider.setup fixed verb should contain the following output:
#       | elementId             | quantity |
#       | xfet                  | 1        |
#       | journal.generic.start | 1        |
#       | zmet                  | 1        |
#       | zwis                  | 1        |
#       | zpho                  | 1        |
#       | zere                  | 1        |
#     And I should not have the following cards:
#       | elementId |
#       | zsha      |
#       | zcho      |

#   @preservePreviousState
#   Scenario: Take a checkpoint before testing the second soul choice
#     Given all situations are concluded
#     And I make a new checkpoint called pre.soul.2

#   @preservePreviousState
#   Scenario: Remember Mettle
#     Given I load the pre.soul.2 checkpoint
#     When I drag the journal.generic.start card to the consider.setup fixed verb c slot
#     And I drag the zmet card to the consider.setup fixed verb memory slot
#     And I start the consider.setup fixed verb
#     Then the started recipe should be setup.librarian.mettle
#     And the started recipe should have 5 seconds remaining

#   @preservePreviousState
#   Scenario: Finish Remembering Mettle
#     Given 5 seconds have elapsed
#     Then the consider fixed verb should contain the following output:
#       | elementId                     | quantity |
#       | xmet                          | 1        |
#       | journal.generic.start         | 1        |
#       | introduction.blacksmith.start | 1        |
#     And the talk.setup fixed verb should be available
#     And the talk.setup fixed verb should be on the setup.librarian.talk recipe
#     And the talk.setup fixed verb should have 10 seconds remaining
#     And I should not have the following cards:
#       | elementId |
#       | zwis      |
#       | zpho      |
#       | zere      |

#   @preservePreviousState
#   Scenario: Remember Wist
#     Given I load the pre.soul.2 checkpoint
#     When I drag the journal.generic.start card to the consider.setup fixed verb c slot
#     And I drag the zwis card to the consider.setup fixed verb memory slot
#     And I start the consider.setup fixed verb
#     Then the started recipe should be setup.librarian.wist
#     And the started recipe should have 5 seconds remaining

#   @preservePreviousState
#   Scenario: Finish Remembering Wist
#     Given 5 seconds have elapsed
#     Then the consider fixed verb should contain the following output:
#       | elementId                      | quantity |
#       | xwis                           | 1        |
#       | journal.generic.start          | 1        |
#       | introduction.coffinmaker.start | 1        |
#     And the talk.setup fixed verb should be available
#     And the talk.setup fixed verb should be on the setup.librarian.talk recipe
#     And the talk.setup fixed verb should have 10 seconds remaining
#     And I should not have the following cards:
#       | elementId |
#       | zmet      |
#       | zpho      |
#       | zere      |

#   @preservePreviousState
#   Scenario: Remember Phost
#     Given I load the pre.soul.2 checkpoint
#     When I drag the journal.generic.start card to the consider.setup fixed verb c slot
#     And I drag the zpho card to the consider.setup fixed verb memory slot
#     And I start the consider.setup fixed verb
#     Then the started recipe should be setup.librarian.phost
#     And the started recipe should have 5 seconds remaining

#   @preservePreviousState
#   Scenario: Finish Remembering Phost
#     Given 5 seconds have elapsed
#     Then the consider fixed verb should contain the following output:
#       | elementId                 | quantity |
#       | xpho                      | 1        |
#       | journal.generic.start     | 1        |
#       | introduction.rector.start | 1        |
#     And the talk.setup fixed verb should be available
#     And the talk.setup fixed verb should be on the setup.librarian.talk recipe
#     And the talk.setup fixed verb should have 10 seconds remaining
#     And I should not have the following cards:
#       | elementId |
#       | zmet      |
#       | zwis      |
#       | zere      |

#   @preservePreviousState
#   Scenario: Remember Ereb
#     Given I load the pre.soul.2 checkpoint
#     When I drag the journal.generic.start card to the consider.setup fixed verb c slot
#     And I drag the zere card to the consider.setup fixed verb memory slot
#     And I start the consider.setup fixed verb
#     Then the started recipe should be setup.librarian.ereb
#     And the started recipe should have 5 seconds remaining

#   @preservePreviousState
#   Scenario: Finish Remembering Ereb
#     Given 5 seconds have elapsed
#     Then the consider fixed verb should contain the following output:
#       | elementId                  | quantity |
#       | xere                       | 1        |
#       | journal.generic.start      | 1        |
#       | introduction.midwife.start | 1        |
#     And the talk.setup fixed verb should be available
#     And the talk.setup fixed verb should be on the setup.librarian.talk recipe
#     And the talk.setup fixed verb should have 10 seconds remaining
#     And I should not have the following cards:
#       | elementId |
#       | zmet      |
#       | zwis      |
#       | zpho      |
