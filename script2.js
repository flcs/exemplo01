import http from 'k6/http';
import { sleep } from 'k6';

// export const options = {
//     vus: 10,
//     duration: '30s',
// };

export const options = {
    // duration: '30s',
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<500'], // 95 percent of response times must be below 500ms
    },
    stages: [
        { duration: '30s', target: 20 },
        { duration: '30s', target: 50 },
        { duration: '20s', target: 10 },
    ],
};



// export default function () {
//     http.get('http://test.k6.io');
//     sleep(1);
// }

export default function () {
    const res = http.get('https://httpbin.test.k6.io/');
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
}


