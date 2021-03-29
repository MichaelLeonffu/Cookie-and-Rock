---
title: 'YAML to make instances'
series: 'Everything Design 001'
author: 'Michael Leonffu'
date: '2020-03-09'
description: 'YAML for `Everything`'
---

*By Michael Leonffu, March 09, 2021 12:34*

# Developer's notes: Everything Design 001

Using [pyyaml](https://pyyaml.org) as a description language for making
*World* instances.

- [Yaml](#yaml)
- [Python dictionaries](#python-dictionaries)
- [YAML and ppyaml to python dictionaries](#yaml-and-ppyaml-to-python-dictionaries)
- [YAML with pyyaml directly](#yaml-with-pyyaml-directly)
- [YAML with anchors and references](#yaml-with-anchors-and-references)
- [YAML to python objects example](#yaml-to-python-objects-example)
- [See also](#see-also)

todo... fix TOC

## Yaml

*[YAML](https://yaml.org) is a is a human friendly data serialization
standard for all programming languages.* It has very easy to read
object notation, similar to using [JSON](https://www.json.org). But
it also includes some features, anchors and references, which are
especially useful when using *Everything*.

Another reason to use *YAML* is because of how easy it is to convert
into *python* with the use of *pyyaml*. The loading and unloading
can also construct objects in *python*.

One of the key goals in *Everything* is to make sure that even people
with limited or no programming experience can use and read it as well.

```yaml
rooms:
  - name: Diego's room
    description: Diego lives here

items:
    -   name: Diego
        description: He's the one and only

    -   name: Pizza
        description: Still warm, recently made
        actions:
            - action: _eat
```

***Note**: even a non-programmer can understand the description above.*

##  Python dictionaries

Originally in order to make a *World* there would be an input *python*
dictionary which is then interpreted and instantiated into objects.
For example:

```python
my_world = {
	'rooms': [
		{
			'id': 0,
			'name': "Diego's room",
			'des': "Diego lives here"
		}
	],
	'items': [
		{
			'id': 0,
			'name': "Diego",
			'des': "He's the one and only"
		}
		{
			'id': 1,
			'name': "Pizza",
			'des': "Still warm, recently made"
		}
	],
    'actions': [
        {
            'id': 0,
            'item_id': 1,
            'action_method': '_eat'
        }
    ]
}
```

Using *python* dictionaries like this takes up a lot of space, cannot
make references, and needs some software to instantiate into objects.

Notice that the use of `id` is important, the `item_id` in `actions`
needs to refer back to the item in `items`. The problem is that there
may be a large number of `id`s and then it becomes hard to read.

***Note:** one could argue that the structure is not the same as the
original yaml, it's only to illustrate this point.*

## YAML and ppyaml to python dictionaries

Rather than using a very long *python* dictionary format, we could
use *YAML* and convert it to *python* dictionaries.

Code like the following is required to convert from *YAML* to 
*python8 dictionaries, and then finally into objects:
```python
import yaml
stream = open('diego_world.yml', 'r')
dworld = yaml.load(stream, Loader=yaml.Loader)

# Note: dworld is the python dictionary equivalent

# Generate a dict of rooms by their id
rooms = {
    r['id']: Room(
        name=r['name'],
        des=r['des']
    ) for r in dworld['rooms']
}
```

Furthermore, when making the `items` or `actions` it'll require
to make references to earlier instances.

## YAML with pyyaml directly

Rather than converting a *YAML* into a *python* dictionary, we should
be converting it directly into objects. Through the use of class types
this can be accomplished very easily.

*anna_room.yml*:
```yaml
room:
  - !room
    name: Anna's Room
    description: Anna is 3d printing something...
```

*anna_room.py*:
```python
class Room():
	def __init__(self, name, description):
		self.name = name
		self.description = description

    # Just to make sure something is printed
	def __repr__(self):
		return "Room(" + self.__str__() + ")"

	def __str__(self):
		return self.name + ": " + self.description

# Defining a mapping to class
def room_map_constructor(loader, node):
	value = loader.construct_mapping(node, deep=False)
	return Room(value['name'], value['description'])

# Yaml stuff
import yaml

# Adding the class as a mapping value with type tag `!room`
yaml.add_constructor(u'!room', room_map_constructor)
stream = open('anna_house.yml', 'r')
aroom = yaml.load(stream, yaml.Loader)

print(aroom)

# {'room': [Room(Anna's Room: Anna is 3d printing something...)]}
```

In this example, any arbitrary class can be defined in a *YAML* format
and converted. The logic of `room_map_constructor` is in addition
to the original class `room`, it does not change the original `room`
class.

## YAML with anchors and references

References are essential to have a
[feature complete](https://en.wikipedia.org/wiki/Feature_complete)
descriptive language for *Everything*. Having references would do
away with the need for *id*s and later linking them together.

*meow_room.yml*:
```yaml
room:
  - &meow_room !room # &meow_room is an *anchor*
    name: Meow's Room
    des: Smells like coffee

item:
  - !item
    name: Meow
    des: learning YAML
    room: *meow_room # *meow_room is a *reference*
```

*meow_room.py*:
```python
class Room():
	def __init__(self, name, des):
		self.name = name
		self.des = des

	def __repr__(self):
		return "Room(" + self.__str__() + ")"

	def __str__(self):
		return self.name + ": " + self.des

class Item():
	def __init__(self, name, des, room=None):
		self.name = name
		self.des = des
		self.room = room

	def __repr__(self):
		return "Item(" + self.__str__() + ")"

	def __str__(self):
		return self.name + " is " + self.des + " in " + str(self.room)

def room_map_constructor(loader, node):
	value = loader.construct_mapping(node, deep=False)
	return Room(value['name'], value['des'])

def item_map_constructor(loader, node):
	value = loader.construct_mapping(node, deep=False)
	return Item(value['name'], value['des'], value['room'])

import yaml
stream = open('meow_house.yml', 'r')
yaml.add_constructor(u'!room', room_map_constructor)
yaml.add_constructor(u'!item', room_map_constructor)

mhouse = yaml.load(stream, yaml.Loader)

print(mhouse)
# {'room': [Room(Meow's Room: Smells like coffee)],
# 'item': [Item(Meow is learning YAML in Meow's Room: Smells like coffee)]}
```

To verify that the instance is a reference:
```python
# Grab the room instance from the house
mroom = mhouse['room'][0]

# Rename the room
mroom.name = "Meow lab"
print(mhouse)
# {'room': [Room(Meow lab: Smells like coffee)],
# 'item': [Item(Meow is learning YAML in Meow lab: Smells like coffee)]}
```

Since the *name* of *mroom* changed, in both places; we know that
the reference is a true reference and not a copy.

## YAML to python objects example

And extended theoretical example is shown bellow.



## See also

* info