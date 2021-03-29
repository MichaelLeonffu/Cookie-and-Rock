
*By Michael Leonffu, March 09, 2021 13:07*

# Developer's notes: Everything Design 002

Using [pyyaml](https://pyyaml.org) as a description language for making
*World* instances. Reference analysis.

- [Developer's notes: Everything Design 002](#developers-notes-everything-design-002)
  - [Making references in YAML for Everything](#making-references-in-yaml-for-everything)
  - [Axioms and atomic classes](#axioms-and-atomic-classes)
  - [Example Usage goals](#example-usage-goals)
    - [Example 1: a world with rooms](#example-1-a-world-with-rooms)
    - [Example 2: a room with items](#example-2-a-room-with-items)
    - [Example 3: items with actions, create/destroy](#example-3-items-with-actions-createdestroy)
    - [Example 4: items with actions, conditional states](#example-4-items-with-actions-conditional-states)
    - [Example 5: actions with multiple conditional states](#example-5-actions-with-multiple-conditional-states)
  - [Usage analysis](#usage-analysis)
  - [See also](#see-also)

todo... fix TOC

## Making references in YAML for Everything

Unfortunately circular dependencies are not easily allowed in *YAML*.
So that means there needs to be a linking of references at some point.

e.g
```yaml
rooms:
  - &meow_room !room
    name: Meow's Room
    des: Smells like coffee
items:
  - !item
    name: Meow
    des: learning YAML
    room: *meow_room
  - !item
    name: Coffee
    des: warm
    room: *meow_room
```

In this case we have the *item*s making a reference to *meow_room*
but we don't have a reference from *meow_room* back to each item.

**Incorrect**: (circular not allowed)

```yaml
rooms:
  - &meow_room !room
    name: Meow's Room
    des: Smells like coffee
    items:
        - *meow
        - *coffee
items:
  - &meow !item
    name: Meow
    des: learning YAML
    room: *meow_room
  - &coffee !item
    name: Coffee
    des: warm
    room: *meow_room
```

Produces the error:

    yaml.composer.ComposerError: found undefined alias 'meow'

since *&meow* anchor is not defined before the reference **meow* is
made.

The only way around this is to link the *item*s back to the *room*s
after it's constructed. A set of dependencies are generated from this.
There will be anchors which will never/should never require
references.

## Axioms and atomic classes

It's a huge mess. But some axioms exist.

Axioms of *Everything*:
1. Everything is a *Thing*.
2. *Thing*s can contain *Thing*s.
3. **Only** *Thing*s can have *State*s.
4. *Action*s can only be performed by *Thing*s.
5. **Only** *Action*(s) can manipulate *State*(s).

All atomic classes in *Everything*:
- *Thing*:
  - Can contain *Thing*s.
  - Can contain *Action*s.
  - Can contain *State*s.
- *Action*:
  - **MUST** be contained in a *Thing*.
  - Can refer any *Thing*'s *State*(s).
  - (implied) Can refer to the *Thing* which contains it.
registered to.
- *State*:
  - **MUST** be contained in a *Thing*.

The Axioms and atomic classes derive a usage.

## Example Usage goals

Similar to a file system where each file is a *Thing* and files
contain data *State* as well as methods *Action*s which manipulate
other file's *State*s. In order to make sure the axioms are enough
to properly define every situation, consider the following examples.

### Example 1: a world with rooms

*World* and *Room* are *Thing*s. The *World* contains *Room*s which
is axiom:1,2. If this were a file system, *Room*s are like
directory files. *Room*s can also contain inner *Room*s.

> In a *my_world* exists *anna_house* and *diego_house*. These
houses (*Room*s) are *Thing*s inside the *my_world* *Thing*.

### Example 2: a room with items

In any *Room* we can have *Item*s, which are also things (axiom:1,2).
If this were a filesystem these directories *Room*s would contain
ordinary files *Item*s.

> In *diego_house* we have 3 *Item*s: *pizza*, *diego*, and *car*.

### Example 3: items with actions, create/destroy

For any *Item*, it can have *Action*s which manipulate other *Thing*s.
Some *Action*s may include, and is not limited to, creating/destroying
*Items*.

> The *Item*, *diego*, has an *Action* which is *_bake_pizza*. This
*Action* should generate a new *pizza* *Item* into the *diego_house*
*Room*. More specifically *diego* should create a *pizza* which is
in the same container that contains *diego*.

***Note**: *Action* methods are prepended with "_"*.

**Conclusion**: *Action* must have a reference to it's calling
*Item*, and *Item* must have a reference to it's container for an
*Action* like this one to work. Aka, relative destination, relative
source.

### Example 4: items with actions, conditional states

For any *Action*, there may be conditionals. These conditions depend
on certain *State*(s).

> *diego* *Item* can only create *pizza* 3 times. The value *3* needs
be to be tracked someplace. This is the designation of *State*.

### Example 5: actions with multiple conditional states

Suppose we want to impose a limit of *Item*s which a *Room* can
contain. This would be like a bag with a weight limit.

> 

## Usage analysis

The difference between compile time and runtime.

**Compile time**:
- Example 0..3: are Compile time...

**Runtime**:
- Example 4: is runtime because *Action*(s) are taken after the

## See also

* info