var test_FontsShow = function () {
  command("add div{id: t-1} style{class: voice-recorder font-size-18} parrent{byTag:body[0]}");
  command("add p style{class: font-horizon} parrent{byId:t-1} text{Im pinas}");
  command("add p style{class: font-horizon_lines} parrent{byId:t-1} text{Im pinas}");
  command("add p style{class: font-horizon} parrent{byId:t-1} text{Im pinas}");
  command("add p style{class: font-horizon_linestwo} parrent{byId:t-1} text{Im pinas}");
  command("add p style{class: font-horizon_outline clickable} parrent{byId:t-1} text{Im pinas}");
  command("add p style{class: font-horizon_outlinetwo clickable} parrent{byId:t-1} text{Im pinas}");
  command("add p style{class: font-enzyme font-weight-900} parrent{byId:t-1} text{Im pinas}");
  command("add p style{class: font-axon clickable} parrent{byId:t-1} text{Im pinas}");
  command("add p style{class: font-axon_light clickable} parrent{byId:t-1} text{Im pinas}");
  command("add p style{class: font-axon_bold clickable} parrent{byId:t-1} text{Im pinas}");
  command("add p style{class: font-axon_ultralight clickable} parrent{byId:t-1} text{Im pinas}");
  command("add p style{class: font-corbel} parrent{byId:t-1} text{Im pinas}");
}

function test_SayHello() {
  alert("its a test, hi");
}




class t_console_log {

  constructor() {
    this.story = [];
    this.err = [];
    this.tp = [];
    this.s = false;
    this.t = false;
  }

  print(line) {
    console.log(line);
  }

  printf(line) {
    this.story.push(line);
    if (this.s) console.log(line);
  }

  throw (line) {
    this.err.push(line);
    if (this.t) console.log(line);
  }

  type(line) {
    this.tp.push(line);
    if (this.s) varDump(line);
  }

  log() {
    console.log("==================\nErrors\n==================");
    for (let i = 0; i < this.err.length; i++) console.log(err[i]);

    console.log("==================\nStories\n=================");
    for (let i = 0; i < this.err.length; i++) console.log(story[i]);

    console.log("==================\nTypes\n===================");
    for (let i = 0; i < this.err.length; i++) varDump(story[i]);
  }
};



const t_command_com = ["add", "del", "change", "server", "func", "load"];
const t_command_events = ["click", "mouseDown", "blur", "focus", "change", "dblclick", "keydown", "keypress", "keyup", "load", "mouseover"];
const t_command_tags = ["p", "body", "div", "span", "main", "button", "br", "input", "form", "img", "li", "ul", "table", "section", "label",
  "td", "th", "title", "a", "header", "footer", "canvas", "svg", "defs", "filter", "feGaussianBlur", "feColorMatrix", "option",
  "feColorMatrix", "feOffset", "feComposite", "h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8", "script", "select", "small" ,"i"
];
const t_command_param = ["type", "src", "image", "name", "id", "text", "value"];
const t_command_params = ["style", "parent", "text", "in"];


class t_command {

  constructor() {
    this.sessionSave = false;
    this.storyCommand = [];
    this.storyId = [];
    this.eventListenerOnce = [];

    this.log = new t_console_log;
    this.log.s = false;
    this.log.t = true;

    this.uniqueId = 0;
    this.sessionUnuqueId = this.lastSessionId();
    this.restoreSession();

    this.sessionRestored = true;
  }

  lastSessionId() {
    //localStorage.setItem("session-key-" + this.sessionUnuqueId, line);
    let fin = 0;

    for (let i = 0; i < 9999; i++) {
      if (localStorage.getItem("session-key-" + i) !== null)
        fin++;
      else break;
      if (fin === 9999) return 0;
    }
    return fin;
  }

  restoreSession() {
    //localStorage.setItem("command-session-reload", 1);

    if (localStorage.getItem("command-session-reload") == 1) {
      for (let i = 0; i < this.sessionUnuqueId; i++) {
        this.c(localStorage.getItem("session-key-" + i));
      }
      localStorage.removeItem("command-session-reload");
      this.clearSession();
    }
  }

  clearSession() {
    for (let i = 0; i < this.sessionUnuqueId; i++) {
      localStorage.removeItem("session-key-" + i);
    }
    this.sessionUnuqueId = 0;
    //localStorage.clear();
  }



  c(line) {
    this.log.printf(line);

    var r = true;
    var line = removeSpace(line);

    var a = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === "{" || line[i] === "}")
        a++;
      if (line[i] === "\"")
        b++;
      if (line[i] === "'")
        c++;
      if (line[i] === "(" || line[i] === ")")
        d++;
    }

    if (a % 2 !== 0) {
      this.log.throw("Is not enough closing \"}\" in " + line);
      return false;
    }
    if (b % 2 !== 0) {
      this.log.throw("Is not enough closing \" in " + line);
      return false;
    }
    if (c % 2 !== 0) {
      this.log.throw("Is not enough closing ' in " + line);
      return false;
    }
    if (d % 2 !== 0) {
      this.log.throw("Is not enough closing \")\" in " + line);
      return false;
    }

    var arr = line.split(/\s* \s*/)[0];

    switch (arr.toLowerCase()) {
      case "add":
        r = this.add(line);
        break;
      case "del":
        r = this.del(line);
        break;
      case "change":
        r = this.change(line);
        break;
      case "get":
        r = this._get(line);
        break;
      case "load":
        break;
      case "function":
        r = this.func(line);
        break;
      case "server":
        break;
      case "new":
        r = this._new(line);
        break;
      case "run":
        break;
      case "reload":
        r = this.reload(line);
        break;
      case ">":
        r = this._eval(line);
      default:
        this.log.throw("Unknown command in " + arr[0]);
        return false;
    }

    this.storyCommand.push(line);
    if (this.sessionSave) {
      localStorage.setItem("session-key-" + this.sessionUnuqueId, line);
      this.sessionUnuqueId++;
    }
    return r;
  }

  //add p style{color:white;  width:  10px;  class:font-horizon  clickable}
  //add p style{color:white;  width:  10px;  class:font-horizon  clickable}parent{last}
  //add div{id:123, name : 333} style {color:white;  width:  10px;   height: 20px;class:font-horizon  clickable; background: white} parent{byTag:body 0}
  //add div{id:123, name : 333} style {color:white;  width:  10px;   height: 20px;class:font-horizon  clickable; background: white} parent{byTag:body} event {click:{alert("hi")}} text{hello my pinas}
  //add div{id:123, name : 333} style {color:white;  width:  10px;  height: 20px; class:font-horizon  clickable; background: white} parent{byTag:body} event {click:{alert("hi")}; dblclick:{alert("mark")}} text{hello my pinas}
  //add div{id:123, name : 333} style {color:white;  width:  10px;  height: 20px; class:font-horizon  clickable; background: white} parent{byTag:body} event {click:{alert("hi");alert("heu");if(1>0){alert("hi")}}; dblclick:test_SayHello()} text{hello my pinas}
  //add input{type:text} style {color:white;  width:  10px;   height: 20px;class:font-horizon  clickable} parent{byTag:body}
  c_add(tag, style, parent, event, text) {
    var param = "";

    //Get tag and his param
    tag = this.splitLineParams(tag);
    param = tag[1];

    var newTag = document.createElement(tag[0]);

    if (param !== "") {
      let isId = false;

      param = this.splitParamsBy(param, ",");
      for (let i = 0; i < param.length; i++) {
        newTag.setAttribute(param[i][0], param[i][1]);
        if (param[i][0] === "id") isId = true;
      }

      if (!isId) {
        newTag.setAttribute("id", "generated-id-" + this.uniqueId);
        this.uniqueId++;
      }
    } else {
      newTag.setAttribute("id", "generated-id-" + this.uniqueId);
      this.uniqueId++;
    }
    param = "";

    //Get parent
    var oldparent = {};
    parent = this.splitLineParams(parent);
    if (parent[1].toLowerCase().trim() !== "last") {
      oldparent = this.getElement(parent[1]);


      if (Array.isArray(oldparent)) oldparent = oldparent[0];
      if (isNull(oldparent)) return false;

    } else {
      if (this.storyId.length > 0)
        oldparent = document.getElementById(this.storyId[this.storyId.length - 1]);
      else {
        this.log.throw("There is no possibility of search, \"body\" will be by default used in " + line);
        oldparent = document.getElementsByTagName("body")[0];
      }
    }

    //Get style
    newTag = this.setStyle(newTag, style);
    newTag = this.setEvent(newTag, event);
    if (text.length > 0)
      newTag.innerHTML += this.splitLineParams(text)[1];

    oldparent.appendChild(newTag);
    this.storyId.push(newTag.id);
    this.log.printf(newTag);
  }

  //add in{byid:generated-id-0} event {dblclick:{alert("not mark")}} text{hello my pinas} {color:white;  width:  10px; height: 100px;  background: black}
  //add in{byClass:clickable} style {color:white;  width:  10px; height: 12%;  background: black}
  //add in{byTag:223} style {color:white;  width:  10px; height: 100px;  background: black}
  //add in{byClass:clickable *} style {color:white;  width:  10px; height: 12%;  background: black}
  //add in{byid:123} style {color:white;  width:  10px;  height: 100px; background: black}
  c_add_style(findBy, style) {

    findBy = this.collectElement(findBy);

    if (Array.isArray(findBy)) {
      for (let i = 0; i < findBy.length; i++)
        findBy[i] = this.setStyle(findBy[i], style);
    } else {
      findBy = this.setStyle(findBy, style);
    }
    this.log.printf(findBy);
  }

  //add in{byClass:clickable} event {dblclick:{alert("mark")}} text{hello my pinas}
  //add in{byClass:clickable *} event {dblclick:{alert("mark")}} text{hello my pinas}
  //add in{byid:123} event {dblclick:{alert("mark")}} text{hello my pinas}
  c_add_event(findBy, event) {

    findBy = this.collectElement(findBy);

    if (Array.isArray(findBy)) {
      for (let i = 0; i < findBy.length; i++)
        findBy[i] = this.setEvent(findBy[i], event);
    } else {
      findBy = this.setEvent(findBy, event);
    }
    this.log.printf(findBy);
  }

  //add in{byid:generated-id-0} event {dblclick:{alert("not mark")}} text{hello my pinas} style{color:white;  width:  10px; height: 100px;  background: black}
  c_add_text(findBy, text) {

    text = this.splitLineParams(text)[1];
    findBy = this.collectElement(findBy);

    if (Array.isArray(findBy)) {
      for (let i = 0; i < findBy.length; i++)
        findBy[i].innerHTML += text;
    } else {
      findBy.innerHTML += text;
    }
    this.log.printf(findBy);
  }



  //del in {byTag:div *}
  c_del(findBy, sum) {

    let sumDel = sum > 0 ? true : false;
    let f = (elem) => {

      if (!sumDel) {
        let parent = elem.parentElement || null;
        if (parent != null) {
          let children = elementChildren(elem);
          for (let i = 0; i < children.length; i++) {
            parent.appendChild(children[i]);
          }

        }
        elem.remove();
        return;
      }

      let children = elem.childNodes;
      for (let i = 0; i < children.length; i++) {
        try {
          elem.removeChild(children[i]);
        } catch {
          break;
        }
      }
      elem.remove();
      return;
    }

    findBy = this.collectElement(findBy);


    if (Array.isArray(findBy)) {
      for (let i = 0; i < findBy.length; i++) {
        try {
          f(findBy[i]);
          //findBy[i].remove();
        } catch {
          continue;
        }
      }
    } else {
      f(findBy);
    }
  }

  //del in {byTag:div *} style event{dblclick; click} text
  //del in{byTag:div *} style{className: clickable}
  //del in{byTag:div *} style{background: white; className: clickable}
  c_del_style(findBy, style) {

    findBy = this.collectElement(findBy);

    if (Array.isArray(findBy)) {
      for (let i = 0; i < findBy.length; i++)
        findBy[i] = this.unSetStyle(findBy[i], style);
    } else {
      findBy = this.unSetStyle(findBy, style);
    }

  }

  //del in{byTag:div 1} event{click}
  //del in{byTag:div 1} event{click, dblclick}
  //del in{byTag:div 1} style{background; className: clickable font-horizon} event{click, dblclick}
  c_del_event(findBy, event) {

    findBy = this.collectElement(findBy);

    event = this.splitLineParams(event);
    event = event[1].replace(";", ",");
    event = event.split(",");
    findBy = this.removeEvent(findBy, event);

  }

  c_del_text(findBy, text) {
    findBy = this.collectElement(findBy);
    findBy.innerHTML = "";
  }



  c_change(findBy, tag) {
    findBy = this.collectElement(findBy);
  }

  c_change_style(findBy, style) {
    findBy = this.collectElement(findBy);
  }

  c_change_event(findBy, event) {

  }

  c_change_text(findBy, text) {

  }


  c_load_func(func) {

  }

  c_new_func(func) {

  }



  unSetStyle(elem, style) {

    if (style.trim() === "style") {
      elem.style.cssText = "";
      elem.className = "";
      return elem;
    }

    if (style.length > 0) {

      //deletes sublines {string} v  from line {string} l
      var f1 = function (v, l) {
        if (typeof l === "undefined") return v;

        let c = "";
        if (v.indexOf(l) > -1) {
          c = v.replace(l, "");
          return c.trim();
        }

        if (v.indexOf(" ") > -1) {

          let buf1 = v.split(" ");
          let buf2 = l.split(" ");

          for (let i = 0; i < buf1.length; i++) {
            for (let j = 0; j < buf2.length; j++) {
              if (buf1[i] === buf2[j]) {
                buf1.splice(i, 1);
                i--;
              }
            }
          }

          c = buf1.join(" ");
        } else return v;

        return c;
      };

      //return string joined by ";"
      var f2 = function (arr, l) {

        let c = "";
        for (let i = 0; i < arr.length; i++) {
          if (Array.isArray(arr[i])) {
            c += f2(arr[i], ":") + l;
          } else {
            c += arr[i];
            if (i < arr.length - 1) c += l;
          }
        }

        return c;
      };


      let oldStyles = this.splitLineParams("style{" + elem.style.cssText + "}");
      style = this.splitLineParams(style);

      let styleClassName = this.getClassName(style[1]);

      oldStyles = this.splitParamsByDetail(oldStyles[1], ";");
      style = this.splitParamsByDetail(style[1], ";");

      for (let i = oldStyles.length - 1; i > -1; i--) {
        for (let j = style.length - 1; j > -1; j--) {
          if (oldStyles[i][0] === style[j][0]) {
            if (typeof style[j][1] === "undefined" || style[j][1] === "") {
              oldStyles.splice(i, 1);
            } else {
              oldStyles[i][1] = f1(oldStyles[i][1], style[j][1]);
            }
          }
        }
      }

      elem.style.cssText = f2(oldStyles, ";");

      elem.className = f1(elem.className.trim(), styleClassName);
      elem.className = elem.className.trim();
    }

    return elem;
  }



  setStyle(elem, style) {

    var buf = "";
    var param = "";

    if (style.length > 0) {
      style = this.splitLineParams(style);
      buf = style[0];
      param = style[1];

      elem.className += " " + this.getClassName(param);
      elem.style.cssText += param;
    }

    this.log.printf(buf + "\t " + param);
    return elem;
  }

  setEvent(elem, event) {
    if (event.length < 1) return elem;

    var pastElem = [];
    for (let i = 0; i < this.eventListenerOnce.length; i++) {
      if (elem.id === this.eventListenerOnce[i].e) {
        pastElem.push(this.eventListenerOnce[i]);
      }
    }

    var param = this.splitFuncsForEvent(event.trim());

    for (let i = 0; i < param.length; i++) {

      function f(e) {
        eval(param[i][1]);
      };

      if (pastElem.length > 0) {
        let once = true;
        for (let j = 0; j < pastElem.length; j++) {
          if (pastElem[j].s === param[i][0] && pastElem[j].f === param[i][1]) {
            once = false;
            break;
          }
        }
        if (once)
          elem.addEventListener(param[i][0], f, true);

      } else {
        this.eventListenerOnce.push({
          e: elem.id,
          s: param[i][0],
          f: param[i][1],
          fn: f
        });
        elem.addEventListener(param[i][0], f, true);
      }
    }

    this.log.printf(param);
    return elem;
  }



  collectElement(findBy) {
    findBy = this.splitLineParams(findBy);
    findBy = this.getElement(findBy[1]);

    if (isNull(findBy) || findBy === "undefined" || findBy === "") {
      this.log.throw("There is no possibility of search, \"body\" will be by default used in " + line);
      findBy = document.getElementsByTagName("body")[0];
    }

    return findBy;
  }

  //findBy
  getElement(findBy) {

    var by = "";
    var elem = "";
    var index = "";

    for (let i = 0; i < findBy.length; i++) {
      if (findBy[i] !== ":") by += findBy[i];
      else {
        elem = findBy.substr(i + 1, findBy.length - i);
        break;
      }
    }

    by = by.trim();
    elem = elem.trim();

    for (let i = 0; i < elem.length; i++) {
      if (elem[i] === " ") {
        index = elem.substr(i + 1, elem.length - i).trim();
        elem = elem.substr(0, i).trim();
        break;
      }
    }
    if (index !== "*") {
      index = parseInt(index);
      if (isNaN(index))
        index = 0;
    }

    switch (by.toLowerCase()) {
      case "bytag":
        findBy = index === "*" ? document.getElementsByTagName(elem) : document.getElementsByTagName(elem)[index];
        break;
      case "byclass":
        findBy = index === "*" ? document.getElementsByClassName(elem) : document.getElementsByClassName(elem)[index];
        break;
      case "byid":
        findBy = document.getElementById(elem);
        break;
      case "byname":
        findBy = index === "*" ? document.getElementsByClassName(elem) : document.getElementsByName(elem)[index];
        break;
      default:
        this.log.throw("There is no possibility of search on " + by);
        return null;
    }

    if (typeof findBy === "undefined") {
      this.log.throw("There is no possibility of search, \"body\" will be by default used");
      findBy = document.getElementsByTagName("body")[0];
    }

    this.log.printf(elem);
    this.log.printf(by);
    this.log.printf(index);

    if (HTMLCollection.prototype.isPrototypeOf(findBy)) {
      findBy = toArray(findBy);
    }

    return findBy;
  }

  getClassName(value) {
    var clas = "";

    let className = value.indexOf("class");
    if (className > -1 && (value[className + 5] === " " || value[className + 5] === ":")) {
      if (value[className + 5] === " ") className++;
      className += 6;
      let i = className;

      for (i; i < value.length; i++) {
        if (value[i] === ";") break;
      }

      className = value.substr(className, i - className);
      clas += className.trim();
    } else {

      className = value.indexOf("className");
      if (className > -1 && (value[className + 95] === " " || value[className + 9] === ":")) {
        if (value[className + 9] === " ") className++;
        className += 10;
        let i = className;

        for (i; i < value.length; i++) {
          if (value[i] === ";") break;
        }

        className = value.substr(className, i - className);
        clas += className.trim();
      }
    }
    this.log.printf("class: " + className);

    return clas;
  }



  splitParamsBy(value, on) {

    var buf = "";
    var arr = [];

    for (let i = 0; i < value.length; i++) {
      let ar = [];
      if (value[i] === ":") {
        ar.push(buf);
        buf = "";
        for (i++; i < value.length; i++) {
          if (value[i] !== on) {
            buf += value[i];
          } else break;
        }
        ar.push(buf);
        arr.push(ar);
        buf = "";
      } else buf += value[i];
    }
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === "" || arr[i][j] === " ") {
          arr[i].slice(i, 1);
        } else {
          arr[i][j] = arr[i][j].replace(/\s+/g, "");
        }
      }
    }

    return arr;
  }

  splitCommandParams(line) {
    var len = line.length;
    var arr = [];
    var buf = "";
    var i = 0;

    var f1 = () => {
      for (i; i < len; i++) {
        if (line[i] !== "}")
          buf += line[i];
        else break;
      }
    }

    //for "event"
    var f2 = () => {
      var a = 1;
      buf += "{";
      for (i++; a > 0; i++) {
        if (line[i] === "{") a++;
        if (line[i] === "}") a--;
        if (typeof line[i] !== "undefined")
          buf += line[i];
        if (i >= len) break;
      }
    }

    for (i = 0; i < len; i++) {
      if (this.isParams(buf)) {
        if (line[i] === " ") {
          if (line[i + 1] === "{") {
            i++;
            f1();
            arr.push(buf + "}");
          }
          buf = "";
        } else {
          if (line[i] === "{") {
            f1();
            arr.push(buf + "}");
            buf = "";
          } else
            buf += line[i];
        }
      } else {
        if (line[i] === " ") {
          if (line[i + 1] === "{") {
            i++;
            f2();
            arr.push(buf);
          }
          buf = "";
        } else {
          if (line[i] === "{") {
            f2();
            arr.push(buf);
            buf = "";
          } else
            buf += line[i];
        }
      }
    }

    return arr;
  }

  splitCommand(line) {
    var arr = [];
    var buf = ""

    line += " ";

    var f = (i) => {
      for (i; i < line.length; i++) {
        if (line[i] === "}") {
          break;
        }
      }
    }

    for (let i = 0; i < line.length; i++) {

      if (line[i] === " " || line[i] === "{") {

        if (this.isParams(buf) || buf === "event") {
          if (line[i] === " ") {
            if (line[i + 1] === "{") f(i);
          } else {
            if (line[i] === "{") f(i);
          }
          arr.push(buf.trim());
        }
        buf = "";

      } else {
        buf += line[i];
      }
    }

    this.log.printf(line);
    this.log.printf(arr);
    return arr;
  }

  splitLineParams(value) {
    var buf = "";
    var param = "";
    var arr = [];

    for (let i = 0; i < value.length; i++) {
      if (value[i] === " " || value[i] === "{") {
        if (value[i] === " ") i++;
        if (typeof value[i] === "undefined") break;
        for (i; i < value.length; i++) {
          if (value[i] !== "{" && value[i] !== "}")
            param += value[i];
        }
        break;

      } else {
        buf += value[i];
      }
    }

    arr.push(buf);
    arr.push(param);
    return arr;
  }

  splitFuncsForEvent(value) {
    var arr = [];
    var buf = "";
    var param = "";


    param = value.substr(value.indexOf("{") + 1, value.length - value.indexOf("{") - 2).trim();

    for (let i = 0; i < param.length; i++) {
      if (param[i] === ":") {
        i++;
        let a = 0;
        let ar = [];

        buf = buf.substr(0, i).trim();
        ar.push(buf);

        buf = "";

        if (param[i] === "{") {
          i += 1;
          a++;
        } else if (param[i + 1] === "{") {
          i += 2;
          a++;
        }


        if (a > 0) {
          for (i; a > 0; i++) {
            if (i >= param.length) break;
            if (param[i] === "{") a++;
            if (param[i] === "}") a--;
            if (a === 0) break;
            buf += param[i];
          }
        } else {
          for (i; i < param.length; i++) {
            if (param[i] !== ";") buf += param[i];
            else break;
          }
        }

        if (param[i + 1] === ";") i += 2;
        else if (param[i + 2] === ";") i += 3;


        buf = buf.trim();
        ar.push(buf);
        arr.push(ar);

        buf = "";
      } else buf += param[i];
    }

    this.log.printf(arr);
    this.log.printf(param);

    return arr;
  }

  splitParamsByDetail(value, on) {

    var buf = "";
    var arr = [];

    for (let i = 0; i < value.length; i++) {
      let ar = [];
      if (value[i] === ":") {
        ar.push(buf);
        buf = "";
        for (i++; i < value.length; i++) {
          if (value[i] !== on) {
            buf += value[i];
          } else break;
        }
        ar.push(buf);
        arr.push(ar);
        buf = "";
      } else {
        if (value[i] === on) {
          ar.push(buf);
          arr.push(ar);
          buf = "";
        } else buf += value[i];
      }
    }

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === "" || arr[i][j] === " ") {
          arr[i].slice(i, 1);
        } else {
          arr[i][j] = arr[i][j].replace(/\s+/g, " ").trim();
        }
      }
    }

    return arr;
  }



  removeEvent(elem, event) {

    var pastElem = [];

    var f1 = (el, ev) => {
      switch (ev.trim()) {
        case "click":
          el.click = null;
          break;
        case "mouseDown":
          el.mouseDown = null;
          break;
        case "blur":
          el.blur = null;
          break;
        case "focus":
          el.focus = null;
          break;
        case "change":
          el.change = null;
          break;
        case "dblclick":
          el.dblclick = null;
          break;
        case "keydown":
          el.keydown = null;
          break;
        case "keypress":
          el.keypress = null;
          break;
        case "keyup":
          el.keyup = null;
          break;
        case "load":
          el.load = null;
          break;
      }
      return el;
    };

    var f2 = (el, ev) => {
      for (let j = 0; j < ev.length; j++)
        el = f1(el, ev[j]);
      return el;
    };

    var f3 = (el, arr) => {
      for (let i = 0; i < this.eventListenerOnce.length; i++) {
        if (el.id === this.eventListenerOnce[i].e) {
          arr.push(this.eventListenerOnce[i]);
        }
      }
      return arr;
    };

    var f4 = (el, arr, ev) => {
      ev = ev.trim();
      el = f1(el, ev);
      if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          if (ev === arr[i].s) {
            el.removeEventListener(arr[i].s, arr[i].fn, true);
          }
        }
      }
      return el;
    };

    var f5 = (el, arr, ev) => {
      el = f2(el, ev);
      for (let j = 0; j < ev.length; j++)
        el = f4(el, arr, ev[j]);

      return el;
    }


    if (HTMLCollection.prototype.isPrototypeOf(elem)) {

      if (this.eventListenerOnce.length > 0)
        for (let i = 0; i < elem.length; i++)
          pastElem = f3(elem[i], pastElem);

      for (let i = 0; i < elem.length; i++) {
        Array.isArray(event) ?
          elem[i] = f5(elem[i], pastElem, event) :
          elem[i] = f4(elem[i], pastElem, event);

      }

    } else {
      if (this.eventListenerOnce.length > 0) pastElem = f3(elem, pastElem);

      Array.isArray(event) ?
        elem = f5(elem, pastElem, event) :
        elem = f4(elem, pastElem, event);


    }


    return elem;
    /*
    var buf = "";
    for (let i = 0; i < t_command_events.length; i++) {
      buf += "elem." + t_command_events[i] + " = null;";
    }
    console.log(buf);
    var buf = "switch(ev){";
    for (let i = 0; i < t_command_events.length; i++) {
      buf += "case \"" +t_command_events[i]+ "\" :el." + t_command_events[i] + " = null; break;";
    }
    console.log(buf+"} return el;");
    */
  }


  //add p style{color:white;  width:  10px;  class:font-horizon  clickable}
  //add input{type:text}  style {color:white;  width:  10px;  class:font-horizon  clickable} parent{byTag:body} 
  //add input{type:text}  style {color:white;  width:  10px;  class:font-horizon  clickable} parent{byTag:body!} 
  //add input{type:text}  style {color:white;  width:  10px;  class:font-horizon  clickable} parent{byTag:body} event {click:test_SayHello()} text{hello my pinas}
  //add input{type:text}  style {color:white;  width:  10px;  class:font-horizon  clickable} parent{byTag:body} event {click:{alert("hi")}} text{hello my pinas}
  //add div{id:123, name : 333} style {color:white;  width:  10px;  class:font-horizon  clickable; background: white} parent{byTag:body} event {click:{alert("hi")}; dblclick:test_SayHello()} text{hello my pinas}
  //add in{byTag:body} style {color:white;  width:  10px;  class:font-horizon  clickable}
  //add in{byTag:body} style {color:white;  width:  10px;  class:font-horizon  clickable} event {click:{alert("hi")}} text{hello my pinas}
  add(line) {
    var bufLine = "";
    var bufStr = "";
    var params = [];
    var tag = "";
    var findBy = "";
    var style = "";
    var parent = "";
    var event = "";
    var text = "";

    for (let i = 0; i < line.length; i++) {
      if (line[i] === " ") {
        for (i++; i < line.length; i++) {
          bufLine += line[i];
        }
      }
    }

    if (bufLine === "") {
      this.log.throw("There are no parameters in " + line);
      return false;
    }

    params = this.splitCommandParams(bufLine);
    for (let i = 0; i < params.length; i++) {

      for (let j = 0; j < params[i].length; j++) {

        if (this.isTag(bufStr)) {
          if (params[i][j] === " " || params[i][j] === "{") {
            tag = params[i];
            bufStr = "";
            break;
          }
        }
        if (bufStr === "style") {
          style = params[i];
          bufStr = "";
          break;
        }
        if (bufStr === "parent") {
          parent = params[i];
          bufStr = "";
          break;
        }
        if (bufStr === "event") {
          event = params[i];
          bufStr = "";
          break;
        }
        if (bufStr === "text") {
          text = params[i];
          bufStr = "";
          break;
        }
        if (bufStr === "in") {
          if (params[i][j] === " " || params[i][j] === "{") {
            findBy = params[i];
            bufStr = "";
            break;
          }
        }
        bufStr += params[i][j];

      }

    }
    bufStr = "";

    if (tag === "" && findBy === "") {
      for (let i = 0; i < bufLine.length; i++) {
        if (bufLine[i] !== " " || bufLine[i] !== "{") {
          bufStr += bufLine[i];
        }
        if (this.isTag(bufStr)) {
          tag = bufStr;
        }
      }
      bufStr = bufLine = "";
    }


    this.log.printf(params);
    this.log.printf("findBy: " + findBy);
    this.log.printf("tag: " + tag);
    this.log.printf("style: " + style);
    this.log.printf("parent: " + parent);
    this.log.printf("event: " + event);
    this.log.printf("text: " + text);


    if (tag.length === 0) {
      if (findBy.length === 0) {
        this.log.throw("It is not possible to find an element. \"body\" will be by default established");
        findBy = "in{byTag:body}";
      }
      if (parent.length !== 0) {
        this.log.throw("\"" + parent + "\" will be ignored");
        parent = "";
      }
      if (style.length !== 0) this.c_add_style(findBy, style);
      if (event.length !== 0) this.c_add_event(findBy, event);
      if (text.length !== 0) this.c_add_text(findBy, text);

      return true;

    } else {
      if (findBy.length !== 0) {
        this.log.throw("\"" + findBy + "\" will be ignored");
        findBy = "";
      }
      if (parent.length === 0) {
        this.log.throw("There is no parent. \"body\" will be by default established in " + line);
        parent = "parent{byTag: body}";
      }
      this.c_add(tag, style, parent, event, text);

      return true;
    }
  }

  //del in{byTag:div 1} *
  //del in{byTag:div *}
  //del in{byTag:div *} style{className: clickable}
  //del in{byTag:div *} style
  //del in{byTag:div *} event{dblclick; click}
  //del in{byTag:div *} event
  //del in{byTag:div *} text
  //del in{byTag:div *} style{className: clickable} event{dblclick; click} text
  //del in {byTag:div *} style event{dblclick; click} text
  del(line) {
    var bufLine = "";
    var params = [];

    var findBy = "";
    var style = "";
    var event = "";
    var text = "";

    var f2 = function (val, eq) {
      if (val.length === 0) {
        if (commands.indexOf(eq) !== -1) {
          val = eq;
        }
      }
      return val;
    }

    for (let i = 0; i < line.length; i++)
      if (line[i] === " ")
        for (i++; i < line.length; i++)
          bufLine += line[i];


    var commands = this.splitCommand(bufLine);

    if (bufLine === "") {
      this.log.throw("There are no parameters in " + line);
      return false;
    }

    params = this.splitCommandParams(bufLine);
    for (let i = 0; i < params.length; i++) {

      var bufStr = "";
      for (let j = 0; j < params[i].length; j++) {

        if (bufStr === "style") {
          commands.splice(commands.indexOf(bufStr), 1);
          style = params[i];
          bufStr = "";
          break;
        }
        if (bufStr === "event") {
          commands.splice(commands.indexOf(bufStr), 1);
          event = params[i];
          bufStr = "";
          break;
        }
        if (bufStr === "text") {
          commands.splice(commands.indexOf(bufStr), 1);
          text = params[i];
          bufStr = "";
          break;
        }
        if (bufStr === "in") {
          if (params[i][j] === " " || params[i][j] === "{") {
            commands.splice(commands.indexOf(bufStr), 1);
            findBy = params[i];
            bufStr = "";
            break;
          }
        }
        bufStr += params[i][j];
      }

    }


    style = f2(style, "style");
    event = f2(event, "event");
    text = f2(text, "text");

    this.log.printf("findBy: " + findBy);
    this.log.printf("style: " + style);
    this.log.printf("event: " + event);
    this.log.printf("text: " + text);

    if (findBy.length !== 0) {

      let inc = 0;

      if (style.length !== 0) {
        this.c_del_style(findBy, style);
        inc++;
      }
      if (event.length !== 0) {
        this.c_del_event(findBy, event);
        inc++;
      }
      if (text.length !== 0) {
        this.c_del_text(findBy, text);
        inc++;
      }

      if (inc === 0) {
        this.c_del(findBy, bufLine[bufLine.length - 1] === "*" ? 1 : -1);
      }
      return true;

    } else {

      this.log.throw("There is no possibility of removal");
      return false;
    }
  }


  //TODO тута доделать нудо по return
  //change in{byTag:div 2} div{id: 228-tag; name: gabe} style{width: 400px; class: draggable} event {click:{alert("hi")}} text{hello my pinas}
  change(line) {
    var bufLine = "";
    var params = [];

    var tag = "";
    var findBy = "";
    var style = "";
    var event = "";
    var text = "";

    for (let i = 0; i < line.length; i++)
      if (line[i] === " ")
        for (i++; i < line.length; i++)
          bufLine += line[i];


    var commands = this.splitCommand(bufLine);

    if (bufLine === "") {
      this.log.throw("There are no parameters in " + line);
      return false;
    }

    params = this.splitCommandParams(bufLine);
    for (let i = 0; i < params.length; i++) {

      var bufStr = "";
      for (let j = 0; j < params[i].length; j++) {

        if (this.isTag(bufStr)) {
          if (params[i][j] === " " || params[i][j] === "{") {
            tag = params[i];
            bufStr = "";
            break;
          }
        }
        if (bufStr === "style") {
          commands.splice(commands.indexOf(bufStr), 1);
          style = params[i];
          bufStr = "";
          break;
        }
        if (bufStr === "event") {
          commands.splice(commands.indexOf(bufStr), 1);
          event = params[i];
          bufStr = "";
          break;
        }
        if (bufStr === "text") {
          commands.splice(commands.indexOf(bufStr), 1);
          text = params[i];
          bufStr = "";
          break;
        }
        if (bufStr === "in") {
          if (params[i][j] === " " || params[i][j] === "{") {
            commands.splice(commands.indexOf(bufStr), 1);
            findBy = params[i];
            bufStr = "";
            break;
          }
        }
        bufStr += params[i][j];
      }

    }




    console.log("tag: " + tag);
    console.log("findBy: " + findBy);
    console.log("style: " + style);
    console.log("event: " + event);
    console.log("text: " + text);

    return;
    if (findBy.length !== 0) {

      let inc = 0;

      if (style.length !== 0) {
        this.c_del_style(findBy, style);
        inc++;
      }
      if (event.length !== 0) {
        this.c_del_event(findBy, event);
        inc++;
      }
      if (text.length !== 0) {
        this.c_del_text(findBy, text);
        inc++;
      }

      if (inc === 0) {
        this.c_del(findBy);
      }
      return true;

    } else {

      this.log.throw("There is no possibility of removal");
      return false;
    }
  }

  //get in{byId: parampampam}
  _get(line) {
    var bufLine = "";
    var params = [];

    var tag = "";
    var findBy = "";
    var style = "";
    var event = "";
    var text = "";

    for (let i = 0; i < line.length; i++)
      if (line[i] === " ")
        for (i++; i < line.length; i++)
          bufLine += line[i];

    var commands = this.splitCommand(bufLine);

    if (bufLine === "") {
      this.log.throw("There are no parameters in " + line);
      return false;
    }

    params = this.splitCommandParams(bufLine);
    for (let i = 0; i < params.length; i++) {

      var bufStr = "";
      for (let j = 0; j < params[i].length; j++) {

        if (this.isTag(bufStr)) {
          if (params[i][j] === " " || params[i][j] === "{") {
            tag = params[i];
            bufStr = "";
            break;
          }
        }

        if (bufStr === "in") {
          if (params[i][j] === " " || params[i][j] === "{") {
            commands.splice(commands.indexOf(bufStr), 1);
            findBy = params[i];
            bufStr = "";
            break;
          }
        }
        bufStr += params[i][j];
      }
    }

    return this.collectElement(findBy);
  }

  //new style name{background: #d83098; margin: 0;padding: 0;color: white;font: 15pt/21pt font-enzyme, Arial, sans-serif; }
  //new style google{background: #f2f3f4; margin: 0;padding: 0;color: white;font: 15pt/21pt font-enzyme, Arial, sans-serif; }
  _new(line) {
    var bufLine = "";
    var type = "";

    var params = [];

    var f1 = (b) => {
      let a = "";
      for (let i = 0; i < b.length; i++)
        if (b[i] === " ")
          for (i++; i < b.length; i++)
            a += b[i];
      return a;
    }

    bufLine = f1(line);
    type = bufLine.split(" ")[0];

    params = this.splitCommandParams(bufLine);

    if (type === "style") {


      let styleName = bufLine.indexOf("{") == -1 ?
        this.splitLineParams(params[0])[0] :
        bufLine.substr(type.length, bufLine.indexOf("{") - type.length).trim();


      let styleTag = document.getElementsByTagName("style")[0];
      if (typeof styleTag === "undefined") {
        let headTag = document.getElementsByTagName("head")[0] || document.createElement("head");
        styleTag = document.createElement("style");
        headTag.appendChild(styleTag);
      }

      this.isTag(styleName) ? 0 : styleName[0] === "@" ? 0 : styleName[0] === "#" ? 0 : styleName[0] === "." ? 0 : styleName = "." + styleName;
      params = styleName + params[0].substr(params[0].indexOf("{")).trim();

      styleTag.styleSheet ?
        styleTag.styleSheet.cssText = params :
        styleTag.appendChild(document.createTextNode(params));

      return true;
    }
    /*
    
    var css = 'h1 { background: red; }',
    head = document.head || document.getElementsByTagName('head')[0], 
    style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet){
      // This is required for IE8 and below.
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
    */
  }


  //function alert("hi")
  //function asds(a) {alert("ss")if ("a" == "c") {} else {alert("gay")} alert(a)}
  //function test_SayHello()
  func(line) {
    var bufLine = "";
    var bodyFunc = [];

    var f1 = (b) => {
      let a = "";
      for (let i = 0; i < b.length; i++)
        if (b[i] === " ")
          for (i++; i < b.length; i++)
            a += b[i];
      return a;
    }

    //Get func body
    var f2 = (s) => {
      let a = 1,
        i = 1;
      s = s.substr(s.indexOf("{"), s.length - s.indexOf("{"));
      let len = s.length;

      let buf = "{";
      for (i; a > 0; i++) {
        if (s[i] === "{") a++;
        if (s[i] === "}") a--;
        if (typeof s[i] !== "undefined")
          buf += s[i];
        if (i >= len) break;
      }
      return s.substr(0, i);
    }

    bufLine = f1(line);
    bodyFunc = this.splitCommandParams(bufLine)[0];

    if (typeof bodyFunc === "undefined") {
      eval(bufLine);
      return true;
    } else {
      if (bufLine.indexOf(")") == -1 || (bufLine.indexOf(")") > bufLine.indexOf("{"))) {
        this.log.throw("There are no function parameters");
        return false;
      }

      let headFunc = bufLine.substr(0, bufLine.indexOf(")") + 1);
      let paramInHead = headFunc.substr(bufLine.indexOf("(") + 1, headFunc.length - bufLine.indexOf(")"));
      if (paramInHead === ")") paramInHead = "";
      headFunc = bufLine.substr(0, bufLine.indexOf("("));
      bodyFunc = f2(bodyFunc);


      let script = document.getElementById("generated-scipt-id");
      if (!script) {
        script = document.createElement("script");
        script.type = "text/javascript";
        script.id = "generated-scipt-id";
        document.getElementsByTagName("head")[0].appendChild(script);
      }

      script.text = "function " + headFunc + "(" + paramInHead + ")" + bodyFunc;

    }
    return true;
  }

  //> alert(12 + 22)
  _eval(line) {
    eval(line.substr(line.indexOf(">") + 1, line.length).trim());
    return true;
  }


  reload(line) {
    localStorage.setItem("command-session-reload", 1);
    if (!this.sessionSave) {
      for (let i = 0; i < this.storyCommand.length; i++) {
        localStorage.setItem("session-key-" + i, this.storyCommand[i]);
      }
    }
    location.reload();
    return false
  }


  isTag(value) {
    for (let i = 0; i < t_command_tags.length; i++) {
      if (t_command_tags[i] === value) return true;
    }
    return false;
  }

  isParam(value) {
    for (let i = 0; i < t_command_param.length; i++) {
      if (t_command_param[i] === value) return true;
    }
    return false;
  }

  isParams(value) {
    for (let i = 0; i < t_command_params.length; i++) {
      if (t_command_params[i] === value) return true;
    }
    return false;
  }
};