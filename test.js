/* eslint-env mocha */

const {expect} = require('chai');
const micro = require('micro');
const testListen = require('test-listen');
const fetch = require('node-fetch');
const handler = require('.');

describe('micro-lastfm', () => {
  let service;

  beforeEach(() => {
    service = micro(handler);
  });

  afterEach(() => {
    service.close();
  });

  it('returns an object with track info', async () => {
    const url = await testListen(service);
    const res = await fetch(url + '/gakon5');

    if (!res.ok) {
      return new Error('Test service failed.');
    }

    const json = await res.json();

    expect(json).to.have.all.keys(['title', 'album', 'artist', 'live', 'date']);
  });
});
