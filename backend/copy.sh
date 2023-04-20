# LINUX / MACOS ONLY

# Step 1
mkdir aws
mkdir aws/layers

# Step 2 -> Zip index.js
npm run --prefix main build
cp -r main aws/main
cp aws/main/dist/index.js aws/index.js
bash -c "cd aws && zip index.zip index.js"

# Step 3 -> Zip all modules except firebase
npm uninstall --prefix aws/main firebase firebase-admin firebase-functions
mkdir aws/layers/blog
mkdir aws/layers/blog/nodejs
cp aws/main/package.json  aws/layers/blog/nodejs/
cp aws/main/package-lock.json aws/layers/blog/nodejs/
npm install --prefix aws/layers/blog/nodejs 
# npm uninstall --prefix aws/layers/blog/nodejs bcrypt
# npm install --prefix aws/layers/blog/nodejs bcryptjs
bash -c "cd aws/layers/blog && zip -r nodejs.zip nodejs"

# Step 4 -> Zip firebase modules
mkdir aws/layers/firebase
mkdir aws/layers/firebase/nodejs
bash -c "cd aws/layers/firebase/nodejs && npm init -y"
npm install --prefix aws/layers/firebase/nodejs firebase firebase-admin firebase-functions
bash -c "cd aws/layers/firebase && zip -r nodejs.zip nodejs"

# Step 5 -> Clean up
rm -r aws/main
rm aws/index.js
rm -r aws/layers/blog/nodejs
rm -r aws/layers/firebase/nodejs