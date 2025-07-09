import request from 'supertest';
import app from '../src/index';

describe('basic test', () => {
  it('should return alarms', async () => {
    const res = await request(app).get('/api/alarms');
    expect(res.status).toBe(200);
  });
});
