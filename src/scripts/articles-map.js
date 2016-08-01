export class ArticlesMap {
  // Constructor
  constructor(config) {
    const htmlMode = typeof(config) === 'string';
    const containerElement = document.querySelector(
            htmlMode ?
            config :
            config.container
          );
    const arrowsElement = containerElement.querySelector(
            htmlMode ?
            '[data-module="amArrows"]' :
            config.arrows
          );
    const eastElement = arrowsElement.querySelector(
            htmlMode ?
            '[data-module="amEast"]' :
            config.east
          );
    const eventListeners = {};
    const mapElement = containerElement.querySelector(
            htmlMode ?
            '[data-module="amMap"]' :
            config.map
          );
    const northElement = arrowsElement.querySelector(
            htmlMode ?
            '[data-module="amNorth"]' :
            config.north
          );
    const options = (
            htmlMode ?
            containerElement.dataset :
            (config.options || {})
          );
    const southElement = arrowsElement.querySelector(
            htmlMode ?
            '[data-module="amSouth"]' :
            config.south
          );
    const westElement = arrowsElement.querySelector(
            htmlMode ?
            '[data-module="amWest"]' :
            config.west
          );

    this.arrowsElement = arrowsElement;
    this.autoScrollRange = (
      isNaN(options.autoScrollRange) ?
      80 :
      Number(options.autoScrollRange)
    );
    this.containerElement = containerElement;
    this.eventListeners = eventListeners;
    this.htmlMode = htmlMode;
    this.mapElement = mapElement;
    this.mapElement.style.left = 0;
    this.mapElement.style.top = 0;
    this.speed = isNaN(options.speed) ? 4 : Number(options.speed);
    this.transitionDuration = (
      isNaN(options.transitionDuration) ?
      480 :
      Number(options.transitionDuration)
    );

    window.addEventListener('keydown', (e) => this.keyDown(e));
    containerElement.addEventListener('mouseleave', () => this.mouseLeave());
    arrowsElement.addEventListener('mouseenter', () => this.arrowsMouseEnter());
    arrowsElement.addEventListener('mouseleave', () => this.arrowsMouseLeave());
    containerElement.addEventListener('mousemove', (e) => this.mouseMove(e));
    containerElement.addEventListener('mousedown', () => this.mouseDown());
    containerElement.addEventListener('mouseup', () => this.mouseUp());
    eastElement.addEventListener('mousedown', () => this.arrowGo('east'));
    northElement.addEventListener('mousedown', () => this.arrowGo('north'));
    southElement.addEventListener('mousedown', () => this.arrowGo('south'));
    westElement.addEventListener('mousedown', () => this.arrowGo('west'));
    if (htmlMode) {
      const articleElements = mapElement.querySelectorAll(
              '[data-module="amArticle"]'
            );

      for (let i = 0, ii = articleElements.length; i < ii; i++) {
        this.setArticle(articleElements.item(i));
      }
    } else {
      for (let i = 0, ii = config.articles.length; i < ii; i++) {
        this.setArticle(config.articles[i]);
      }
    }
    this.gotoArticle(0);
  }

  // Methods
  addEventListener(type, listener) {
    if (this.eventListeners[type]) {
      this.eventListeners[type].push(listener);
    } else {
      this.eventListeners[type] = [listener];
    }
  }
  arrowGo(direction) {
    this.isArrowActive = true;
    switch (direction) {
      case 'east':
        this.goEast(() => this.isArrowActive);
        break;
      case 'north':
        this.goNorth(() => this.isArrowActive);
        break;
      case 'south':
        this.goSouth(() => this.isArrowActive);
        break;
      case 'west':
        this.goWest(() => this.isArrowActive);
        break;
    }
  }
  arrowsMouseEnter() {
    this.isArrowsHover = true;
    this.isGoingEast = false;
    this.isGoingNorth = false;
    this.isGoingSouth = false;
    this.isGoingWest = false;
  }
  arrowsMouseLeave() {
    this.isArrowsHover = false;
  }
  dispatchEvent(type) {
    const eventListeners = this.eventListeners[type];

    for (let i = 0, ii = eventListeners.length; i < ii; i++) {
      eventListeners[i]();
    }
  }
  goAction(action, validator) {
    if (validator()) {
      action();
      this.dispatchEvent('move');
      window.setTimeout(() => {
        this.goAction(action, validator);
      }, 16);
    }
  }
  goEast(validator) {
    this.goAction(() => {
      this.mapElement.style.left = this.limitToRangeHorizontal(
        Number(this.mapElement.style.left.slice(0, -2)) - this.speed
      ) + 'px';
    }, validator);
  }
  goNorth(validator) {
    this.goAction(() => {
      this.mapElement.style.top = this.limitToRangeVertical(
        Number(this.mapElement.style.top.slice(0, -2)) + this.speed
      ) + 'px';
    }, validator);
  }
  goSouth(validator) {
    this.goAction(() => {
      this.mapElement.style.top = this.limitToRangeVertical(
        Number(this.mapElement.style.top.slice(0, -2)) - this.speed
      ) + 'px';
    }, validator);
  }
  gotoArticle(selector) {
    const articleElement = this.articleElements[
            typeof(selector) === 'number' ?
            selector :
            this.articleSelectors.indexOf(selector)
          ];

    this.mapElement.classList.add('is-goto');
    this.mapElement.style.left = this.limitToRangeHorizontal((
      this.containerElement.offsetWidth - articleElement.offsetWidth
    ) * .5 - articleElement.offsetLeft) + 'px';
    this.mapElement.style.top = this.limitToRangeVertical(
      - articleElement.offsetTop
    ) + 'px';
    window.setTimeout(
      () => this.mapElement.classList.remove('is-goto'),
      this.transitionDuration
    );
  }
  goWest(validator) {
    this.goAction(() => {
      this.mapElement.style.left = this.limitToRangeHorizontal(
        Number(this.mapElement.style.left.slice(0, -2)) + this.speed
      ) + 'px';
    }, validator);
  }
  keyDown(event) {
    if (!this.isKeyDown) {
      const keyUpEventListener = () => {
              window.removeEventListener('keyup', keyUpEventListener);
              this.isKeyDown = false;
            };

      this.isKeyDown = true;
      window.addEventListener('keyup', keyUpEventListener);
      switch (event.keyCode) {
        case 37:
          return this.goWest(() => this.isKeyDown);
        case 38:
          return this.goNorth(() => this.isKeyDown);
        case 39:
          return this.goEast(() => this.isKeyDown);
        case 40:
          return this.goSouth(() => this.isKeyDown);
      }
    }
  }
  limitToRange(value, min) {
    return Math.min(0, Math.max(min, value));
  }
  limitToRangeHorizontal(value) {
    return this.limitToRange(
      value,
      this.containerElement.offsetWidth - this.mapElement.offsetWidth
    );
  }
  limitToRangeVertical(value) {
    return this.limitToRange(
      value,
      this.containerElement.offsetHeight - this.mapElement.offsetHeight
    );
  }
  mouseDown() {
    this.isMouseDown = true;
  }
  mouseLeave() {
    this.isArrowActive = false;
    this.isGoingEast = false;
    this.isGoingNorth = false;
    this.isGoingSouth = false;
    this.isGoingWest = false;
    this.isMouseDown = false;
  }
  mouseMove(event) {
    if (this.isArrowsHover || this.isMouseDown) {
      this.isGoingEast = false;
      this.isGoingNorth = false;
      this.isGoingSouth = false;
      this.isGoingWest = false;
      if (this.isMouseDown && !this.isArrowsHover) {
        this.mapElement.style.left = this.limitToRangeHorizontal(
          Number(this.mapElement.style.left.slice(0, -2)) + event.movementX
        ) + 'px';
        this.mapElement.style.top = this.limitToRangeVertical(
          Number(this.mapElement.style.top.slice(0, -2)) + event.movementY
        ) + 'px';
      }
    } else {
      const position = {
              x: event.x - this.containerElement.offsetLeft,
              y: event.y - this.containerElement.offsetTop
            };

      if (position.x <= this.autoScrollRange) {
        if (!this.isGoingWest) {
          this.isGoingWest = true;
          this.goWest(() => this.isGoingWest);
        }
      } else {
        this.isGoingWest = false;
        if (
          position.x >=
          this.containerElement.offsetWidth - this.autoScrollRange
        ) {
          if (!this.isGoingEast) {
            this.isGoingEast = true;
            this.goEast(() => this.isGoingEast);
          }
        } else {
          this.isGoingEast = false;
        }
      }
      if (position.y <= this.autoScrollRange) {
        if (!this.isGoingNorth) {
          this.isGoingNorth = true;
          this.goNorth(() => this.isGoingNorth);
        }
      } else {
        this.isGoingNorth = false;
        if (
          position.y >=
          this.containerElement.offsetHeight - this.autoScrollRange
        ) {
          if (!this.isGoingSouth) {
            this.isGoingSouth = true;
            this.goSouth(() => this.isGoingSouth);
          }
        } else {
          this.isGoingSouth = false;
        }
      }
    }
  }
  mouseUp() {
    this.isArrowActive = false;
    this.isMouseDown = false;
  }
  removeEventListener(type, listener) {
    if (this.eventListeners[type]) {
      this.eventListeners[type] = this.eventListeners[type].filter(
        (eventListener) => eventListener !== listener
      );
    }
  }
  setArticle(article) {
    const articleSelector = this.htmlMode ? '#' + article.id : (
            typeof(article) === 'string' ?
            article :
            article.selector
          );
    const articleElement = (
            this.htmlMode ?
            article :
            document.querySelector(articleSelector)
          );

    if (!this.articleElements) {
      this.articleElements = [];
      this.articleSelectors = [];
    }
    this.articleElements.push(articleElement);
    this.articleSelectors.push(articleSelector);
    if (typeof(article) === 'object') {
      if (article.isMaxWidth || (
        this.htmlMode &&
        article.dataset.isMaxWidth !== undefined
      )) {
        articleElement.style.width = this.containerElement.offsetWidth + 'px';
      }
      if (article.x !== undefined || (
        this.htmlMode &&
        article.dataset.x !== undefined
      )) {
        articleElement.style.left = (
          this.htmlMode ? article.dataset.x : article.x
        ) + 'px';
      }
      if (article.y !== undefined || (
        this.htmlMode &&
        article.dataset.y !== undefined
      )) {
        articleElement.style.top = (
          this.htmlMode ? article.dataset.y : article.y
        ) + 'px';
      }
    }
  }
}
