#/bin/sh
cd ./front-end
npm run build
cp -r ./dist/* ../back-end/public/
cd ..

