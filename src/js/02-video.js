import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const CURTIME_KEY = 'videoplayer-current-time';

const onPlay = function ({ seconds }) {
  localStorage.setItem(CURTIME_KEY, seconds);
};
player.on('timeupdate', throttle(onPlay, 1000));

const currentTime = localStorage.getItem(CURTIME_KEY);
if (currentTime === null) {
  return;
} else {
  player.setCurrentTime(currentTime);
}
