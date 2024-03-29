//oauth.vk.com/authorize?client_id=6861903&scope=photos,audio,video,docs,notes,pages,status,offers,questions,wall,groups,messages,email,notifications,stats,ads,offline,docs,pages,stats,notifications&response_type=token
//"https://api.vk.com/method/wall.get?owner_id=-35785167&count=15&access_token=20a2b475f12e4c76779e48fbccc497e7826124077282709cd32bd968ec79c4d0e22655fbf27b9eba30653&v=5.52"
//"https://api.vk.com/method/wall.get?owner_id=-35785167&count=20&access_token=27d6b6701f6d72a7e1c0b3bdf523f025fbf994cd6a3ffe1c9bf12e9424fd18b76deb390c85b07869af0bd&v=5.52"
// Zui9dt6vScorWu1vNKXC
// cc9e1971cc9e1971cc9e19715dccf6ad3eccc9ecc9e197190f846ed5dba1e268a3b4173
const COMANDLINE_JS = new t_command;
const cmd = function (c) {
  return COMANDLINE_JS.c(c);
}



var addMovieBlock = function (id, image, likes, title, info, desc, srcWatch) {
  cmd("add div{id: movie-card-" + id + "} style{class: movie-card; background-image: url(\"" + image + "\")} parent{byId: movie-card-list}");
  cmd("add div{id: movie-card__overlay-" + id + "} style{class: movie-card__overlay} parent{byId: movie-card-" + id + "}");
  cmd("add div{id: movie-card__share-" + id + "} style{class: movie-card__share} parent{byId: movie-card-" + id + "}");
  cmd("add button{id: movie-card__button-likes-" + id + "} style{class: movie-card__likes} parent{byId: movie-card__share-" + id + "} text{" + likes + "}");
  cmd("add div{id: movie-card__content-" + id + "} style{class: movie-card__content} parent{byId: movie-card-" + id + "}");
  cmd("add div{id: movie-card__header-" + id + "} style{class: movie-card__header} parent{byId: movie-card__content-" + id + "}");
  cmd("add h1 style{class: movie-card__title} parent{byId: movie-card__header-" + id + "} text{" + title + "}");
  cmd("add h4 style{class: movie-card__info} parent{byId: movie-card__header-" + id + "} text{" + info + "}");
  cmd("add p style{class: movie-card__desc} parent{byId: movie-card__content-" + id + "} text{" + desc + "}");
  srcWatch.length > 0 ? cmd("add button{type: button} style{class: btn btn-outline movie-card__button} parent{byId: movie-card__content-" + id + "} text{Смотреть} event{click: {window.open(\"" + srcWatch + "\",\"_blank\");}}") : "";
}



var prepareUrl = function (vkAPImethod, id, count) {
  count = count || 1;
  let accessToken = "access_token=" + "cc9e1971cc9e1971cc9e19715dccf6ad3eccc9ecc9e197190f846ed5dba1e268a3b4173";
  return "https://api.vk.com/method/" + vkAPImethod + "?owner_id=" + id + "&count=" + count + "&" + accessToken + "&v=5.81";
};

var ajaxRequest = function (object) {
  $.ajax({
    method: object.method || "GET",
    url: object.url,

    dataType: object.type || "jsonp",
    success: object.success || function (a, b, c) {},
    error: object.error || function (a, b, c) { }
  });
};

var vkAPIResponse = function (responseData) {
  let err = responseData || 5;
  if (err === 5) {
    alert("Update vk token!");
    return;
  }
  createContent(responseData);
};

var parseResponse = function (jsonObj, condition) {
  
  jsonObj = jsonObj.response.items;
  
  var f1 = (v, s) => {
    v = v.split(s);

    for (let i = 0; i < v.length; i++) {
      if (v[i] === "" || v[i] === " " || v[i] === "\n") {
        v.splice(i, 1);
        i--;
      }
    }

    if (v[0].length > 40) v = v.splice(0, 1);
    return v;
  };

  var f2 = (v, c) => {
    if (!v || typeof v == "undefined")
      return "";
    v = v.split(",");

    
    if (v[0].indexOf("Жанр") > -1) v[0] = v[0].replace("Жанр", "").trim();
    
    for (let i = 0; i < v.length; i++) {
      v[i] = v[i].trim();
      if (v[i][0] === ":")
        v[i] = v[i].substr(1);
      v[i] = v[i].trim();
    }
    vcopy = [];

    for (let i = 0; i < v.length; i++)
      if (v[i].length > 0)
          vcopy.push(v[i]);

    v = vcopy;

    if (c && c.constructor === Array && c.length > 0) {
      let trigLength = c.length;
      for (let i = 0; i < v.length; i++) {
        if (c.indexOf(v[i].toLowerCase()) > -1) {
          trigLength--;
        }
        if (trigLength == 0) {
          return v.join(", ");
        }
      }
    } else return v.join(", ");

    return "";
  };

  var arrRet = [];

  
  for (var i = 0; i < jsonObj.length; i++) {
    if (jsonObj[i]['marked_as_ads'] == 1)
      continue;
    try {
      let tag, img, like, title, info, desc, src;
      let r = jsonObj[i];
      let obj = {
        images: "",
        likes: "",
        titles: "",
        info: "",
        descript: "",
        src: ""
      }

      // r.text.indexOf("Страна:") > 0 && 
      if (r.text.indexOf("Жанр:") > 0 && r.text.indexOf("Рейтинг:") > 0) {
        let textArr = f1(r.text, "\n");

        tag = f2((textArr[2].indexOf("Жанр") > -1 ? textArr[2]: textArr[3]), condition);
        
        if (tag == "") continue;

        img = r.attachments[0].photo.sizes[4].url;
        like = r.likes.count;
        title = textArr[0].substr(0, textArr[0].indexOf("(")).trim();

        info = textArr[0].substr(textArr[0].indexOf("(") + 1, 4);
        info += " " + textArr[1].substr(textArr[1].indexOf(":") + 1).trim();
        info += ", " + tag;

        desc = (textArr[4] ? textArr[4] : textArr[3]).trim().substr(0, 185) + "...";
        src = "https://vk.com/public35785167?w=wall" + r.owner_id + "_" + r.id;


        obj.images = img;
        obj.likes = like;
        obj.titles = title;
        obj.info = info;
        obj.descript = desc;
        obj.src = src;

        arrRet.push(obj);
      }

    } catch (ex) {
      // console.log(ex);
      continue;
    }
  }

  return arrRet;
};



var tags = [];

function setTagSelected(e) {
  if (tags.indexOf(e.innerHTML.toLowerCase()) > -1) {
    tags.splice(tags.indexOf(e.innerHTML.toLowerCase()), 1);
    document.getElementById(e.id).classList = "";
  } else {
    if (e.innerHTML.toLowerCase() !== "случайно") {
      document.getElementById("generated-id-0").classList = "";
      tags.push(e.innerHTML.toLowerCase());
      document.getElementById(e.id).classList = "button-active";
    } else {
      let elem = document.getElementsByClassName("button-active");
      for (let i = elem.length - 1; i > -1; i--) {
        elem[i].classList = "";
      }
      tags = [];
    }
  }
  if (tags.length === 0) {
    document.getElementById("generated-id-0").classList = "button-active";
  }
}


function getVKMovies(e) {
  setTagSelected(e);
  ajaxRequest({
    url: prepareUrl("wall.get", "-35785167", 100),
    method: "GET",
    success: vkAPIResponse
  });
}


var parsedContent = []
var parsedContentIt = 0;

function createContent(vkResponse) {
  var sRand = (a, b) => {
    return Math.random() - 0.5;
  };


  parsedContent = [];
  parsedContent = parseResponse(vkResponse, tags);
  parsedContent.sort(sRand);
  parsedContentIt = 0;

  reloadContent();

  
  if (parsedContent.length == 0) {
    addMovieBlock(
      0,
      "img/nothing.jpg",
      "",
      "Фильмов не найдено",
      "",
      "Нет фильмов соответствующим тэгам",
      ""
    );
    document.getElementById("movie-card-0").style.backgroundSize = "80%";
    return;
  }

  for (let i = 0; i < parsedContent.length; i++, parsedContentIt++) {
    if (parsedContentIt === 15) break;
    addMovieBlock(
      i,
      parsedContent[i].images,
      parsedContent[i].likes,
      parsedContent[i].titles,
      parsedContent[i].info,
      parsedContent[i].descript,
      parsedContent[i].src
    );
  }

  if (parsedContent.length > 15) {
    cmd("add div{id: movie-card-more} parent{byTag: body 0}");
    cmd("add div{id: movie-more} style{class: movie-more} parent{byId: movie-card-more}");
    cmd("add button parent{byId: movie-more} text{More} event{click: moreMovies()}");
  }
}

function moreMovies() {
  let max = parsedContentIt + 15;
  if (max >= parsedContent.length)
    cmd("del in{Byid: movie-card-more} *");

  for (let i = parsedContentIt; i < parsedContent.length; i++, parsedContentIt++) {
    if (parsedContentIt == max) break;
    addMovieBlock(
      i,
      parsedContent[i].images,
      parsedContent[i].likes,
      parsedContent[i].titles,
      parsedContent[i].info,
      parsedContent[i].descript,
      parsedContent[i].src
    );
  }
}

function reloadContent() {
  cmd("del in{Byid: movie-card-list} *");
  if (!isNull(document.getElementById("movie-card-more"))) {
    cmd("del in{Byid: movie-card-more} *");
  }
  cmd("add div{id: movie-card-list} parent{byTag: body 0}");
}

function buttons() {
  cmd("add div{id: movie-card-list-m1} parent{byTag: body 0}");
  cmd("add div{id: movie-search-div-0} style{class: movie-search-row} parent{byId: movie-card-list-m1}");
  cmd("add button parent{byId: movie-search-div-0} text{Случайно} event{click: getVKMovies(this)}");
  cmd("add button parent{byId: movie-search-div-0} text{Драма} event{click: getVKMovies(this)}");
  cmd("add button parent{byId: movie-search-div-0} text{Фэнтези} event{click: getVKMovies(this)}");
  cmd("add button parent{byId: movie-search-div-0} text{Документальный} event{click: getVKMovies(this)}");
  cmd("add button parent{byId: movie-search-div-0} text{Криминал} event{click: getVKMovies(this)}");
  cmd("add button parent{byId: movie-search-div-0} text{Биография} event{click: getVKMovies(this)}");
  cmd("add button parent{byId: movie-search-div-0} text{Военный} event{click: getVKMovies(this)}");
  cmd("add div{id: movie-search-div-1} style{class: movie-search-row} parent{byId: movie-card-list-m1}");
  cmd("add button parent{byId: movie-search-div-1} text{Боевик} event{click: getVKMovies(this)}");
  cmd("add button parent{byId: movie-search-div-1} text{Триллер} event{click: getVKMovies(this)}");
  cmd("add button parent{byId: movie-search-div-1} text{Приключения} event{click: getVKMovies(this)}");
  cmd("add button parent{byId: movie-search-div-1} text{Мелодрама} event{click: getVKMovies(this)}");
  cmd("add button parent{byId: movie-search-div-1} text{Комедия} event{click: getVKMovies(this)}");
  cmd("add button parent{byId: movie-search-div-1} text{Семейный} event{click: getVKMovies(this)}");
  cmd("add button parent{byId: movie-search-div-1} text{Фантастика} event{click: getVKMovies(this)}");
}



window.onload = function () {
  cmd("add div{id: movie-card-list} parent{byTag: body 0}");
  buttons();
}