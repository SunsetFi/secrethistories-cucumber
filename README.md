## Step definitions

### Game state

#### Given I start a new [legacyId] legacy

Starts a fresh legacy

#### Given I make a checkpoint called [checkpointId]

Creates a transient save of the game state under the given checkpoint id. Note that this save is not stored as a save file in the game's folder, but is stored in-memory.

#### Given I load the [checkpointId] checkpoint

Restores a checkpoint previously created this test session.

### Elements

#### Given I have [a/an] [elementId] card on the [fucinePath] sphere

Creates a single-quantity element on the given sphere.

#### Given I have [quantity] [elementId] cards on the [fucinePath] sphere

Creates a specified quantity of elements on the given sphere as a single element stack.

#### When I drag the [elementId] card from the [sourceFucinePath] sphere to the [targetFucinePath] sphere

Moves a card by element id from the given sphere to the target sphere.

Note that while this is described as 'drag', it uses `TryAcceptToken` directly and bypasses the ui layer. This can be used to move any card anywhere.

#### Then I should have the following cards:

Checks the 'player spheres' (hands, portages) for cards. Every card in the input table has exactly the specified quantity in its stack.

Example:

```feature
Then I should have the following cards:
  | elementId | quantity |
  | zhea      | 1        |
  | zfet      | 3        |
```

#### Then I should have [a/an] [elementId] card with the following aspects:

Checks that a card with the given element id has the table-specified aspects somewhere in the 'player spheres' (hands, portages)

Example:

```feature
Then I should have a zhea card with the following aspects:
  | aspect | amount |
  | soaked | 1      |
  | heart  | 1      |
```

#### Then I should not have the following cards:

Checks that the 'player spheres' (hands, portages) do not have any of the specified cards.

Example:

```feature
Then I should not have the following cards:
  | elementId |
  | zhea      |
  | zfet      |
```

### Situations

#### Given I have [a/an] [verbId] verb on the tabletop

Creates a verb on the tabletop sphere. Cultist Simulator only.

#### Given I have [a/an] [verbId] verb on the [fucinePath] sphere

Creates a verb at the specified sphere.

#### Given I have [a/an] [verbId] verb on the [fucinePath] sphere with the recipe [recipeId]

Creates a verb at the specified sphere and immediately starts it on the specified recipe.

#### Given all situations are concluded

Concludes all user-accessible situations that are in their 'completed' state.

Cultist Simulator: Only tabletop verbs are affected
Book of Hours: All fixed verbs and library verbs are affected.

#### When I drag the [elementId] card to the [verbId] fixed verb [slotId] slot

Drags a card from the 'player spheres' (hands, portages) to the verb found in the fixed verb spheres.

The card will be placed in the threshold identified by `slotId`.

This can be used for both unstarted and ongoing verbs.

#### When I start the [verbId] fixed verb

Tries to execute the fixed verb. An error will be thrown if the verb fails to start.

#### When I drag the [elementId] card to the [buildingId] brancrug building [slotId] slot

Drags a card from the 'player spheres' (hands, portages) to the singular verb found in the specified building of the brancrug terrain.

The verb targeted by this command is the singular token at the path `~/library!brancrug/buildingslot[buildingId]`.

The card will be placed in the threshold identified by `slotId`.

This can be used for both unstarted and ongoing verbs.

#### When I drag a card to the [buildingId] brancrug building [slotId] slot with the following aspects:

Same as above, but the card dragged is identified by matching the aspects in the table.

This command requires a table with the columns `aspect` and `amount`. Amount can be positive for `equal or greater`, or negative for `less than`

Example:

```feature
When I drag a card to the kiles brancrug building w slot with the following aspects:
  | aspect | amount |
  | heart  | 1      |
  | soaked | -1     |
```

#### When I start the [buildingId] brancrug building verb

Tries to execute the verb in the given building. An error will be thrown if the verb fails to start.

The verb targeted by this command is the singular token at the path `~/library!brancrug/buildingslot[buildingId]`.

#### Then the [verbId] fixed verb should be available

Checks that the given verb is in the fixed verbs sphere

#### Then the [verbId] fixed verb should have [seconds] second[s] remaining

Checks that the given fixed verb has the specified number of seconds remaining.

Note that this can be difficult to test for if the game is not paused.

#### Then the [buildingId] brancrug building should have [seconds] second[s] remaining

Checks that the given brancrug building verb has the specified number of seconds remaining.
The verb targeted by this command is the singular token at the path `~/library!brancrug/buildingslot[buildingId]`.

Note that this can be difficult to test for if the game is not paused.

#### Then the [verbId] fixed verb should be on the [recipeId] recipe

Checks that the given fixed verb is on the specified recipe.

#### Then the [buildingId] brancrug building should be on the [recipeId] recipe

Checks that the given building is on the specified recipe.
The verb targeted by this command is the singular token at the path `~/library!brancrug/buildingslot[buildingId]`.

#### Then the [buildingId] brancrug building should contain [a/an] [elementId] card

Checks that the building verb contains the given elementId in its storage sphere.
The verb targeted by this command is the singular token at the path `~/library!brancrug/buildingslot[buildingId]`.

#### Then the [buildingId] brancrug building should not contain [a/an] [elementId] card

Checks that the building verb does not contain the given elementId in its storage sphere.
The verb targeted by this command is the singular token at the path `~/library!brancrug/buildingslot[buildingId]`.

#### Then the [verbId] fixed verb should be completed

Checks that the given fixed verb is in the completed state

#### Then the [buildingId] brancrug building should be completed

Checks that the given building is in the completed state
The verb targeted by this command is the singular token at the path `~/library!brancrug/buildingslot[buildingId]`.

#### Then the [verbId] fixed verb should contain the following output:

Checks that the given fixed verb has cards matching the table in its output sphere.

Example:

```feature
Then the consider.setup fixed verb should contain the following output:
  | elementId             | quantity |
  | xhea.halfdrowned      | 1        |
  | journal.generic.start | 1        |
  | mem.storm             | 1        |
```

#### Then the [verbId] fixed verb should contain an output card with the following aspects:

Checks that the given fixed verb output sphere has any element with the given aspects.

Example:

```feature
Then the talk fixed verb should contain an output card with the following aspects:
  | aspect    | amount |
  | sceptical | 1      |
```

#### Then the [verbId] fixed verb should contain [a/an] [elementId] output card with the following aspects:

Checks that the given fixed verb output sphere has a specific element id card with the given aspects.

Example:

```feature
Then the talk fixed verb should contain an assistance.fisherman.intro output card with the following aspects:
  | aspect    | amount |
  | sceptical | 1      |
```

#### Then the [buildingId] brancrug building should contain the following output:

Checks that the given building output sphere has any element with the given aspects.
The verb targeted by this command is the singular token at the path `~/library!brancrug/buildingslot[buildingId]`.

Example:

```feature
Then the kiles brancrug building should contain the following output:
  | elementId | amount |
  | health    | 1      |
```

#### Then the [buildingId] brancrug building should not contain the following output:

Checks that the given building output sphere has any element with the given aspects.
The verb targeted by this command is the singular token at the path `~/library!brancrug/buildingslot[buildingId]`.

Example:

```feature
Then the kiles brancrug building should not contain the following output:
  | elementId |
  | health    |
```

#### Then the started recipe should be [recipeId]

Checks that the last started recipe is [recipeId]. This must follow an 'execute' step defined elsewhere in this file, and does not work to check recipes executed manually in-game.

#### Then the started recipe should have [seconds] seconds remaining

Checks that the last started recipe has the specified seconds remaining at the time of execution. This must follow an 'execute' step defined elsewhere in this file, and does not work to check recipes executed manually in-game.

Note that this might not match exactly if the game is not paused at the time of recipe execution.

### Terrains

Book of Hours only.

#### Given the [terrainId] terrain is unlocked

Unlocked the ConnectedTerrain token at `~/library/{terrainId}`.

#### When I open the terrain unlock window for [terrainId]

Opens the TerrainDetailWindow linked to the given terrain id. The terrain must be under the library sphere.

#### When I drag the [elementId] card to the terrain unlock window for [terrainId]

Drags the given elementId from the 'player spheres' (hands and portage) to the unlock window for the given terrain.

#### When I execute the terrain unlock window for [terrainId]

Starts the unlock process for the given terrain id, assuming the window has been opened and a card has been dragged in.

#### Then the [terrainId] terrain should be unlocked

Checks to see if the terrain is unlocked (unsealed and unshrouded)

### Time

#### When [seconds] seconds have elapsed

Pases the time. Time is elapsed instantaniously by executing a global heartbeat with the specified duration.

#### When the next day arrives

Passes time until the next day. Time is elapsed in a sequence of jumps until verb in `~/day` reaches the `day.dawn` recipe.
Book of Hours only.
