const url = require('url');
const fetch = require('node-fetch');
const queryString = require('query-string');
const dotenv = require('dotenv');

dotenv.config();

const apiKey = process.env.LASTFM_API_KEY;

if (!apiKey) {
  throw new Error('Last.fm API key is not set.');
}

// Create a micro-compatible error with a code and message
const createError = (code, message) => {
  const error = new Error(message);
  error.statusCode = code;
  return error;
};

module.exports = async req => {
  const user = url.parse(req.url).pathname.replace('/', '');
  const params = queryString.stringify({
    method: 'user.getrecenttracks',
    user,
    api_key: apiKey, // eslint-disable-line camelcase
    format: 'json',
    limit: 1
  });
  const res = await fetch(`http://ws.audioscrobbler.com/2.0/?${params}`);

  if (!res.ok) {
    throw createError(500, 'Could not connect to Last.fm API.');
  }

  const json = await res.json();

  if (json.error) {
    if (json.message.includes('User not found')) {
      throw createError(400, `User ${user} not found.`);
    }

    throw createError(500, json.message);
  }

  const [track] = json.recenttracks.track;
  const live = json['@attr'] ? json['@attr'].nowplaying === 'true' : false;

  return {
    title: track.name,
    album: track.album['#text'],
    artist: track.artist['#text'],
    live,
    date: track.date ? parseInt(track.date.uts, 10) : null
  };
};
