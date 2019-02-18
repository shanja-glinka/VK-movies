//oauth.vk.com/authorize?client_id=6861903&scope=photos,audio,video,docs,notes,pages,status,offers,questions,wall,groups,messages,email,notifications,stats,ads,offline,docs,pages,stats,notifications&response_type=token
"https://api.vk.com/method/wall.get?owner_id=-26750264&count=15&access_token=20a2b475f12e4c76779e48fbccc497e7826124077282709cd32bd968ec79c4d0e22655fbf27b9eba30653&v=5.52"
"https://api.vk.com/method/wall.get?owner_id=-26750264&count=20&access_token=27d6b6701f6d72a7e1c0b3bdf523f025fbf994cd6a3ffe1c9bf12e9424fd18b76deb390c85b07869af0bd&v=5.52"

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
  cmd("add p{id: movie-card__header-" + id + "} style{class: movie-card__desc} parent{byId: movie-card__content-" + id + "} text{" + desc + "}");
  cmd("add button{id: movie-card__header-" + id + ", type: button} style{class: btn btn-outline movie-card__button} parent{byId: movie-card__content-" + id + "} text{Watch} event{click: {window.open(\"" + srcWatch + "\",\"_blank\");}}");
}



var prepareUrl = function (vkAPImethod, id, count) {
  count = count || 1;
  let accessToken = "access_token=" + "20a2b475f12e4c76779e48fbccc497e7826124077282709cd32bd968ec79c4d0e22655fbf27b9eba30653";
  return "https://api.vk.com/method/" + vkAPImethod + "?owner_id=" + id + "&count=" + count + "&" + accessToken + "&v=5.52";
};

var ajaxRequest = function (object) {
  console.log(object);
  $.ajax({
    method: object.method || "GET",
    url: object.url,

    dataType: object.type || "jsonp",
    success: object.success || function (a, b, c) {
      console.log(b, a, c);
    },
    error: object.error || function (a, b, c) {
      alert("Error: datas cannot be loaded");
      console.log("error", b, c);
    }
  });
};

var vkAPIResponse = function (responseData) {
  console.log(responseData);
  let err = responseData || 5;
  if (err === 5) {
    console.log("update key");
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
    v = v.split("#");

    if (v[0].indexOf("Жанр") > -1) v.splice(0, 1);

    for (let i = 0; i < v.length; i++) {
      if (v[i][0] === "#")
        v[i] = v[i].substr(1);
      else {
        v[i] = v[i].substr(0, v[i].indexOf("@"));
      }
    }

    if (c.length > 0 && c.toLowerCase() !== "случайно") {
      for (let i = 0; i < v.length; i++) {
        if (v[i].toLowerCase() === c.toLowerCase()) {
          return v.join(", ");
        }
      }
    } else return v.join(", ");

    return "";
  };

  var arrRet = [];



  for (var i = 0; i < jsonObj.length; i++) {
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

      if (r.text.indexOf("Страна:") > 0 && r.text.indexOf("Жанр:") > 0 && r.text.indexOf("Рейтинги:") > 0) {
        let textArr = f1(r.text, "\n");

        tag = f2(textArr[2], condition);
        if (tag == "") continue;

        img = r.attachments[0].photo.photo_807;
        like = r.likes.count;
        title = textArr[0].substr(0, textArr[0].indexOf("(")).trim();

        info = textArr[0].substr(textArr[0].indexOf("(")).trim();
        info += " " + textArr[1].substr(textArr[1].indexOf(":") + 1).trim();
        info += ", " + tag;

        desc = textArr[6].trim().substr(0, 185) + "...";
        src = "https://vk.com/public26750264?w=wall" + r.owner_id + "_" + r.id;


        obj.images = img;
        obj.likes = like;
        obj.titles = title;
        obj.info = info;
        obj.descript = desc;
        obj.src = src;

        arrRet.push(obj);
      }

    } catch {
      continue;
    }
  }




  return arrRet;
};



var tagID;

function getVKMovies(e) {
  tagID = e;
  ajaxRequest({
    url: prepareUrl("wall.get", "-26750264", 100),
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
  parsedContent = parseResponse(vkResponse, tagID.innerHTML);


  console.log(parsedContent.length);
  parsedContentIt = 0;
  parsedContent.sort(sRand);

  cmd("del in{Byid: movie-card-list} *");

  if (!isNull(document.getElementById("movie-card-more")))
    cmd("del in{Byid: movie-card-more} *");
  cmd("add div{id: movie-card-list} parent{byTag: body 0}");

  finderHtml();


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
  console.log(parsedContent.length, parsedContentIt, max);
}


function finderHtml() {
  cmd("add div{id: movie-card-list} parent{byTag: body 0}");
  cmd("add div{id: movie-search} style{class: movie-search} parent{byId: movie-card-list}");
  cmd("add div{id: movie-search-div-0} style{class: movie-search-row} parent{byId: movie-card-list}");
  cmd("add button parent{byId: movie-search-div-0} text{Случайно} event{click: getVKMovies(this)}");
  cmd("add button parent{byId: movie-search-div-0} text{Драма} event{click: getVKMovies(this)}");
  cmd("add button parent{byId: movie-search-div-0} text{Фэнтези} event{click: getVKMovies(this)}");
  cmd("add button parent{byId: movie-search-div-0} text{Документальный} event{click: getVKMovies(this)}");
  cmd("add button parent{byId: movie-search-div-0} text{Криминал} event{click: getVKMovies(this)}");
  cmd("add button parent{byId: movie-search-div-0} text{Биография} event{click: getVKMovies(this)}");
  cmd("add button parent{byId: movie-search-div-0} text{Военный} event{click: getVKMovies(this)}");
  cmd("add div{id: movie-search-div-1} style{class: movie-search-row} parent{byId: movie-card-list}");
  cmd("add button parent{byId: movie-search-div-1} text{Боевик} event{click: getVKMovies(this)}");
  cmd("add button parent{byId: movie-search-div-1} text{Триллер} event{click: getVKMovies(this)}");
  cmd("add button parent{byId: movie-search-div-1} text{Приключения} event{click: getVKMovies(this)}");
  cmd("add button parent{byId: movie-search-div-1} text{Мелодрама} event{click: getVKMovies(this)}");
  cmd("add button parent{byId: movie-search-div-1} text{Комедия} event{click: getVKMovies(this)}");
  cmd("add button parent{byId: movie-search-div-1} text{Семейный} event{click: getVKMovies(this)}");
  cmd("add button parent{byId: movie-search-div-1} text{Фантастика} event{click: getVKMovies(this)}");

}

finderHtml();