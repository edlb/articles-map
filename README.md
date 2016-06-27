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

```
new ArticlesMap({
  ...
});
```

### Parameters

| Parameter | Type   | Mandatory | Default |
|-----------|--------|-----------|---------|
| arrows    | string | yes       |         |
| articles  | array  | yes       |         |
| container | string | yes       |         |
| east      | string | yes       |         |
| map       | string | yes       |         |
| north     | string | yes       |         |
| options   | object | no        | {}      |
| south     | string | yes       |         |
| west      | string | yes       |         |

#### Article

Articles can be either a string (selector) or an object

| Parameter  | Type    | Mandatory | Default |
|------------|---------|-----------|---------|
| isMaxWidth | boolean | no        | false   |
| selector   | string  | yes       |         |
| x          | string  | no        |         |
| y          | string  | no        |         |

#### Options

| Parameter          | Type    | Mandatory | Default |
|--------------------|---------|-----------|---------|
| autoScrollRange    | number  | no        | 80      |
| gotoFirstArticle   | boolean | no        | false   |
| speed              | number  | no        | 4       |
| transitionDuration | number  | no        | 480     |
