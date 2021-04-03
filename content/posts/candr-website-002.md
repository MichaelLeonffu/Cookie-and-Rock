---
title: 'Tailwindcss and Next.js'
series: 'CandR-website 002'
author: 'Michael Leonffu'
date: '2020-03-26'
description: 'Using tailwindcss to make a pretty website and components.'
---

# CandR-website: 002 "Tailwind and Next.js"

*By Michael Leonffu, March 26, 2021 00:36*

Using [tailwindcss](https://tailwindcss.com) to make the website pretty and
have good looking components. *From the POV of a beginner*.

- [From Bluma to tailwindcss](#from-bluma-to-tailwindcss)
- [Installation](#installation)
- [Components](#components)
- [Installing a navbar](#installing-a-navbar)
- [Why are some things broken](#why-are-some-things-broken)
- [Adding functionality to navbar](#adding-functionality-to-navbar)
- [Transitions Transformations/Animations](#transitions-transformationsanimations)
- [Conclusion](#conclusion)
- [See also](#see-also)

## From Bluma to tailwindcss

[Bluma](https://bulma.io) was my original choice for making everything pretty.
It was inspired by my friend's [website](https://www.alexsmbaratti.com).
But after looking through the tutorials given by [Next.js](https://nextjs.org)
I decided to use tailwindcss.

## Installation

It was as easy as following the tailwindcss
[installation guide](https://tailwindcss.com/docs/guides/nextjs).

## Components

It seems like the main idea with [React](https://reactjs.org) is to use
something called components. A developer could define a component then use it
in different html files. These components can have parameters as well.

For example consider this component in `/components/layout.jsx`.

```jsx
export default function Layout({ children }) {
  return (
      <div>
        Some layout this is...
        <main>{children}</main>
      </div>
  )
}
```

Then you could use it in another file such as `/pages/index.jsx`.

```jsx
import Layout from '../components/layout'

export default function Home({ data }) {
  return (
    <div>
        <Layout>
            This is a child.
        </Layout>
    </div>
  )
}
```

***Note**: the above is untested.*

These components help make everything more modular and also reduces the need to
copy and paste repeated html such as a navbar. More importantly tailwindcss
makes use of this in order provide 
[really nice looking components](https://tailwindui.com/preview)
which are easy to install.

## Installing a navbar

tailwindcss provides a nice navbar, which is what I'll be using in order to
better learn both tailwindcss and html/css with React. I'll be using the
[free navbar](https://tailwindui.com/components/application-ui/navigation/navbars)
by tailwindcss.

Playing around with the demo you can see that there are features such as
-   Hover (over the buttons)
-   Responsiveness (resize the screen)
-   On-click dropdowns (profile)
-   Toggle dropdown menu on small screen

In order to install it, I created a file called `navbar.jsx` in the
`components` directory. Then I import it into `index.jsx`.

```jsx
import Navbar from '../components/navbar'

export default function Home({ data }) {
  return (
    <div>
        <Navbar/>
        Some content below the navbar.
    </div>
  )
}
```

*I'm not sure if it would be better to put "some content..." as a child of
navbar or just below it.*

**But that's not all!**

The onclick features are not working! Clicking on the profile or the dropdown
button for small screens, both don't work.

## Why are some things broken

*Why does Hover and Responsiveness work?*

That's because those only need the CSS to work. e.g while the event (hover) is
activated then it changes it's css. Or while the screen is a smaller size then
the menu is changed. Basically there is some css magic which is controlling
these styles dynamically.

```html
    <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</a>
```

Notice the syntax of `hover:text-white`. It's saying that if `hover` then add
`text-white` to the class. So it's easy to see why hovering makes the button
white but not hovering returns it to default.

*So how does the whole navbar change at different screen sizes?*

That one is more elaborate. Imagine making 3 navbars for 3 sizes of screens.
Each one can be toggled to show or hide. So our trigger is the size and the
result we want is show or hide. Consider the navbar that has 2 svgs: logo
and logo name.

```html
<img class="block lg:hidden h-8 w-auto" src="https://img/logo.svg" />
<img class="hidden lg:block h-8 w-auto" src="https://img/logoname.svg" />
```

***Note**: `logo` is a square logo, `logoname` is the same `logo` but followed
with the name of the logo i.e `logo`: 🥲 and `logoname`: 🥲my_company*

There is something funny looking about the `block` and `hidden` class.
Originally I had thought that some event (e.g resize) updates a state called
`block` or `hidden` and they toggle. After some testing I realized these aren't
user defined values. They're actually CSS classes
[block and hidden](https://www.w3schools.com/css/css_display_visibility.asp).

Then everything started to make sense. While one toggles on the other toggles
off. Notice that logo is `block` but on a `lg` trigger it becomes `hidden`.
The logoname is the opposite operation for the same trigger. As a result
only one will show at a time. The `lg` trigger is part of tailwindcss, read
about it in their
[Responsive Design](https://tailwindcss.com/docs/responsive-design) guide. It
is very helpful!

## Adding functionality to navbar 

Now that we know how hover and responsiveness works how come onclick menus do
not work? Since clicking should retain a state i.e if you click on the profile
then the menu should open, if you click away it should close. And a state is
not really the same as a "trigger". ***Note**: I'm not sure what it is actually
called so I have been calling it trigger*.

These states have to be saved someplace in the `script`. It's a React problem
now.

```html
<!-- Mobile menu, show/hide based on menu state. -->
```

*This comment can be found near the bottom of the navbar component.*

It's kinda hinting that there is something we need to do with a `state`. We
need to show/hide the menu with the change of a `state`. And something needs
to change the `state`. And after searching for a long time I found something
which made sense on
[this forum](https://forum.freecodecamp.org/t/an-easy-way-to-change-css-in-react/326708/5).

```jsx
handleClick() {
    this.setState(({ boxColor }) => ({
        boxColor:  this.getRandomColor() // pretend it works
    }));
}

render() {
    return (
        <div>
            <div className="box" style={{ backgroundColor: this.state.boxColor }} />
            <button onClick={() => this.handleClick()}>Click for random color</button>
        </div>
    );
}
```

*Small part of the same code someone provided on that forum*

You can see there is `onClick` which calls a function that then changes a state
which then is read by the `box` to change it's style. Then after reading more
about these features I ran into this
[helpful post](https://dev.to/andrewespejo/how-to-design-a-simple-and-beautiful-navbar-using-nextjs-and-tailwindcss-26p1)
on the same topic. Which does something similar but much more clean.

```jsx
// JSX
const [active, setActive] = useState(false);

const handleClick = () => {
    setActive(!active);
};

...
 <button className=' inline-flex p-3 hover:bg-green-600 rounded' onClick={handleClick} />
<div className={`${active ? '' : 'hidden'} lg:inline-flex`} />
```

*I removed a lot of the code but kept the important parts.*

This is another way of doing the same thing. The `useState` is part of React's
[hooks](https://reactjs.org/docs/hooks-intro.html). Using this we can show
or hide the menu for the dropdown! Using a button click we can change a `state`
then read from the state to change the `classes`.

## Transitions Transformations/Animations

We can show and hide the menu, but it's not as pretty as it is in the demo.
Thats because we aren't using the
[transitions and transformations](https://tailwindcss.com/docs/transition-property).

```html
<!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
    From: "transform opacity-0 scale-95"
    To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
    From: "transform opacity-100 scale-100"
    To: "transform opacity-0 scale-95"
-->
```

*A hint provided by the navbar from tailwindcss.*

It seems like they have recommendations on what values to use for the
transitions and transformations. But long story short, and after reading this
[forum post](https://dev.to/mmccall10/tailwind-enter-leave-transition-effects-with-stimulus-js-5hl7)
on using [el-transition](https://www.npmjs.com/package/el-transition) it seems
that React would require a lot of effort to solve this problem. I'll save you
the time and just tell you not to worry about it for now.

## Conclusion

Personally my goal is to make a skeleton of a website which later I can add
more features and fill it in with smaller time commitments. I don't want to
solve every problem, I only want to survey the land and learn as much as I can
so I can slowly add onto it in the future.

I realized that I really need to take a step back and learn React. My friend,
Cameron, a front-end dev, told me that "once you understand props and state
everything makes much more sense". And I'm sure that's the case. So I'm going
to go do that next.

## See also

* [tailwindcss Hover/Focus](https://tailwindcss.com/docs/hover-focus-and-other-states)