import http from 'k6/http';
import { sleep } from 'k6';

const MAX_CLIENTS = 200;
const STAGE_DURATION = '2h';
const REQUEST_OPTIONS = {
  timeout: '200ms',
};
const COMPLEX_REQUEST_BODY = JSON.stringify({
  instructions: "forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2\n"
});

export const options = {
  scenarios: {
    actix: {
      executor: 'ramping-vus',
      stages: [
        { duration: STAGE_DURATION, target: MAX_CLIENTS },
      ],
      exec: 'complexActixTest',
    },
    hono: {
      executor: 'ramping-vus',
      stages: [
        { duration: STAGE_DURATION, target: MAX_CLIENTS },
      ],
      exec: 'complexHonoTest',
    },
  },
};

export function simpleHonoTest() {
  http.get('http://192.168.68.148:30008/api/v1/submarine', REQUEST_OPTIONS);
  sleep(0.02);
}

export function simpleActixTest() {
  http.get('http://192.168.68.148:30009/api/v1/submarine', REQUEST_OPTIONS);
  sleep(0.02);
}

export function complexHonoTest() {
  http.post('http://192.168.68.148:30008/api/v1/dive', COMPLEX_REQUEST_BODY, REQUEST_OPTIONS);
  sleep(0.02);
}

export function complexActixTest() {
  http.post('http://192.168.68.148:30009/api/v1/dive', COMPLEX_REQUEST_BODY, REQUEST_OPTIONS);
  sleep(0.02);
}
