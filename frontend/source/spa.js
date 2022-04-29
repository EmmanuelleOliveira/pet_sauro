let page = null;

class BaseController {
  onLoad() {

  }

  onDestroy() {

  }
}

let controller = new BaseController();

let spaCurrentData = undefined

function sendData(data) {
  spaCurrentData = data
}

function navigate(url) {
  controller.onDestroy();
  controller = new BaseController();
  $("#spa-page-container").load(`/views/${url}/index.html`);
}

function declareController(ControllerClass) {
  controller = new ControllerClass();
  controller.onLoad(spaCurrentData);
  spaCurrentData = undefined;
}

document.body.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");
  if (link !== null) {
    e.preventDefault();
    navigate(link.attributes.href.value);
  }
});
