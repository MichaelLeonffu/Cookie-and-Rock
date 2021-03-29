---
title: 'The Shovel Dilemma'
series: 'Everything Dev notes 002'
author: 'Michael Leonffu'
date: '2020-03-10'
description: 'Designing `Item` in `Everything`'
---

# Everything: Dev notes 002: "The Shovel Dilemma"

*By Michael Leonffu, March 10, 2021 21:00*

The thought process of designing a *shovel* `Item` in `Everything`.

- [Inspiration, emacs: dunnet](#inspiration-emacs-dunnet)
- [Analysis of *shovel*](#analysis-of-shovel)
- [Scenarios of *Thing* hierarchies](#scenarios-of-thing-hierarchies)
- [(Wrong) Solution 1: current `Everything` design](#wrong-solution-1-current-everything-design)
- [(Incomplete) Solution 2: key and lock pairs](#incomplete-solution-2-key-and-lock-pairs)
- [(Idea) Solution 3: importable packages/libs](#idea-solution-3-importable-packageslibs)
- [See also](#see-also)

## Inspiration, emacs: dunnet

The main inspiration for `Everything` is the `emacs` game called `dunnet`.
If you have `emacs` installed you can find the game or run it in batch mode.

    emacs -batch -l dunnet

And you'll be put into the game:

    Dead end
    You are at a dead end of a dirt road.  The road goes to the east.
    In the distance you can see that it will eventually fork off.  The
    trees here are very tall royal palms, and they are spaced equidistant
    from each other.
    There is a shovel here.

In this game there are `Item`s called *objects* and the player can pick up
these *objects* into his/her inventory. From the inventory, the player, can use
these *objects*. For example, with the shovel:

    There is a shovel here.
    >take shovel
    Taken.  
    >look at shovel
    It is a normal shovel with a price tag attached that says $19.99.
    >dig
    Digging here reveals nothing.

The player can issue commands such as `take OBJECT` and `look at OBJECT` to
interact with `OBJECT`, *shovel*. More importantly these commands are only
available to the player when the player is in possession of the `OBJECT`.

    Digging here reveals nothing.
    >drop shovel
    Done.
    >dig
    You have nothing with which to dig.

Since the *shovel* is no longer in possession of the player, the player can no
longer **successfully** issue the command `dig`. This type of behavior is not
yet well defined in `Everything`.

Next there is also the case that `dig` with the *shovel* is successful, in
a specific room, and returns an `Item`.

    You are at a fork of two passages, one to the northeast, and one to the
    southeast.  The ground here seems very soft. You can also go back west.
    >dig
    I think you found something.
    >look
    Fork
    You are at a fork of two passages, one to the northeast, and one to the
    southeast.  The ground here seems very soft. You can also go back west.
    There is a CPU card here.

Notice that the success message is "I think you found something". And checking
the room reveals that there is an `Item`, *cpu*, which was not there 
previously. Also notice that the *des* of this room hints that there is
"ground ... very soft".

## Analysis of *shovel*

***Note**: There are similar classes which exist in both `dunnet` and
`Everything`. These are `Command`: `dig`, `Agent`: player, and `Item`: 
*shovel*.*

Breaking down *shovel* into smaller details:

 1. The `dig` command is always available to the player regardless of wether or
        not the player is in possession of *shovel*.
 2. If the player has a *shovel*, `dig` then resolves and tries to dig in
        the current room.
 3. If the `dig` resolves and is successful in finding an `Item` then it is
        mentioned and that `Item` is added to the container of that `Room`.

Some design goals and considerations to keep in mind:

 1. All functions of a *shovel* should be self contained that way it is
        optional to use a *shovel* in a world and so it is portable between 
        worlds.
 2. *shovel* is just an `Item`. There may be multiple shovels at a time.
 3. *shovel* may be used on any number of `Item`s. e.g Any `Room` that has
        something that can be dug. *shovel* could be a template for a key like
        `Item` which unlocks certain `Doors`.
 4. Assuming that *shovel* digs up an `Item`, that `Item` must somehow be
        moved or generated then placed into the `Agent`s container. It's
        important to consider where that `Item` is located before it is
        dug out by *shovel*.
 5. Expanding on the previous bullet point,
 6. A solution which imposes very little overhead in references and having to
        make references in a certain order.
 7. Keeping everything as DEEP constructors. Meaning, when constructing 
        anything we should not need to make a reference to it's parent.
        **Note**: parents always have a reference to their child.

    ```Yaml
    parent: &p !a_parent:
      child: &c !a_child:
        parent_ref: *p # Error. child is made before parent.
    ```
8. something
        

***Assume** that `take` is a `Command` that an `Agent` can use to move an 
`Item` from the current room and into that `Agent`s container.*

## Scenarios of *Thing* hierarchies

Staring by purely looking at the `Thing`s; assume that the starting hierarchy is:

**Scenario 1**:

```YAML
rooms:
  - &dead_end !room
    name: Dead end
    des: Starting point.
    contains:
      - &shovel !item
        name: Shovel
        des: It is a normal shovel.
      - &player !agent
        name: Player
        des: This is you.
  - &path !room
    name: Path
    des: Dirt path.
```

We have 4 `Thing`s: 2 `Room`s, 1 `Item`, and 1 `Agent`. If the `Agent` picks up
the *shovel* then we have:

***Note**: for the purposes of being more concise, *name* and *des* are 
omitted from the YAML but they are still there.*

**Scenario 2**:

```YAML
rooms:
  - &dead_end !room
    contains:
      - &player !agent
        contains:
          - &shovel !item
  - &path !room
```

Where the *shovel* is contained by the *player*.

## (Wrong) Solution 1: current `Everything` design

Starting with solving a simpler solution: digging in only one room is valid.
Using only what exists currently for `Everything`, a possible solution to
the *shovel* problem is:

```YAML
- &dead_end !room
  contains:
    - &shovel !item
      acts:
        - !cond_act_container_contains
          container: *player # requires &player to be defined first
          contains: *shovel # breaks if DEEP constructor
          acts_true:
            - !act_print:
              arg: You dig here!?
          acts_false:
            - !act_print:
              arg: Item is not in your inventory?
    - &player !agent
      acts:
      - !take_item
      - !dig: # overall requires unique python level logic
        shovel: *shovel # requires shovel to be defined first
        room: *path # requires path to be defined first
        arg_dig_true: You dug it, make item?
        arg_dig_false: You cannot dig here?
- &path !room
```

It is an wrong solution because it is easy to see that this solution
will cause more problems and overhead making it too complicated for anyone to
use. This goes against the goals.

## (Incomplete) Solution 2: key and lock pairs

Still working with a 1:1 "key and lock" type of scenario. The goal is to make
the an instance of a *key* and a *lock* which can match up and cause and
`Action` to occur. This is not currently part of `Everything`.

A design philosophy I am adopting is using something that is more RISC over
CISC. Meaning, make a lot of small things that work well and combine them, not
a lot o large things that only work certain scenarios. Meaning, rather than
making a `key_and_lock_generator`. Perhaps it would be better to take an
`Item` which we can make into a *key*.

```YAML
key_lock_pairs:
  - &lock !key_and_lock
    key: &shovel !item
      name: Shovel
      des: It is a normal shovel.
rooms:
  - &dead_end !room
    contains:
      - *shovel
      - &player !agent
        acts:
        - !take_item
  - &path !room
    contains:
      - *lock
```

This is likely the most ideal looking solution. We designate a *lock* and *key*
then simply place these in the *containers* we want. Using this design we could have more than 1 *lock* instance. These locks may also be imbued into
`Item`s which can be moved i.e a chest.

This concept of imbuing a `Thing` does not quite fit into any of the existing
atomic classes:

- `Thing`: Everything is a `Thing`.
- `State`: Data manipulated by an `Action`.
- `Action`: Manipulates `Thing`s and `States`.
- "imbue": Adds a property/quality to a `Thing`.

[Devil's advocate](https://en.wikipedia.org/wiki/Devil%27s_advocate) suppose
we treat `Imbue` as a `State`. Oh. Wait. That might work. The analogy I am
thinking of is having something like *fire* and *burnable*. If something is
imbued with *burnable* then something which can cause *fire* will burn that
thing. But we also want to be able to make this fire resistant, therefore
*burnable* would be false and *fire* wouldn't burn it. e.g, wood is naturally
*burnable* but adding water to it could cause it to become fire resistant.

The main difference I want to point out is "imbued" would imply it's inherent
to the `Thing`, immutable. Whereas `State` can be changed i.e the direction
it is facing. Perhaps a combination of `State` and `Imbue/quality` can be
reached.

***Disclaimer**, I am not an english major so: flammable = burnable.*

Example usage:
```YAML
aspects:
  - &flammable: !aspect
    name: Can burn
    key: &ignite: !aspect
      name: Ignites
      act: !act_use_on_item
        cmd: [burn, ignite]
        acts: !acts_move_target_item 
rooms:
  - &dead_end !room
    contains:
      - &matches !item:
        name: Matches
        des: Can you burn with it?
        acts:
          - *ignite
      - &wood !item:
        name: Wooden wood
        des: Who knows if you can burn it?
        qualities:
          - *flammable.name
```

At the end of the day, I want something I can "import", like a standard
library, where there is a set of given `aspects` and `Items` that can all
interact naturally. `Aspect`s can be placed into `Thing`s, and `Thing`s can
be put together.

## (Idea) Solution 3: importable packages/libs

As you can tell, these "solutions" are not really "solutions".

Now that we have a rough guess to what we want the solution to be, and what the
problem is, we can lay out some basic details a package may/should have.

- Use by reference e.g `*flammable`.
- Has a set of `Command`s to use library `Aspects`.
- Can be configured easily, through YAML.
- Requires little to no set up/arguments to use. e.g minimal use: `*flammable`.
- Can be made from pre existing YAML code or simple python code.

Unfortunately since YAML doesn't support "." notation we cannot access certain
members of an instance.

Seems like there is a concept of scope and there are directives for YAML.
I'll be looking into that before continuing this train of thought.

## See also

* info