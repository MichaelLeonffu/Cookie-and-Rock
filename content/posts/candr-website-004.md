---
title: 'Nginx Reverse Proxy'
series: 'CandR-website 004'
author: 'Michael Leonffu'
date: '2020-03-27'
description: 'Setting up Nginx reverse proxy and SSL on rpi.'
---

<!-- # Nginx Reverse Proxy

*CandR-website: 004*

*By Michael Leonffu, March 27, 2021 21:34* -->

### Introduction

While [Next.js](https://nextjs.org) is a webserver you need to make it
accessible to the outside world for anyone to see it. Opening a port and
port-forwarding is enough to make that happen. But if you want more control,
flexibility, and abstraction then [Nginx](https://www.nginx.com) can help.

Nginx will be the server which users connect to. Then it will forward their
connections to our webserver, which can be on any device including the same
computer. Nginx can also force a SSL (HTTPS) connection with the user and
save you the headache of installing SSL for Next.js.

*If the above is too complicated then you can use [Vercel](https://vercel.com).
From my understanding, they host Next.js sites and have SSL. Seems like a good
deal especially if you can not use port 443 or port 80.*

### Setup

It may seem intimidating at first, but at the end of the day it is much easy
than people make it seem. That is because historically it was actually
difficult.

For this tutorial I will be using:
-   (RPI) Raspberrypi: Nginx server.
-   Ubuntu computer: Next.js server.
-   Port forward 80 and 443 to RPI.
-   RPI can find Ubuntu computer on network.
-   Domain name pointing to your [external IP](https://whatismyipaddress.com).

***Note**: if you are using a server host then check for your server host's
external IP address. Your domain should also be forwarding to that address.*


If you have a raspberrypi and want to set it up, check out this guide!

**(HAHA got you, it's not ready yet! fix me later.)**

## Next.js

This tutorial assumes that you have Next.js installed already and it is running
in the same network or device that you will be using Nginx on.

If you do not have Next.js installed follow this
[startup guide](https://nextjs.org/learn/basics/create-nextjs-app). And get to
the point where you can use `npm run dev`.

## Nginx

Nginx is really fast and highly configurable, but the real reason I chose to
use it was because I had it installed already.

The following commands will require `sudo`.

### Installing Nginx

Update and install Nginx:

    sudo apt-get update
    sudo apt-get install nginx

You can also check to make sure you have the right version installed.

***Note**: for this tutorial, there is no need for a PHP server, vanilla
Nginx is all that is needed.*

## Reverse Proxy Nginx Server

I recommend skimming through this
[nginx guide](https://nginx.org/en/docs/beginners_guide.html) to become
familiar with what the config files look like. Then follow **the first half** of this guide on
[Configure a Nginx HTTPs Reverse Proxy](https://www.scaleway.com/en/docs/how-to-configure-nginx-reverse-proxy/#-Installing-and-Configuring-Nginx).

*I will be honest and say that this tutorial is really just following that
one.*

If you did the above steps correctly and your Next.js is running then you
should be able to see a proxy already.

    nginx -s reload

On your browser navigate to your domain name and it should take the proxy and
send you to your Next.js instance.

If that does not work then debug in this order:
1.  Check if you can use your browser to navigate to your Next.js instance.
    1.  Try it on the compute running the Next.js.
    2.  Make sure you have the correct port.
2.  Try connecting to the running Nginx instance like the Next.js instance.
    1.  Debug this one the same way.
    2.  If it does not proxy then fix that, read the guides.
3.  Use your domain to access the Nginx.
    1.  Check to make sure your domain name has propagated it's IP.
    2.  Make sure you port forwarded the correct port (80, 443).
    3.  If it does not work, undo everything we did in Nginx then try again,
        there will be at least a static `index.html` file there.
4.  Could be some network internal errors, good luck!

## SSL with certbot

Setting up SSL with [certbot](https://certbot.eff.org) is different than in the
guide.

Go to certbot choose your provider. I chose to install it myself because I am
not using a hosting provider.

It will then ask for where your HTTP website is running, this is the Nginx
server. For my RPI I chose "My HTTP website is running `Nginx` on `Debian 10
(buster)`.

From there follow the
[instructions](https://certbot.eff.org/lets-encrypt/debianbuster-nginx).

*I went ahead and installed
[snapd](https://snapcraft.io/docs/installing-snap-on-debian).*

For step 7, choose to install automatically which is the:

    sudo certbot --nginx

This single command will save us all the headache of installing SSL.

Some issues you might run into is something like "failed to verify". I found
that turning off the Nginx server helps certbot, mostly because the port is
bound to Nginx and certbot uses that to verify the domain owner.

    nginx -s quit

At this point you should have SSL working!

### Conclusion

Wow now you have an amazing HTTPs website made by and easy Nginx and an easy
Next.js instance! No complicated SSL with Next.js or anything. Furthermore if
you want to run multiple instances of a website or other servers like an API
server then it is really easy to add it in with the reverse proxy!

### See also

-   [Another guide](https://gist.github.com/Kocisov/2a9567eb51b83dfef48efce02ef3ab06)
-   [Nginx docs](https://www.nginx.com/resources/wiki/start/)