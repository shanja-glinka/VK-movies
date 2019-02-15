/**
 * Removes variable types in the console
 * @param  {any} value - Variable of semi-couples any types of data.
 */
function varDump(value) {
  if (Array.isArray(value)) {
    console.log(value);
    for (var val in value) {
      varDump(value[val]);
    }
    return;
  }
  if (value === null) {
    console.log("Type :", typeof (value), ", Value :", value);
    return;
  }
  if (typeof (value) === "object") {
    console.log(value);
    for (var val in value) {
      varDump(value[val]);
    }
    return;
  }
  console.log("Type :", typeof (value), ", Value :", value);
  return;
}

/**
 * Deletes sublines {string} v  from line {string} l
 * @param {string} v - value from which will be similar words will be removed
 * @param {string} l - from which value will be will be removed from the first value
 */
function cutSubline(v, l) {

  if (l === "undefined") {
    return v;
  }

  let c = "";

  if (v.indexOf(l) > -1) {
    c = v.replace(l, "");
    return c.trim();
  }

  if (v.indexOf(" ") > -1) {
    v += " ";
    if (l.indexOf(" ") > -1)
      l += " ";

    let buf1 = v.split(" ");
    let buf2 = l.split(" ");

    for (let i = 0; i < buf1.length; i++) {
      for (let j = 0; j < buf2.length; j++) {
        if (buf1[i] === buf2[j]) {
          buf1.splice(i, 1);
        }
      }
    }

    c = buf1.join(" ");
  } else return v;
  return c;
}

/**
 * Deletes spaces if > 1
 * @param {string} value 
 */
function removeSpace(value) {
  //value = value.replace(/\s+/g, "  ").trim();
  value = value.split(/\s* \s*/);
  var tm = [];
  for (let i = 0; i < value.length; i++) {
    if (value[i] !== " " && value[i] !== "") {
      tm.push(value[i]);
    }
  }

  return tm.join(" ");
}

/**
 * The array will transform to a string, including its investments
 * @param {Array} arr 
 * @param {String} l - separator
 */
function atos(arr, l) {

  let c = "";
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      c += atos(arr[i], l) + l;
    } else {
      c += arr[i];
      if (i < arr.length - 1) c += l;
    }
  }

  return c;
}


/**
 * Return direct children elements.
 *
 * @param {HTMLElement}
 * @return {Array}
 */
function elementChildren(element) {
  var childNodes = element.childNodes,
    children = [],
    i = childNodes.length;

  while (i--) {
    if (childNodes[i].nodeType == 1) {
      children.unshift(childNodes[i]);
    }
  }

  return children;
}


/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @param {string} string - source string
 * @param {string} separator - source string
 * Deletes all copies of words in line. Breaks into the massif on a divider 
 * and looks for to an identical lines. Returns the collected array in 
 * string
 */
function removeСopies(string, separator) {
  var a = string.split(separator);
  for (var q = 1, i = 1; q < a.length; ++q) {
    if (a[q] !== a[q - 1]) {
      a[i++] = a[q];
    }
  }

  a.length = i;
  return a.join(separator);
}


Object.prototype.isEmpty = function () {
  for (var key in this) {
    if (this.hasOwnProperty(key))
      return false;
  }
  return true;
}


Object.size = function (obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};




function isEmptyObject(obj) {
  if (isNull(obj))
    return true;

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      return false;
    }
  }
  return true;
}

function isNull(obj) {
  return obj === null ? true : false;
}

function spliceArrays(Ob1, Ob2) {
  var buf_result = [];

  for (var i = 0; i <= Ob1.length; i++) {
    if (i != Ob1.length) {
      Array.isArray(Ob1[i]) ? buf_result = spliceArrays(buf_result, Ob1[i]) : buf_result.push(Ob1[i]);
    }
  }
  for (var i = 0; i <= Ob2.length; i++) {
    if (i != Ob2.length) {
      Array.isArray(Ob2[i]) ? buf_result = spliceArrays(buf_result, Ob2[i]) : buf_result.push(Ob2[i]);
    }
  }
  return buf_result;
}


function toOneDimensionalArray(Ob) {
  var buf_Ob = [];
  for (var j = 0; j <= Ob.length - 1; j++) {
    Array.isArray(Ob[j]) ? buf_Ob = spliceArrays(buf_Ob, Ob[j]) : buf_Ob.push(Ob[j]);
  }
  return buf_Ob;
}


function isArrayEqual(Ob1, Ob2) {
  if (!Array.isArray(Ob1) || !Array.isArray(Ob2) || Ob1.length != Ob2.length) {
    return false;
  }
  Ob1 = toOneDimensionalArray(Ob1);
  Ob2 = toOneDimensionalArray(Ob2);
  for (var i = 0; i < Ob1.length; i++) {
    if ((Ob1[i] !== Ob2[i]) && (!isNaN(Ob1[i]) && !isNaN(Ob2[i]))) {
      return false;
    }
  }
  return true;
}



function getElementOnClick() {
  let element = this;
  //console.log(varDump(element.className));
}

function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}

function getPosAndSize(elem) {
  ;
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
    right: box.right + pageXOffset,
    bottom: box.bottom + pageYOffset
  };

}

function getPosition(e) {
  var posx = 0;
  var posy = 0;

  if (!e) var e = window.event;

  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft +
      document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop +
      document.documentElement.scrollTop;
  }
  return {
    x: posx,
    y: posy
  }
}



function setOnClickFunction(fn, forClass) {
  var elements = document.getElementsByTagName("*");
  if (isEmptyObject(elements)) {
    console.log("it is not possible to register the onClick function for a class " + forClass);
    return;
  }
  for (i = 0; i < elements.length; i++) {
    if (classNameFinder(elements[i], forClass))
      elements[i].onclick = fn;
  }
}




function classNameFinder(object, name) {
  var tempName;
  var objClassName = object.className + " ";
  for (var i = 0; i < objClassName.length; i++) {
    if (objClassName[i] === " ") {
      if (tempName === name)
        return true;
      else
        tempName = "";
    } else {
      tempName += objClassName[i];
    }
  }
  return false;
}



function reloadJS(oldFileName, fileName) {
  // fileName, oldFileName
  var scripts = document.getElementsByTagName("script");
  for (var i = scripts.length; i--;) {
    if (scripts[i] && scripts[i].getAttribute("src") != null && scripts[i].getAttribute("src").indexOf(oldFileName) != -1) {
      var newScript = document.createElement("script");
      newScript.setAttribute("type", "text/javascript");
      newScript.setAttribute("src", fileName);
      scripts[i].parentNode.replaceChild(newScript, scripts[i]);
    }
  }
}

function attachEvent(element, event, callbackFunction) {
  if (element.addEventListener) {
    element.addEventListener(event, callbackFunction, false);
  } else if (element.attachEvent) {
    element.attachEvent("on" + event, callbackFunction);
  }
}

function toArray(obj) {
  for (var i = 0, arr = []; i < obj.length; i++)
    arr.push(obj[i]);
  return arr;
}


function drawWaves() {

  var canvas = document.createElement("canvas");
  canvas.id = 'canvas';
  canvas.width = 800;
  canvas.height = 800;
  document.body.appendChild(canvas);

  var img = new Image();
  img.onload = function () {
    drawImageInPerspective(
      img, canvas,
      50, 50, //top left corner: x, y
      50, 300, //bottom left corner: x, y - position it 50px more to the right than the top right corner
      300, 50, //top right corner: x, y - position it 50px below the top left corner 
      300, 300, //bottom right corner: x,y
      false, //don't flip the original image horizontally
      false //don't flip the original image vertically
    );
  }
  img.src = "cs.png";

}

function drawImageInPerspective(
  srcImg,
  targetCanvas,
  topLeftX, topLeftY,
  bottomLeftX, bottomLeftY,
  topRightX, topRightY,
  bottomRightX, bottomRightY,
  flipHorizontally,
  flipVertically
) {

  var srcWidth = srcImg.naturalWidth;
  var srcHeight = srcImg.naturalHeight;

  var targetMarginX = Math.min(topLeftX, bottomLeftX, topRightX, bottomRightX);
  var targetMarginY = Math.min(topLeftY, bottomLeftY, topRightY, bottomRightY);

  var targetTopWidth = (topRightX - topLeftX);
  var targetTopOffset = topLeftX - targetMarginX;
  var targetBottomWidth = (bottomRightX - bottomLeftX);
  var targetBottomOffset = bottomLeftX - targetMarginX;

  var targetLeftHeight = (bottomLeftY - topLeftY);
  var targetLeftOffset = topLeftY - targetMarginY;
  var targetRightHeight = (bottomRightY - topRightY);
  var targetRightOffset = topRightY - targetMarginY;

  var tmpWidth = Math.max(targetTopWidth + targetTopOffset, targetBottomWidth + targetBottomOffset);
  var tmpHeight = Math.max(targetLeftHeight + targetLeftOffset, targetRightHeight + targetRightOffset);

  var tmpCanvas = document.createElement('canvas');
  tmpCanvas.width = tmpWidth;
  tmpCanvas.height = tmpHeight;
  var tmpContext = tmpCanvas.getContext('2d');

  tmpContext.translate(
    flipHorizontally ? tmpWidth : 0,
    flipVertically ? tmpHeight : 0
  );
  tmpContext.scale(
    (flipHorizontally ? -1 : 1) * (tmpWidth / srcWidth),
    (flipVertically ? -1 : 1) * (tmpHeight / srcHeight)
  );

  tmpContext.drawImage(srcImg, 0, 0);

  var tmpMap = tmpContext.getImageData(0, 0, tmpWidth, tmpHeight);
  var tmpImgData = tmpMap.data;

  var targetContext = targetCanvas.getContext('2d');
  var targetMap = targetContext.getImageData(targetMarginX, targetMarginY, tmpWidth, tmpHeight);
  var targetImgData = targetMap.data;

  var tmpX, tmpY,
    targetX, targetY,
    tmpPoint, targetPoint;

  for (var tmpY = 0; tmpY < tmpHeight; tmpY++) {
    for (var tmpX = 0; tmpX < tmpWidth; tmpX++) {

      tmpPoint = (tmpY * tmpWidth + tmpX) * 4;
      targetX = (
          targetTopOffset +
          targetTopWidth * tmpX / tmpWidth
        ) *
        (1 - tmpY / tmpHeight) +
        (
          targetBottomOffset +
          targetBottomWidth * tmpX / tmpWidth
        ) *
        (tmpY / tmpHeight);
      targetX = Math.round(targetX);


      targetY = (
          targetLeftOffset +
          targetLeftHeight * tmpY / tmpHeight
        ) *
        (1 - tmpX / tmpWidth) +
        (
          targetRightOffset +
          targetRightHeight * tmpY / tmpHeight
        ) *
        (tmpX / tmpWidth);
      targetY = Math.round(targetY);

      targetPoint = (targetY * tmpWidth + targetX) * 4;

      targetImgData[targetPoint] = tmpImgData[tmpPoint]; //red
      targetImgData[targetPoint + 1] = tmpImgData[tmpPoint + 1]; //green
      targetImgData[targetPoint + 2] = tmpImgData[tmpPoint + 2]; //blue
      targetImgData[targetPoint + 3] = tmpImgData[tmpPoint + 3]; //alpha
    }
  }

  targetContext.putImageData(targetMap, targetMarginX, targetMarginY);
}