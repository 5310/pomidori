# Pomidori

A fancy-smanshy web-based Pomodoro timer and personal learning exercise.

### Update

The project is now wrappable with Cordova/Phonegap. Here's a [Phonegap Build...build](https://build.phonegap.com/apps/479394/share).

Nothing else has changed.

### Why is this?

I love the [Pomodoro](http://en.wikipedia.org/wiki/Pomodoro_technique) “technique” and the ease of [web-based timers](http://ddg.gg/?q=pomodoro+timers).
And since none of the existing crop of web-based pomodoro timers have all the features I want, and because I could use the exercise, I’m making one myself!

[And this is it](http://5310.github.com/pomidori). Pretty huh? And it does, or will in the eventual future, feature the following:

### Features, Present and Future

-   Open web standards FTW! No pesky flash for audio.
-   Pretty visuals using HTML+Javascript+CSS, and [Processing.js](http://processingjs.org/)! Throw in your own favorite JS library too!
-   Canvas visualization as favicon!
-   No cookie-clutter, reads settings off the url. This is undocumented at the moment, and is a bit geeky without UI.
-   Url can be bookmarked with custom settings.
-   Eventually, when a proper UI is implemented, it'll be possibly to pause resume and continue timers across sessions...maybe.
-   Skinnable! Although only for those willing to geek a bit... And skin changing currently works only with URL-passing.

And I also love the [color green](http://en.wiktionary.org/wiki/midori), among others.

### How do I configure this?

For now, via variables passes along with the URL. This is a _feature_ people, don't complain. I expect to add a settings GUI [soon](https://github.com/5310/pomidori/issues/2)...

For now, use the URL, would you? It's easy:
If the url for Pomidori is `http://5310.github.com/pomidori` simply add `?var1=val1&var2=val2` where `var1`, `var2` and so one are variables and `val1`, `val2` are their values.

The variables that can be passed are as follows:

-   `w`
    **Work duration in minutes**: The first portion of a Pomodoro-based timer's clock. Usually this lasts for 25 minutes, which is exactly the default value!

-   `b`
    **Break duration in minutes**: The second portion of a Pomodoro timer; the break. The default is 5, to compliment the twenty-five minutes of work.

-   `r`
    **Number of repeats**: This represents the number of times the work+break cycle repeats. By default it's 0, does not repeat. If set to a positive whole number, like say 4, the work+break cycle will repeat four times and then stop. If the value is set to a negative number the configuration will repeat indefinitely. Of course, you can always restart the current config by refreshing the page, (or clicking on the big digital countdown clock for the default skin.)

-   `s`
    **Skin name**: By passing the skin name (which is by decree without spaces) you would make Pomidori not load the default one (called "kimodori") and load that one instead. Of course, this is when there _is_ a skin by that name, if not, you'll face the awesome vastness of a blank page.

-   `t`
    **Start time of the countdown in milliseconds since epoch**: This is a bit tricky. With this, you can set the supposed start-time of a session, which would mean that instead of restarting, the clock would continue on counting down from a pre-set interval. This can be useful if you want to continue or bookmark a long countdown duration without having it reset every time. But you'd have to get the "milliseconds from epoch" (simply `new Date().valueOf()`) yourself, as without a GUI implemented there isn't any other to do so.

And, as en example, try this:
[`http://5310.github.com/pomidori?w=10&b=5&r=4&s=rozudori`](http://5310.github.com/pomidori?w=10&b=5&r=4&s=rozudori)

### How do I skin it?

Are you squeamish?

No really, can you handle a knife and not feint at the sight of Processing code? Okay, I'm pushing it.

Skinning is a simple enough affair that involves creating a folder with an unique name (bland, without spaces) and including at the very minimum, a `style.css`, and two P.js sketches titled `viz.js` and `fav.js`. And any other file you would like to add, like audio alerts, images, even more sketches, etc.

What you _do_ with the said files is [another matter](https://github.com/5310/pomidori/issues/1).

---

### Some Useful References

- [P.js Docs](http://processingjs.org/reference)
- [MDS JS Docs](https://developer.mozilla.org/en/javascript)
- [JSconsole](http://jsconsole.com/)
- [Dynamic Favicons by Remy Sharp](http://remysharp.com/2010/08/24/dynamic-favicons/)
- [GH-Pages as Master by ChrisJacob](https://gist.github.com/833223)
- [SetInterval Listeners with JS  by PixelMech](http://evolt.org/node/36035/?cfid=3686399&cftoken=90477234)
- [Dynamic Canvas Favicon at Defender of the Favicon!](http://www.p01.org/releases/DEFENDER_of_the_favicon/)
- [Transparent Canvas with P.js on Stackoverflow](http://stackoverflow.com/questions/2256110/is-it-possible-to-create-transparent-canvas)
- [HTML5 Audio Element](http://dev.w3.org/html5/spec/video.html#attr-media-preload)
