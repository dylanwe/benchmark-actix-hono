import http from 'k6/http';
import { sleep } from 'k6';

const MAX_CLIENTS = 100;
const MIN_CLIENTS = 1;
const STAGE_INTERVAL = '2m';

function setupStages() {
  const stages = []

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
    test: {
      executor: 'ramping-vus',
      startVUs: MIN_CLIENTS,
      stages: setupStages(),
    },
  },
};

// The function that defines VU logic.
//
// See https://grafana.com/docs/k6/latest/examples/get-started-with-k6/ to learn more
// about authoring k6 scripts.
//
export default function() {
  http.get('http://192.168.68.148:30008/api/v1/submarine');
  http.get('http://192.168.68.148:30009/api/v1/submarine');
}
