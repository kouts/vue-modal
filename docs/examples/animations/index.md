<h2>Animations</h2>

vue-modal comes with a fade-in/fade-out animation (250ms duration by default) for the modal and the modal backdrop.
It is also designed so that you can put your favorite animations using any CSS animation framework like Animate.css, Anicollection etc

You can define the base animation class (usually this is the "animated" class) by setting the `wrapper-class` prop.
Then define your intro and outro animation classes for the modal, using the `in-class` and `out-class` props accordingly.

The same concept applies to the modal backdrop as well.
You can also set the intro and outro animation classes, using `bg-class` for the base animation class
and `bg-in-class`/`bg-out-class` props for the animation classes.

<vue-example file="animations" />