const request = require('supertest');
const app = require('../server/app');
const mongoose = require('mongoose');

describe('server request handling', () => {
  beforeAll(() => mongoose.connect('mongodb://localhost/silverspoon'));
  afterAll(() => mongoose.disconnect());

  test('It should respond to the GET method', () => (
    request(app).get('/').expect(200)
  ));

  test('It should respond with 404 when given wrong URL', () => (
    request(app).get('/doggo').expect(404)
  ));

  test('should return correct data shape for lunch menu', (done) => {
    request(app)
      .get('/restaurants/Mr.%20Gina%20Armstrong/menu/lunch')
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(20);
        done();
      })
      .catch(done.fail);
  });

  test('should return correct data shape for dinner menu', (done) => {
    request(app)
      .get('/restaurants/Mr.%20Gina%20Armstrong/menu/dinner')
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(20);
        done();
      })
      .catch(done.fail);
  });

  test('should return correct data shape for dessert menu', (done) => {
    request(app)
      .get('/restaurants/Mr.%20Gina%20Armstrong/menu/dessert')
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(8);
        done();
      })
      .catch(done.fail);
  });

  describe('returning only specified items based on their tags', () => {
    test('should return only gluten-free items', (done) => {
      request(app)
        .get('/restaurants/Mr.%20Gina%20Armstrong/menu/lunch/gluten-free')
        .then((response) => {
          const tagObj = {};
          response.body.forEach((item) => {
            const tag = item.tags;
            if (!tagObj[tag]) {
              tagObj[tag] = 1;
            } else {
              tagObj[tag] += 1;
            }
          });
          expect(Array.isArray(response.body)).toBe(true);
          expect(Object.keys(tagObj).length).toBe(1);
          done();
        })
        .catch(done.fail);
    });

    test('should return only vegan items', (done) => {
      request(app)
        .get('/restaurants/Mr.%20Gina%20Armstrong/menu/lunch/vegan')
        .then((response) => {
          const tagObj = {};
          response.body.forEach((item) => {
            const tag = item.tags;
            if (!tagObj[tag]) {
              tagObj[tag] = 1;
            } else {
              tagObj[tag] += 1;
            }
          });
          expect(Array.isArray(response.body)).toBe(true);
          expect(Object.keys(tagObj).length).toBe(1);
          done();
        })
        .catch(done.fail);
    });
    test('should return only gluten-free items', (done) => {
      request(app)
        .get('/restaurants/Mr.%20Gina%20Armstrong/menu/lunch/gluten-free')
        .then((response) => {
          const tagObj = {};
          response.body.forEach((item) => {
            const tag = item.tags;
            if (!tagObj[tag]) {
              tagObj[tag] = 1;
            } else {
              tagObj[tag] += 1;
            }
          });
          expect(Array.isArray(response.body)).toBe(true);
          expect(Object.keys(tagObj).length).toBe(1);
          done();
        })
        .catch(done.fail);
    });
  });
});