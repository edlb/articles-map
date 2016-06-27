import './styles/main.scss';
import { ArticlesMap } from './scripts/articles-map';

window.addEventListener('load', () => {
  const map = new ArticlesMap({
          arrows: '#map-arrows',
          articles: [{
            selector: '#article1',
            x: Math.random() * 1920,
            y: Math.random() * 3840
          }, {
            isMaxWidth: true,
            selector: '#article2',
            x: Math.random() * 3840,
            y: Math.random() * 3840
          }, {
            selector: '#article3',
            x: Math.random() * 3840,
            y: Math.random() * 3840
          }, {
            selector: '#article4',
            x: Math.random() * 3840,
            y: Math.random() * 3840
          }, {
            selector: '#article5',
            x: Math.random() * 3840,
            y: Math.random() * 3840
          }, {
            selector: '#article6',
            x: Math.random() * 3840,
            y: Math.random() * 3840
          }, {
            selector: '#article7',
            x: Math.random() * 3840,
            y: Math.random() * 3840
          }],
          container: '#map-container',
          east: '#map-east',
          map: '#map',
          north: '#map-north',
          options: {
            autoScrollRange: 80,
            gotoFirstArticle: true,
            speed: 4,
            transitionDuration: 480
          },
          south: '#map-south',
          west: '#map-west'
        });
  const navBtns = document.querySelectorAll('.nav-btn');

  for (let i = 0, ii = navBtns.length; i < ii; i++) {
    const navBtn = navBtns.item(i);
    const navBtnTarget = navBtn.dataset.target;

    navBtn.addEventListener('click', () => {
      map.gotoArticle(navBtnTarget);
    });
  }
});
