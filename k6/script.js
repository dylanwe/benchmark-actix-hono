import http from 'k6/http';
import { sleep } from 'k6';

// const MAX_CLIENTS = 1000;
const MAX_CLIENTS = 400;
const MIN_CLIENTS = 20;
const STAGE_INTERVAL = '30s';
const REQUEST_OPTIONS = {
  timeout: '200ms',
};

const idkStage = [{
  target: MAX_CLIENTS,
  duration: '30s',
}]

function setupStages() {
  const stages = []
  // const CLIENTS_TO_ADD = 10;

  for (let i = MIN_CLIENTS; i <= MAX_CLIENTS; i++) {
    stages.push({
      target: i + 1,
      duration: STAGE_INTERVAL,
    });
  }

  return stages;
}

export const options = {
  scenarios: {
    // deno: {
    //   executor: 'ramping-vus',
    //   startVUs: MIN_CLIENTS,
    //   stages: setupStages(),
    //   exec: 'denoTest',
    // },
    actix: {
      executor: 'ramping-vus',
      // startVUs: MIN_CLIENTS,
      startVUs: MAX_CLIENTS,
      stages: idkStage,
      // stages: setupStages(),
      exec: 'actixTest',
    },
  },
};

export function denoTest() {
  http.get('http://192.168.68.148:30008/api/v1/submarine', REQUEST_OPTIONS);
  sleep(0.02);
}

export function actixTest() {
  http.get('http://localhost:8080/api/v1/submarine', REQUEST_OPTIONS);
  // http.get('http://192.168.68.148:30009/api/v1/submarine', REQUEST_OPTIONS);
  // sleep(0.02);
}

