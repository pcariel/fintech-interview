### RUN On Local
Change APP ID OpenWeather in .env
npm install
npm run start:dev

### RUN On Docker
docker build -t fintechinterview:latest .
docker run --rm -d  -p 8080:8080 fintechinterview:latest


### Run Test
npm test
