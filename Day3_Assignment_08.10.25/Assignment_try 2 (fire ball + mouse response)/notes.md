># Assignment_day 3_Generative art using for loops.
## _The_ **Interactive pop candy fireball**.


The idea for this piece was to have a kinetic/energetic circle, which people can interact with by moving the mouse. While I was experimenting with the frame rate and a few other parameters, the circle when moved, followed the cursor leaving behind a trail which closely resembled a 8bit style fire ball asset used in games. I wanted to experiment with colors used in old arcade machines from the 90s, the arcade games art style during that time used high contrast, bright and low saturation colors giving the games a certain energetic feel to it.


Construction of the pattern, the idea was to have two circles running through the for loop in a grid (similar to 10 print). Both the circles would randomly move on the grid. This however did not give me the feeling I was looking for.


The happy accident - in one of my test iterations, i accidently moved the background inside the set-up. What this did was it would permanently draw one of the circles on the back-ground, leaving behind the diamond negatives and the second circle randomly draws over the background circle.


Once I fixed the colors, I had to figure out how to move the second random circle according to mouse movement using the distance function(more about it in the code section). The second circle has two parameters - 1) proximity around the mouse - use candy red for the circles 2) anything else other than the proximity - some color with reduced alfa value - this is in contrast between the circle inside mouse proximity and the rest of the canvas.


## _In the lense of the_ **code**.


The challenging part was to figure out how to control the fire ball with the mouse movement. To do this I had to learn about the distance function. The distance function calculates distance between any two coordinates on the canvas, by using this and mouseX,mouseY, we can make a circle around the cursor and assign different parameters to color.  





