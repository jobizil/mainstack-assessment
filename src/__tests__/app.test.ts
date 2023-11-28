import request from 'supertest';

import app from '../../app';

describe('Health Check', () => {
    it('should return 200 OK', async () => {
        const res = await request(app).get('/api/v1/check');
        expect(res.status).toEqual(200);
        expect(res.text).toEqual('App is running!');
    });
});