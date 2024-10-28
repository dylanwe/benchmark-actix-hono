import http from 'k6/http';
import { sleep } from 'k6';

const MAX_CLIENTS = 620;
const MIN_CLIENTS = 20;
const STAGE_INTERVAL = '2m';
const REQUEST_OPTIONS = {
  timeout: '200ms',
};

function setupStages() {
  const stages = [];
  const iterations = Math.floor(MAX_CLIENTS / MIN_CLIENTS);

  for (let i = 0; i < iterations; i++) {
    stages.push({
      target: i * MIN_CLIENTS,
      duration: STAGE_INTERVAL,
    });
  }

  return stages;
}

export const options = {
  scenarios: {
    actix: {
      executor: 'ramping-vus',
      startVUs: MIN_CLIENTS,
      stages: setupStages(),
      exec: 'actixTest',
    },
    hono: {
      executor: 'ramping-vus',
      startVUs: MIN_CLIENTS,
      stages: setupStages(),
      exec: 'honoTest',
    },
  },
};

export function honoTest() {
  http.get('http://192.168.68.148:30008/api/v1/submarine', REQUEST_OPTIONS);
  sleep(0.02);
}

export function actixTest() {
  http.get('http://192.168.68.148:30009/api/v1/submarine', REQUEST_OPTIONS);
  sleep(0.02);
}

