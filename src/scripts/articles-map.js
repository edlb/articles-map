export class ArticlesMap {
  // Constructor
  constructor(config) {
    const containerElement = document.querySelector(config.container);
    const arrowsElement = containerElement.querySelector(config.arrows);
    const eastElement = arrowsElement.querySelector(config.east);
    const northElement = arrowsElement.querySelector(config.north);
    const options = config.options || {};
    const southElement = arrowsElement.querySelector(config.south);
    const westElement = arrowsElement.querySelector(config.west);

    this.arrowsElement = arrowsElement;
    this.autoScrollRange = options.autoScrollRange || 80;
    this.containerElement = containerElement;
    this.mapElement = containerElement.querySelector(config.map);
    this.mapElement.style.left = 0;
    this.mapElement.style.top = 0;
    this.speed = options.speed || 4;
    this.transitionDuration = options.transitionDuration || 480;

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
    for (let i = 0, ii = config.articles.length; i < ii; i++) {
      this.setArticle(config.articles[i]);
    }
    if (options.gotoFirstArticle) {
      this.gotoArticle(0);
    }
  }

  // Methods
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
  goAction(action, validator) {
    if (validator()) {
      action();
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
  goWest(validator) {
    this.goAction(() => {
      this.mapElement.style.left = this.limitToRangeHorizontal(
        Number(this.mapElement.style.left.slice(0, -2)) + this.speed
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
  setArticle(article) {
    const articleSelector = (
            typeof(article) === 'string' ?
            article :
            article.selector
          );
    const articleElement = document.querySelector(articleSelector);

    if (!this.articleElements) {
      this.articleElements = [];
      this.articleSelectors = [];
    }
    this.articleElements.push(articleElement);
    this.articleSelectors.push(articleSelector);
    if (typeof(article) === 'object') {
      if (article.isMaxWidth) {
        articleElement.style.width = this.containerElement.offsetWidth + 'px';
      }
      if (article.x !== undefined) {
        articleElement.style.left = article.x + 'px';
      }
      if (article.y !== undefined) {
        articleElement.style.top = article.y + 'px';
      }
    }
  }
}
