---
title: 'Example Scenarios'
series: 'Everything Dev notes 001'
author: 'Michael Leonffu'
date: '2020-03-10'
description: '`Everything` with YAML'
---

# Everything: Dev notes 001: "Example Scenarios"

*By Michael Leonffu, March 10, 2021 01:13*

Going through implementation of `Everything` using *YAML* through
[pyyaml](https://pyyaml.org).

- [Purpose](#purpose)
- [Example scenario](#example-scenario)
- [Example 1: Easy Item (bread)](#example-1-easy-item-bread)
- [Example 2: Complicated Item (toaster)](#example-2-complicated-item-toaster)
- [See also](#see-also)

todo... fix TOC

## Purpose

There are two approaches to any problem. One is *top-down* and the
other is *bottom-up*. I'm sure there is an online explanation, here
is mine.

**top-down** refers to when a solution is designed from the features
POV. e.g I want my car to fly.

**bottom-up** refers to when a solution is designed from the smallest
elements and putting them together. e.g I have technology which can
make things float.

If you're in *top-down* you must find a way to create this feature,
if you are in *bottom-up* you must find a use of these components.
For *Everything*, as a library, I need to find a way to design
it so that it can handle any situation but also be easy to use.

From the **bottom-up** I have features such as the *axioms* and
*atomic* classes which build into everything. From the *top-down*
I have certain example scenarios which I would like to be able to
do and languages like *YAML* which I want to write in.

The difficulty is creating the best way to connect **bottom-up** and
**top-down** together. My strategy is to work on both little by
little. This will allow me to learn what I need from both ends and
then how to make ends meet.

In **bottom-up** I'm learning *python* and *YAML* and how I can
design a very flex able combination of *axiom*s and *atomic* classes.

In **top-down** I'm looking for examples of scenarios which I want to
be able to make using the library with very minimal effort.

As a result I can work both ends at the same time. I can make
compromises on either side to make the whole process smoother.

## Example scenario

This is an example scenario provided by a friend.
    
    1. I got out of bed and used my phone
    2. I went down stairs to the bathroom and brushed my teeth
    3. I went to the kitchen
    4. I took bread from the fridge, toasted it
    5. Then spread jam on it
    6. Took breakfast to my desk and ate. While watching youtube

This simple scenario can be broken down into a collection of
`Room`s, `Item`s, `Action`s, `State`s, etc...

I have taken the time (yesterday) to write this all in *YAML*. The
following are two excepts.

## Example 1: Easy Item (bread)

In this example, I designed a *bread* `Item` which if an `Agent`
tries to eat it, then they will be yelled at.

A *bread* `Item`:
```YAML
- &bread !item
    name: Bread
    des: Just normal bread; Careful, it's raw
    acts:
      - !act_reg_cmd
        cmd: [eat]
        args: [bread]
        name: Eat bread
        des: Try me
        acts:
          - !act_print
            arg: >
              Send it back! IT'S RAW! Make it into toast first or
              I'll make you into an idiot sandwich!
```

An `Item` which has a reference anchor *bread* has a *name*: "Bread"
and a *des*cription: "Just normal bread...".

*bread* has 1 *act*ion(s) which is a `Command(Action)`.

> `Command(Action)`: an `Action` which can be directly executed by
> an `Agent`.
>
> ***Notice**: the syntax used here `Command(Action)` implies that
> `Command` is a subclass of `Action`. Aka, `Command` is a special
> type of `Action`.*
> 
> `Command`:
> - cmd: `list`; A list of prefixes to activate this `Command`.
> - args: `list`; A list of suffixes to activate this `Command`.
> - name: `str`; The name of this `Command`.
> - des: `str`; Description of this `Command`.
> - acts: `list`; A list of `Action`s to execute if activated.
>

This `Command` has a *name*: "Eat bread" and a *des*cription: "Try
me". I'll refer to this `Command` as "Eat bread".

"Eat bread" has a *cmd*: `[eat]`and *args*: `[bread]`. Therefore
the following commands will activate "Eat bread": "eat bread".

This means that an `Agent` such as *meow* can execute this command
by typing in "eat bread".

Upon activation of "Eat bread", it's *acts* will be executed.

1. `!act_print`: prints out it's argument to the screen in this case
it'll print out: "Send it back! IT'S..."

## Example 2: Complicated Item (toaster)

In this example, I designed a *toaster* `Item` which if an `Agent`
tries to toast with it, then it would first check if the *toaster*
has *bread* in it. If it does, then it will move *bread* into the
*trash* and move *toast* into the *toaster*. There is also some
`!act_print` which help the player understand what happened.

A *toaster* `Item`:
```YAML
- &toaster !item
    name: Toaster
    des: Makes bread into toast
    container: 1
    acts:
      - !act_reg_cmd
        cmd: [toast]
        ags: [bread, ]
        name: Toast something
        des: The toaster can toast bread
        acts:
          - !cond_act_container_contains
            container: *toaster
            contains: *bread
            acts_true:
              - !act_print
                arg: The toaster made toast from bread!
              - !act_move_item
                container: *trash
                item: *bread
              - !act_move_item
                container: *toaster
                item: *toast
            acts_false:
              - !act_print
                arg: >
                  Idiot sandwich! There is no bread in the toaster!
```

An `Item` which has a reference anchor *toaster* has a *name*: 
"Toaster" and a *des*: "Makes bread into toast".

*toaster* has a *container*: 1. This means that "Toaster" can
contain up to 1 `Item`s.

***Note**: If *container* is not defined then the `Item` cannot
contain any `Item`(s) in it.*

*toaster* has 1 *act*ion(s) which is a `Command(Action)`.

This `Command` has a *name*: "Toast something" and a *des*: "The 
toaster can...". I'll refer to this `Command` as "Toast something".

"Toast something" has a *cmd*: `[toast]`and *args*: `[bread, ]`. 
Therefore the following commands will activate "Toast something": 
"toast bread", or "toast".

***Notice**: `[bread, ]` has a ", " meaning there is a blank entry
in the *args*. This is what allows there to be a "toast" activation
command.*

This means that an `Agent` such as *meow* can execute this command
by typing in "toast bread", or "toast".

Upon activation of "Toast something", it's *acts* will be executed.

1. `!cond_act_container_contains`: will conditionally run a set of
*acts* depending on weather a container contains an `Item`. In this
case if the container: *toaster*, contains: *bread* then *acts_true*
will be executed, otherwise *acts_false* will be executed.
    
    1. *acts_true*: an *acts* like list. This one contains:
       
       1. `!act_print` will print it's *arg*: "The toaster ..."
       2. `!act_move_item` will move an `Item` into a container.
In this case the `Item` *bread* into the container *trash*.
       3. `!act_move_item` will move an `Item` into a container.
In this case the `Item` *toast* into the container *toaster*.

    2. *acts_false*: an *acts* like list. This one contains:
       
       1. `!act_print` will print it's *arg*: "Idiot sandwich..."



## See also

* info