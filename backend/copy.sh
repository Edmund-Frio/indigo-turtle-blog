# LINUX / MACOS ONLY

npm run --prefix main build
cp -r main aws/main
npm uninstall --prefix aws/main firebase firebase-admin firebase-functions

mkdir aws/layers/blog
mkdir aws/layers/blog/nodejs
cp aws/main/package.json  aws/layers/blog/nodejs/
cp aws/main/package-lock.json aws/layers/blog/nodejs/
npm install --prefix aws/layers/blog/nodejs 
zip -r aws/layers/blog/blog.zip aws/layers/blog/nodejs

mkdir aws/layers/firebase
mkdir aws/layers/firebase/nodejs
bash -c "cd aws/layers/firebase/nodejs && npm init -y"
npm install --prefix aws/layers/firebase firebase firebase-admin firebase-functions
