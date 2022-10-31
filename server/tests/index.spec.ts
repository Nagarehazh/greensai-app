import app from '../src/app';
import request from 'supertest';

describe('GET /users/info', () => {
    it('should return 200 OK', () => {
        return request(app).get('/users/info').expect(200);
    });
});

describe('GET /admin/:id', () => {
    it('should return 200 OK', () => {
        return request(app).get('/admin/3').expect(200);
    });
});

