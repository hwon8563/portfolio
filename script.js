
class Star {
  constructor(xPos, yPos, radius) {
    /* 
      properties are defined so a persistent value can be used within the class instance
     the following properties are initialised with the values passed into the constructor
    */
    this.x = xPos;
    this.y = yPos;
    this.r = radius;

    /* 
      This property will hold the circle SVG element so we can add
      the <animate> elements to it later
    */
    this.svgElement;

    /* 
      this.animDuration determines how
      fast the particle will blink
    */
    this.animDuration = randomNum(3, 5);
  }
  
  /*  
    This method creates a circle element
    then appends to our SVG element
    then calls the addAnimation() method
  */
  drawStar() {
    this.svgElement = makeCircle(this.x, this.y, this.r);
    svg.appendChild(this.svgElement);

    this.addAnimation();
  }

  /*
    This method creates an animate element for the 'r' attribute of the circle
    and appends it to this.svgElement which contains our circle element.
    <animate> reference: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animate
  */
  addAnimation() {
    let animElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');

    /*
      The <animate> element uses an attribute called 'attributeName' 
      where we specify which attribute we want to animate.
      In this case, we want to animate 'r' of our circle element
      https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/attributeName
    */
    animElement.setAttribute('attributeName', 'r');

    /* 
      <animate> uses the 'values' attribute where we specify
      what values we're giving to the animated property in 'attributeName'.
      In this case, we want the 'r' property to animate from 'this.r' to '0' then back to 'this.r'
      https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/values
    */
    animElement.setAttribute('values', `${this.r}; 0; ${this.r}`);

    /*
      The 'dur' attribute of the <animate> element 
      specifies how long it will take (in seconds) to go from
      one value to the next, as specified in the 'values' property above.
      Here we are setting the duration to 'this.animDuration'
      https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dur
    */
    animElement.setAttribute('dur', `${this.animDuration}`);

    /*
      'repeatCount' specifies how many times we repeat the animation.
      Here we are repeating the animation indefinitely
      https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/repeatCount
    */
    animElement.setAttribute('repeatCount', 'indefinite');
    this.svgElement.appendChild(animElement);
  }

}

/*
  This function creates an array of instances from the Stars class
  Input: 
    num - the number of instances or stars we want on the screen
*/
function createStarsArray(num) {
  let starInstances = [];

  for (let i = 0; i < num; i++) {
    // Initialise the star positions to be randomly on the SVG canvas
    let starX = randomNum(10, width);
    let starY = randomNum(10, height);

    /* 
      Multiplying width by some number will allow
      particleSize to scale with the width of the canvas
    */
    let starSize = randomNum(width * 0.0001, width * 0.0012);

    // Push or add to the end of the starInstances array
    starInstances.push(new Star(starX, starY, starSize));
  }

  return starInstances;
}

// Initialise width to be the width of the browser window
let width = window.innerWidth;
// Initialise height to be the height of the browser window
let height = window.innerHeight;
// Using window.innerWidth/window.innerHeight allows our 
// SVG canvas to accommodate the size of our browser

// Get reference to the SVG element in our html file
const svg = document.getElementById("base-svg");

// Set the attributes of our SVG element
svg.setAttribute("width", width);
svg.setAttribute("height", height);
svg.setAttribute("style", "background-color: black");

// Call our createStarsArray() function to create the
// array of Star instances
let stars = createStarsArray(10000);

// For every Star instance in our array
// call the drawStar() method
for (let star of stars) {
  star.drawStar();
}