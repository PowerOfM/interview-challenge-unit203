cd server
npm install
cd ../client
npm install
cd ../

(trap 'kill 0' SIGINT; npm start --prefix server/ & npm start --prefix client/)