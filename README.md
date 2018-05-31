# micro-lastfm

> Microservice to fetch last song scrobbled on Last.fm

[![Travis](https://img.shields.io/travis/gakimball/micro-lastfm.svg?maxAge=2592000)](https://travis-ci.org/gakimball/micro-lastfm)

## Setup

1. Clone the repository.
2. Copy `.env_example` to `.env` and fill in your Last.fm API key.
3. Run `npm start` to start the service.

## Usage

Load `/:user` to get the most recently played track (or the currently playing track) from a Last.fm user. A JSON object with these properties will be returned:

- `title`: song name.
- `artist`: artist name.
- `album`: album name.
- `live`: `true` if the user is currently listening to this song.
- `date`: timestamp at which user listened to this song, or `null` if they're currently listening.

## Local Development

```bash
git clone https://github.com/gakimball/micro-lastfm
cd micro-lastfm
npm install
```

To run the service in development mode, use `npm run dev`. To run the linter and unit tests, run `npm test`.

## License

MIT &copy; [Geoff Kimball](http://geoffkimball.com)
