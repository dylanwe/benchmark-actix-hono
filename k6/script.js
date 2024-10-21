import http from 'k6/http';
import { sleep } from 'k6';

const MAX_CLIENTS = 1000;
const MIN_CLIENTS = 20;
const STAGE_INTERVAL = '30s';
const REQUEST_OPTIONS = {
  timeout: '200ms',
};

function setupStages() {
  const stages = []
  const CLIENTS_TO_ADD = 10;

  for (let i = MIN_CLIENTS; i <= (MAX_CLIENTS / CLIENTS_TO_ADD); i++) {
    stages.push({
      target: (i + 1) * CLIENTS_TO_ADD,
      duration: STAGE_INTERVAL,
    });
  }

  return stages;
}

export const options = {
  scenarios: {
    deno: {
      executor: 'ramping-vus',
      startVUs: MIN_CLIENTS,
      stages: setupStages(),
      exec: 'denoTest',
    },
    actix: {
      executor: 'ramping-vus',
      startVUs: MIN_CLIENTS,
      stages: setupStages(),
      exec: 'actixTest',
    },
  },
};

export function denoTest() {
  http.get('http://192.168.68.148:30008/api/v1/submarine', REQUEST_OPTIONS);
  sleep(0.02);
}

export function actixTest() {
  http.get('http://192.168.68.148:30009/api/v1/submarine', REQUEST_OPTIONS);
  sleep(0.02);
}

