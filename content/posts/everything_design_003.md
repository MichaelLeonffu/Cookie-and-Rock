<title>A Sample MultiMarkdown Document</title>
<meta name="author" content="Michael Leonffu">
<meta name="date" content="March 12, 2021">

# Everything: Design notes 003: "Packages, Libs, Tags"

*By Michael Leonffu, March 12, 2021 23:00*

How to make standard sets of libraries with minimal overhead. e.g a standard
`Item` library with common use items.

- [Motivation](#motivation)
- [YAML syntax and pyyaml](#yaml-syntax-and-pyyaml)
  - [add_constructor()](#add_constructor)
  - [Into to Yaml Tags](#into-to-yaml-tags)
  - [Yaml tags with python](#yaml-tags-with-python)
  - [Default/configuration](#defaultconfiguration)
- [Next step](#next-step)
- [See also](#see-also)

## Motivation

The goal for this text_game library is to use it like a framework. That is
`Everything` is all the basic building blocks and when used correctly it acts
as a framework. In any game-engine like framework, there is a standard set of
`Item`s or objects which can be imported into any game running the engine.

For example, when building maze or puzzle games, there is a need for a
key-and-lock like mechanic. Rather than having the game developer building
a key-and-lock mechanic, there could be a standard one. The standard one is
also easily configurable to fit the different needs of any developer.

Finally, and more importantly, libraries can act as a standard between two
different instances of worlds. For example, a *flammable* `Aspect` should be
portable between two worlds. Or an `Item` like a *bag*.

The end goal of having portability is so that different worlds can easily
connect with each other. They could have a list of required libraries or
have a black/white list. Futhermore having a standard library allows for
unique ids which would be universal. That means the data would exist on a 
database and certain standard `Item`s can be moved between world instances.

## YAML syntax and pyyaml

Ideally, it would be good if game developers could also create their own set
of these libraries. And the best way to do that would be to use YAML. So
this next section will explore some more tricky details of YAML and pyyaml.

### add_constructor()

The most familiar way I have been using YAML to python via pyyaml is:

```python
import yaml
import pprint

yam = """
---
bag:
- &wand !Item
  name: Magic wand
  des: Kinda magical.
...
"""

class Item():
    def __init__(self, name, des):
        self.name = name
        self.des = des

    def __repr__(self):
        return f'Item({self.__str__()}'

    def __str__(self):
        return f'{self.name}:{self.des}'

def item_map_constructor(loader, node):
    value = loader.construct_mapping(node, deep=False)
    return Item(value['name'], value['des'])

yaml.add_constructor(u'!Item', item_map_constructor)

stuff = yaml.load(yam, yaml.Loader)

print(stuff) #{'bag': [Item(Magic wand:Kinda magical.]}
```

But the downside would be having to make something like `item_map_constructor`
to make the `!Item` tag. The important thing to note is that the map key and
values are 1:1 with the constructor. Introducing Tags which use tag uri
notation; aka it has limited documentation and requires a lot of figuring out.

### Into to Yaml Tags

There's limited use and documentation of the YAML tag directives. This is
adding a `%TAG !id! prefix` before the YAML document. I've tested some of these
tags and will report my findings here.

```YAML
%TAG !lib! !It
---
now: !lib!em
  name: name
  des: des
...
```

The prefix part is `!It`, having the `!` in front is important because that
tells YAML we have a basic substitution rather than a
[tag uri](https://en.wikipedia.org/wiki/Tag_URI_scheme).

Furthermore, the following are all equivalent.

```YAML
---
a_string: test
...

---
a_string: !!str test
...

%TAG !lib! tag:yaml.org,2002:
---
a_string: !lib!str test
...

---
a_string: !<tag:yaml.org,2002:str> test
...
```

Referenced from the [yaml reference card](https://yaml.org/refcard.html).

### Yaml tags with python

Tags allows us to bring in schemas form outside sources into the YAML
document. We can use python like tag uris to make references to python objects.

```python
yam = """
%TAG !my_lib! tag:yaml.org,2002:python/object:__main__.
---
bag:
- &wand !my_lib!Item
  name: Magic wand
  des: Kinda magical.
...
"""

class Item():
    def __init__(self, name, des):
        self.name = name
        self.des = des

    def __repr__(self):
        return f'Item({self.__str__()}'

    def __str__(self):
        return f'{self.name}:{self.des}'

stuff = yaml.load(yam, yaml.Loader)

print(stuff) #{'bag': [Item(Magic wand:Kinda magical.]}
```

Referenced from [pyyaml docs](https://pyyaml.org/wiki/PyYAMLDocumentation).

Notice, there is no need for the `add_constructor`. But more importantly there
is a concept of accessing certain classes with uri notation. So my guess is 
that there are other ways to use this tag directive. e.g accessing python
modules, functions, objects, etc.

### Default/configuration

Small side note, on the matter of making default settings for standard library
`Item`s and such. There is a YAML way of doing this with the "merge key"
feature.

```YAML
template: &default_key
  name: Skeleton key
  des: Unlocks everything
my_key: &useless_key
  <<: *default_key # grabs "name: Skeleton key", from default_key
  des: Only works on skeletons
```

This only works on dicts, but a dict can be used as a config.

## Next step

The next step is to find out what is and isn't possible with these tag
statements as well as learning how to use python modules. Together those two
can form the basis of making libraries for `Everything`.

These libraries will form the basis for how to make some general purpose use
`Item`s like key_and_lock mechanics. In the meantime the `Aspect`s and/or
`Qualities` can be worked out to see where they fit in `Everything`.

## See also

* info