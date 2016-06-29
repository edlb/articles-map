# Articles map

![Example screenshot](https://github.com/edlb/articles-map/raw/master/demo/screen.png)

## Getting Started

### Requirements

- [node v6.2.1](https://nodejs.org/) (may work on previous versions but isn't tested)
- [npm](https://www.npmjs.com/)

### Init project

```
git clone https://github.com/edlb/articles-map.git
cd articles-map
npm i
```

### Use example

```
npm start
```

Watch result http://localhost:7357

Update the files `src/index.html` and `src/main.js` as you wish

### Build js file

```
npm run build
```

Get the file at `dist/articles-map.js`

## Usage

Classic mode

```
new ArticlesMap({
  ...
});
```

or HTML mode

```
new ArticlesMap('<map-container-selector>');
```

In HTML mode, parameters are set through `data` attributes

Boolean parameters do not need a value

For example: `isMaxWidth: true` will be `data-is-max-width` while `x: 10` will be `data-x=10`

### Parameters

Mandatory is only relevant in classic mode

| Parameter | Type   | Mandatory | Default | HTML mode attribute   |
|-----------|--------|-----------|---------|-----------------------|
| arrows    | string | yes       |         | data-module=amArrows  |
| articles  | array  | yes       |         | data-module=amArticle |
| container | string | yes       |         |                       |
| east      | string | yes       |         | data-module=amEast    |
| map       | string | yes       |         | data-module=amMap     |
| north     | string | yes       |         | data-module=amNorth   |
| options   | object | no        | {}      |                       |
| south     | string | yes       |         | data-module=amSouth   |
| west      | string | yes       |         | data-module=amWest    |

#### Article

In classic mode, articles can be either a string (selector) or an object

| Parameter  | Type    | Mandatory | Default | HTML mode attribute  |
|------------|---------|-----------|---------|----------------------|
| isMaxWidth | boolean | no        | false   | data-is-max-width    |
| selector   | string  | yes       |         |                      |
| x          | string  | no        |         | data-x=\<value>      |
| y          | string  | no        |         | data-y=\<value>      |

#### Options

In HTML mode, options are attributes on the container element

| Parameter          | Type    | Mandatory | Default | HTML mode attribute               |
|--------------------|---------|-----------|---------|-----------------------------------|
| autoScrollRange    | number  | no        | 80      | data-auto-scroll-range=\<value>   |
| speed              | number  | no        | 4       | data-speed=\<value>               |
| transitionDuration | number  | no        | 480     | data-transition-duration=\<value> |
