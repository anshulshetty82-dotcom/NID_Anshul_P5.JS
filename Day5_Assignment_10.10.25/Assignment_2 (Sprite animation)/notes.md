## Assignment_day 5 - 2D Sprite animation.


The goal of this assignment was to capture the animation from an existing sprite of the internet. I wanted to make a platformer type scene, with a hard edge ground plane on which I wanted my character to move on.

The character I chose was Cleopatra as it reminded me of one of the champions from my favourite game - league of legends. I also found the sprite animation very interesting as the character does not have legs (snake body) she has to crawl to walk like a snake's movement.

The sprite sheet initially downloaded had an uneven number of animations, for example - walk animation had around 10 frames while the attack animation had only about 5 frames. To solve this problem (considering the array system we use in the code - it's ideal to have a set number of columns and rows. ), the sprite sheet had to be edited to fill in the blank animations
having an equal number of columns for each action (or key press/based on the input).

Care had to be taken while making the edited sprite sheet, considering the animation placement in the sheet. If the animations were placed a pixel off there would not be seamless animation transition/ the character would flicker while the loop is running.

> The array system made the preload and selection of the sprites very simple by dividing it into rows and columns.
> Each row contains all the animations - required for a particular action.
> We can cycle through the columns to initiate the start of animation based on the actions required which is in turn an if statement based on the keyisdown function.

![bg](A5.2.png)


