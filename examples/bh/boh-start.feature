Feature: Book of Hours Fet Ereb Start
  Scenario: Start the Game
    When I start a new librarian legacy
    And 10 seconds have elapsed
    Then the consider.setup fixed verb should be available
    And the consider.setup fixed verb should contain the following output:
      | elementId             | quantity |
      | xhea.halfdrowned      | 1        |
      | journal.generic.start | 1        |
      | mem.storm             | 1        |

  @preservePreviousState
  Scenario: Study the journal
    Given all situations are concluded
    When I drag the journal.generic.start card to the consider.setup fixed verb c slot
    And I drag the mem.storm card to the consider.setup fixed verb memory slot
    And I start the consider.setup fixed verb
    Then the started recipe should be setup.librarian.shipwrecked
    And the started recipe should have 5 seconds remaining

  @preservePreviousState
  Scenario: Finish studying the journal
    When 5 seconds have elapsed
    Then the consider.setup fixed verb should contain the following output:
      | elementId             | quantity |
      | journal.generic.start | 1        |
      | zsha                  | 1        |
      | zcho                  | 1        |
      | zfet                  | 1        |

  @preservePreviousState
  Scenario: Remember Fet
    Given all situations are concluded
    When I drag the journal.generic.start card to the consider.setup fixed verb c slot
    And I drag the zfet card to the consider.setup fixed verb memory slot
    And I start the consider.setup fixed verb
    Then the started recipe should be setup.librarian.fet
    And the started recipe should have 5 seconds remaining

  @preservePreviousState
  Scenario: Finish Remembering Fet
    Given 5 seconds have elapsed
    Then the consider.setup fixed verb should contain the following output:
      | elementId             | quantity |
      | xfet                  | 1        |
      | journal.generic.start | 1        |
      | zmet                  | 1        |
      | zwis                  | 1        |
      | zpho                  | 1        |
      | zere                  | 1        |
    And I should not have the following cards:
      | elementId |
      | zsha      |
      | zcho      |

  @preservePreviousState
  Scenario: Remember Ereb
    Given all situations are concluded
    When I drag the journal.generic.start card to the consider.setup fixed verb c slot
    And I drag the zere card to the consider.setup fixed verb memory slot
    And I start the consider.setup fixed verb
    Then the started recipe should be setup.librarian.ereb
    And the started recipe should have 5 seconds remaining

  @preservePreviousState
  Scenario: Finish Remembering Ereb
    Given 5 seconds have elapsed
    Then the consider fixed verb should contain the following output:
      | elementId                  | quantity |
      | xere                       | 1        |
      | journal.generic.start      | 1        |
      | introduction.midwife.start | 1        |
    And the talk.setup fixed verb should be available
    And the talk.setup fixed verb should be on the setup.librarian.talk recipe
    And the talk.setup fixed verb should have 10 seconds remaining
    And I should not have the following cards:
      | elementId |
      | zmet      |
      | zwis      |
      | zpho      |

  @preservePreviousState
  Scenario: Find fear
    Given 10 seconds have elapsed
    Then the talk.setup fixed verb should be completed
    And the talk.setup fixed verb should contain the following output:
      | elementId | quantity |
      | mem.fear  | 1        |

  @preservePreviousState
  Scenario: Follow the beach path
    Given all situations are concluded
    When I drag the xfet card to the talk.setup fixed verb talk slot
    And I start the talk.setup fixed verb
    Then the started recipe should be setup.librarian.talk.fet
    And the started recipe should have 10 seconds remaining

  @preservePreviousState
  Scenario: Finish following the beach path
    When 10 seconds have elapsed
    Then the talk fixed verb should contain the following output:
      | elementId                  | quantity |
      | assistance.fisherman.intro | 1        |
      | zfet                       | 1        |
    And the talk fixed verb should contain an assistance.fisherman.intro output card with the following aspects:
      | aspect    | amount |
      | sceptical | 1      |

  @preservePreviousState
  Scenario: Speak to the fisherman
    Given all situations are concluded
    When I drag the assistance.fisherman.intro card to the talk fixed verb talk slot
    And I drag the introduction.midwife.start card to the talk fixed verb intro slot
    And I start the talk fixed verb
    Then the started recipe should be talk.fisherman.intro
    And the started recipe should have 10 seconds remaining

  @preservePreviousState
  Scenario: Finish speaking to the fisherman
    When 10 seconds have elapsed
    And the talk fixed verb should contain the following output:
      | elementId                  | quantity |
      | assistance.fisherman.intro | 1        |
      | introduction.midwife.start | 1        |
    And the talk fixed verb should contain an assistance.fisherman.intro output card with the following aspects:
      | aspect    | amount |
      | sceptical | -1     |

  @preservePreviousState
  Scenario: Unlock Brancrug Village
    Given all situations are concluded
    When I open the terrain unlock window for brancrug
    And I drag the assistance.fisherman.intro card to the terrain unlock window for brancrug
    And I execute the terrain unlock window for brancrug
    Then the started recipe should be terrain.brancrug
    And the started recipe should have 5 seconds remaining

  @preservePreviousState
  Scenario: Brancrug Unlocks
    When 5 seconds have elapsed
    Then the brancrug terrain should be unlocked

  @preservePreviousState
  Scenario: Find Shelter
    When I drag the introduction.midwife.start card to the killes brancrug building w slot
    And I drag a card to the killes brancrug building h slot with the following aspects:
      | aspect | amount |
      | soaked | 1      |
      | heart  | 1      |
    And I start the killes brancrug building verb
    Then the started recipe should be act1start.acquaintance.midwife
    And the started recipe should have 5 seconds remaining

  # TODO: Does this followup recipe change if health was frozen?
  @preservePreviousState
  Scenario: Continue finding shelter
    When 5 seconds have elapsed
    Then the killes brancrug building should contain a mem.hindsight card
    And the killes brancrug building should not contain an introduction.midwife.start card
    And the killes brancrug building should be on the act1start.dry.health.mrskille recipe
    And the killes brancrug building should have 30 seconds remaining

  @preservePreviousState
  Scenario: Finish finding shelter
    Given 30 seconds have elapsed
    Then the killes brancrug building should be completed
    And the killes brancrug building should contain the following output:
      | elementId     | quantity |
      | mem.hindsight | 1        |
      | xhea          | 1        |

  @preservePreviousState
  Scenario: Speak with Mrs Kille to Dry the Journal
    Given all situations are concluded
    When I drag the xere card to the killes brancrug building w slot
    And I start the killes brancrug building verb
    Then the started recipe should be chat.mrs.k.friend
    And the killes brancrug building should have 10 seconds remaining

  @preservePreviousState
  Scenario: Dry the Journal
    When I drag the journal.generic.start card to the killes brancrug building topic slot
    Then the killes brancrug building should be on the dry.book.killes recipe

  @preservePreviousState
  Scenario: Finish drying the Journal
    When 10 seconds have elapsed
    Then the killes brancrug building should be completed
    And the killes brancrug building should contain the following output:
      | elementId          | quantity |
      | zere               | 1        |
      | journal.artist.unc | 1        |

  @preservePreviousState
  Scenario: Pass the day
    Given all situations are concluded
    When the next day arrives
    Then I should not have the following cards:
      | elementId |
      | zfet      |
      | zere      |
    And I should have the following cards:
      | elementId | quantity |
      | xfet      | 1        |
      | xere      | 1        |

  @preservePreviousState
  Scenario: Get Mrs K's Assistance
    When I drag the xere card to the killes brancrug building w slot
    And I start the killes brancrug building verb
    And 10 seconds have elapsed
    Then the killes brancrug building should be completed
    And the killes brancrug building should contain the following output:
      | elementId          | quantity |
      | zere               | 1        |
      | assistance.midwife | 1        |

  @preservePreviousState
  Scenario: Get Introduced to Denzil
    Given all situations are concluded
    When I drag the assistance.midwife card to the smithy brancrug building w slot
    And I start the smithy brancrug building verb
    Then the started recipe should be acquaintance.denzil
    And the started recipe should have 10 seconds remaining

  @preservePreviousState
  Scenario: Complete Getting Introduced to Denzil
    When 10 seconds have elapsed
    Then the smithy brancrug building should be completed
    And the smithy brancrug building should contain the following output:
      | elementId     | quantity |
      | mem.foresight | 1        |

  @preservePreviousState
  Scenario: Pick up a package from the Post Office
    Given all situations are concluded
    When I drag the journal.artist.unc card to the postoffice brancrug building w slot
    And I start the postoffice brancrug building verb
    Then the started recipe should be postoffice.open
    And the started recipe should have 10 seconds remaining

  @preservePreviousState
  Scenario: Complete picking up a package from the Post Office
    When 10 seconds have elapsed
    Then the postoffice brancrug building should be completed
    And the postoffice brancrug building should contain the following output:
      | elementId           | quantity |
      | journal.artist.unc  | 1        |
      | tenshillingnote     | 1        |
      | letter.rhonwen.act1 | 1        |

  @preservePreviousState
  Scenario: Break the ten shilling note
    Given all situations are concluded
    When I drag the tenshillingnote card to the postoffice brancrug building l slot
    And I start the postoffice brancrug building verb
    Then the started recipe should be postoffice.break.tenshillingnote
    And the started recipe should have 5 seconds remaining

  @preservePreviousState
  Scenario: Complete breaking the ten shilling note
    Given 5 seconds have elapsed
    Then the postoffice brancrug building should be completed
    And the postoffice brancrug building should contain the following output:
      | elementId | quantity |
      | sixpence  | 1        |
      | florin    | 1        |
      | halfcrown | 1        |
      | crown     | 1        |

  @preservePreviousState
  Scenario: Break a Florin
    Given all situations are concluded
    When I drag the florin card to the postoffice brancrug building l slot
    And I start the postoffice brancrug building verb
    Then the started recipe should be postoffice.break.florin
    And the started recipe should have 5 seconds remaining

  @preservePreviousState
  Scenario: Complete breaking the Florin
    Given 5 seconds have elapsed
    Then the postoffice brancrug building should be completed
    And the postoffice brancrug building should contain the following output:
      | elementId  | quantity |
      | penny      | 1        |
      | sixpence   | 1        |
      | twopence   | 1        |
      | shilling   | 1        |
      | threepence | 1        |

  @preservePreviousState
  Scenario: Get Denzil's Assistance
    Given all situations are concluded
    When I drag the xhea card to the smithy brancrug building w slot
    And I start the smithy brancrug building verb
    Then the started recipe should be chat.smithy

  @preservePreviousState
  Scenario: Give Denzil a Shilling
    When I drag the shilling card to the smithy brancrug building topic slot
    Then the smithy brancrug building should be on the recruit.smithy recipe

  @preservePreviousState
  Scenario: Complete getting Denzil's Assistance
    When 10 seconds have elapsed
    Then the smithy brancrug building should be completed
    And the smithy brancrug building should contain the following output:
      | elementId             | quantity |
      | zhea                  | 1        |
      | assistance.blacksmith | 1        |

  @preservePreviousState
  Scenario: Unlock Cucurbit Bridge
    Given all situations are concluded
    When I open the terrain unlock window for cucurbitbridge
    And I drag the assistance.blacksmith card to the terrain unlock window for cucurbitbridge
    And I execute the terrain unlock window for cucurbitbridge
    Then the started recipe should be terrain.cucurbitbridge
    And the started recipe should have 60 seconds remaining

  @preservePreviousState
  Scenario: Cucurbit Bridge Unlocks
    When 60 seconds have elapsed
    Then the cucurbitbridge terrain should be unlocked

  @preservePreviousState
  Scenario: Get Mrs K's Assistance for the Lodge
    When the next day arrives
    And I drag the xere card to the killes brancrug building w slot
    And I start the killes brancrug building verb
    And 10 seconds have elapsed
    And all situations are concluded
    And I drag the assistance.midwife card to the talk fixed verb talk slot
    And I drag the xhea card to the talk fixed verb collaborate slot
    And I start the talk fixed verb
    Then the started recipe should be collaborate.xhea
    And the started recipe should have 30 seconds remaining

  @preservePreviousState
  Scenario: Finish Getting Mrs K's Assistance for the Lodge
    When 30 seconds have elapsed
    Then the talk fixed verb should be completed
    And the talk fixed verb should contain the following output:
      | elementId          | quantity |
      | zhea               | 1        |
      | assistance.midwife | 1        |
    And the talk fixed verb should contain an assistance.midwife output card with the following aspects:
      | aspect | amount |
      | heart  | 1      |

  @preservePreviousState
  Scenario: Have Mrs K open the Lodge
    Given all situations are concluded
    When I open the terrain unlock window for lodge
    When I drag the assistance.midwife card to the terrain unlock window for lodge
    And I execute the terrain unlock window for lodge
    Then the started recipe should be terrain.lodge
    And the started recipe should have 60 seconds remaining

  @preservePreviousState
  Scenario: The Lodge Unlocks
    When 60 seconds have elapsed
    Then the lodge terrain should be unlocked

  @preservePreviousState
  Scenario: Unlock the Gatehouse
    When I drag the key.hush.house card from the ~/library!lodge/thingslotmantlepiece sphere to the ~/portage5 sphere
    And I open the terrain unlock window for gatehouse
    And I drag the key.hush.house card to the terrain unlock window for gatehouse
    And I execute the terrain unlock window for gatehouse
    Then the started recipe should be terrain.gatehouse
    And the started recipe should have 60 seconds remaining

  @preservePreviousState
  Scenario: The Gatehouse Unlocks
    When 60 seconds have elapsed
    Then the gatehouse terrain should be unlocked