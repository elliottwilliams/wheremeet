Wheremeet
========

Wheremeet is an mobile web application that helps you and your friends find a place to meet up at. Currently, it's
customized to work for the Purdue University dining courts.

Contributions
-------------

* Any new features should be documented as issues the with "enhancement" label.
* Work in feature branches corresponding to these issues. Name your branch using the convention `issue#-short-description`.
* Submit pull requests from your feature branch back to master when you're done.

Background
----------

![Wheremeet mockup](http://cl.ly/image/1j0T3t2i3p1a/wearmeat-mockup.jpg)

Clay and I and our friends are all part of the Purdue Dining Court system, and we usually get lunch and dinner together. We have a group message thread where we argue about which of the 5 dining courts to go to:

![Group message dining](http://cl.ly/image/3L0J1e3Q1X03/Screen_Shot_2014-10-19_at_1_30_31.png)

We decided to build Wheremeet as a way to make the dining-court selection process simpler. **With Wheremeet, one person can easily see where their friends are, and which dining court is closest to all of them.** 

Our goal is to make it easier for a group of friends to choose a convenient dining location, and to do so quickly and without much overhead. Using Wheremeet works like this:

1. One person wants to see where they & their friends should go to lunch. That person goes to http://wheremeet.me and presses "Create". They're given a unique group URL to send to their friends. (it looks like "http://wheremeet.me/?id=123456").
2. The creator sends this URL to their friends via their messaging platform of choice.
3. Friends go the the Wheremeet URL. They see themselves and their other friends on a map, along with all dining courts and a nearby dining court that everyone should go to.

The app is implemented in NodeJS on the backend, and AngularJS / Ionic on the frontend. We use WebSockets via Socket.IO to communicate between the server and all clients. It's wonderful since we can send JS objects through the wire without worrying about a serialization format.

One of the coolest things about this app is that it's surprisingly extensible. As I'm writing this description, Clay is adding creation-time options for the person creating a Wheremeet URL just by swapping out a couple functions on the backend. Since the frontend is written in Ionic, we're a few shell commands away from generating Android & iOS versions of our app. And the app, while built with the Purdue dining courts in bind, could support any type of destination by editing a single JSON file.

But of course, the best part of this whole project is the [Lady Gaga pun](https://upload.wikimedia.org/wikipedia/en/9/9f/Lady_Gaga_meat_dress.jpg) in the name "Wheremeet". Need I say more.
