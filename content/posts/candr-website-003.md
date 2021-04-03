---
title: 'Front page image'
series: 'CandR-website 003'
author: 'Michael Leonffu'
date: '2020-03-27'
description: 'Making a pretty front page with svg!'
---

# CandR-website: 003 "Front page image"

*By Michael Leonffu, March 27, 2021 00:00*

Making a pretty looking front page starts with a full width image. But
eventually a really good looking pattern svg.

- [Inspiration](#inspiration)
- [Image with full width](#image-with-full-width)
  - [Container that is screen width](#container-that-is-screen-width)
  - [Image that fills the container](#image-that-fills-the-container)
- [Svg pattern](#svg-pattern)
  - [Hero Patterns](#hero-patterns)
  - [Starting with 1 tile](#starting-with-1-tile)
  - [SVG patterns with CSS](#svg-patterns-with-css)
  - [CSS background-image](#css-background-image)
- [Real SVG patterns](#real-svg-patterns)
- [Adding a gradient](#adding-a-gradient)
- [Fixing the height](#fixing-the-height)
- [Final notes and Conclusion](#final-notes-and-conclusion)
- [Next steps](#next-steps)
- [See also](#see-also)

## Inspiration

If you look at [discord](https://discord.com) there is an image with text on
it. The image goes off the page so as you resize it it will show more of the
image.

## Image with full width

*It was a headache to figure out.*

Throwing random bits of code together didn't solve the problem, I had to
actually try to learn how to do html/css/tailwindcss. By breaking it down into
smaller steps it became easier.

### Container that is screen width

First we have to make sure there is a container that can contain the image and
the text we want on top. That container should be the full width.

```html
<div class="box-border border h-96 w-screen overflow-hidden"></div>
```
The important part here is the `w-screen`. I added the border so that we can
easily see that it does take the full width of the screen.

### Image that fills the container

Next we need an image which should fill the container but not change in size.
This image also must be centered. *There is a fatal aesthetic issue here but I
will address that later.*

It seems like adding `mx-auto` makes and `img` centered according to a
[stackoverflow answer](https://stackoverflow.com/questions/62347446/having-issues-trying-to-center-an-image-using-tailwinds-containers-invisible-p).

```html
<img class="mx-auto w-full" src="/meow.png"/>
```

The tailwindcss docs for [container](https://tailwindcss.com/docs/container).

Adding `w-full` makes it take up the full width. Also the `overflow-hidden`
makes sure that the image stays in the container, otherwise it would spill
out.

## Svg pattern

Well. If you try the code above the issue is that we get a really big image
and it looks bad on any screen size. After looking at other examples I realized
people use patterns, gradients, or solid colors.

*The following are many ways to do it **wrong** but important to know.*

### Hero Patterns

If you don't know what [Hero Patterns](https://www.heropatterns.com) is then
check it out. It is an svg which can be placed in repeating tiles to form a
nice looking pattern.

I basically want to make
[this svg example](https://svengau.github.io/tailwindcss-hero-patterns/).
And while it is something I could install, I figured that I would rather make
it myself than use someone's library.

### Starting with 1 tile

Originally I had no idea it was supposed to be tiled, I started by downloading
an svg sample from Hero Pattern, then using it in `img`.

```html
 <img class="mx-auto w-full" src="/graph-paper.svg"/>
 ```

Unfortunately this stenches the pattern to the full width. This was my
motivation to learn how to make patterns.

### SVG patterns with CSS

The first reference I found on
[someone's github](https://iros.github.io/patternfills/) was to use CSS to
make the patterns for SVG. I copied the code then realized that using Hero
Pattern inline would not work due to a combination of `"` and `'`. I quickly
moved on.

### CSS background-image

The next idea was to make it a background image then use the background repeat.
I would make it a background using this
["css trick"](https://css-tricks.com/using-svg/), then I would repeat with
[tailwindcss's background repeat](https://tailwindcss.com/docs/background-repeat).

Unfortunately... Using "css trick" didn't work because of inlining. Even
referencing the file through the url could cause an error. I believe it inlines
the file information when the url is called.

## Real SVG patterns

After a long search I found something promising. It is to make patters with the
SVG itself according to this
[post](https://webdesign.tutsplus.com/tutorials/how-to-use-svg-patterns-as-backgrounds--cms-31507).

The idea is to define a pattern in the SVG then use a `fill` with that pattern
via the SVG interface.

```html
<svg width="100%" height="100%">
    <defs>
        <pattern id="polka-dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle fill="#bee9e8" cx="50" cy="50" r="25" />
        </pattern>
    </defs>
     
    <rect x="0" y="0" width="100%" height="100%" fill="url(#polka-dots)"></rect>
</svg>
```

*Pulled from the reference.*

All I have to do now is exchange out the pattern data. Which is demonstrated
in the reference. The pattern data can be found as the `path` in the Hero
Pattern, per pattern.

The pattern would be in the original `div` container we made.

## Adding a gradient

While searching for a solution I found out about gradients and how to use them
with patterns from this
[stack overflow post](https://stackoverflow.com/questions/28411381/svg-pattern-and-gradient-together).

Long story short, you can put more than one thing in the `defs` in `svg` tag.
For example I made a linear gradient.

```html
<linearGradient id="myLinearGradient" gradientTransform="rotate(45)">
  <stop offset="5%" stop-color="#F59E0B" stop-opacity=".9" />
  <stop offset="95%" stop-color="#F87171" stop-opacity=".9" />
</linearGradient>
```

It has two colors and a
[linear gradient](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient)
from the top left to the bottom right. To use it simply add it like the
original pattern, by its id. Inspired by this
[www3 tutorial](https://www.w3schools.com/graphics/svg_grad_linear.asp).

```html
<rect x="0" y="0" width="100%" height="100%" fill="url(#myLinearGradient)" />
<rect x="0" y="0" width="100%" height="100%" fill="url(#thing-to-pattern)" />
```

Rather than having that static pattern which got boring very quickly, this
makes it look more alive! (With "little" effort!)

## Fixing the height

Looking back at the examples, I realized that the height of our image isn't
as high as other websites. I want to increase the size to around 1400px, which
is what [dropbox](https://www.dropbox.com/) uses.

But tailwindcss has limited selection of
[heights](https://tailwindcss.com/docs/height). I am surprised that there is
such a limited selection. And rather than making an inline `style`, which
somehow breaks everything, we have to add a custom height through the
tailwindcss framework.

**Gatcha! I got stuck here and called it a day!**

*But here are some references to try to solve it:*

-   [stack overflow "pixel perfect"](https://stackoverflow.com/questions/54618144/tailwind-css-how-to-code-pixel-perfect-design)
-   [tailwindcss configuration](https://tailwindcss.com/docs/configuration)

***Note**: I tested the first "pixel perfect" solution, while it seemed to work
everything became really slow. I imagine that it's not the right way to make a
custom height.

## Final notes and Conclusion

We have a nice looking front page image now. But have you tried to resize the
page? It's quite slow compared to discord. I believe it has to do with
generating the pattern SVG dynamically. Discord uses one image only so it is
just out of sight when not in the container.

After many hours of poking around I feel like I've learned a little more.
Mostly I had to try to learn about `flex` and `containers`. Some helpful
references and things I found:
-   [CSS tricks flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
-   [CSS tricks center](https://css-tricks.com/centering-css-complete-guide/)
-   [tailwindcss margin auto](https://tailwindcss.com/docs/margin)
-   [tailwindcss flex](https://tailwindcss.com/docs/flex)
-   [tailwindcss object-fit](https://tailwindcss.com/docs/object-fit)
-   [tailwindcss colors](https://tailwindcss.com/docs/customizing-colors)
-   [tailwindcss cheat sheet](https://nerdcave.com/tailwind-cheat-sheet)

## Next steps

Next will be about getting text and other objects onto that image.

Starting with this
[www3 tutorial](https://www.w3schools.com/howto/howto_css_image_text.asp).


## See also

Some nice looking SVG patterns:
-   [SVG Patterns Gallery](https://philiprogers.com/svgpatterns/)
-   [geo_pattern](https://github.com/jasonlong/geo_pattern)
-   [patternlibrary](http://thepatternlibrary.com/)
