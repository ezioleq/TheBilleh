# The Billeh

[Play The Billeh in your browser](https://ezioleq.github.io/TheBilleh/)  
[Read the Mill Engine documentation](https://ezioleq.github.io/TheBilleh/docs/)

⚠️ **Heavy development, the game is unplayable right now** ⚠️

## Setup

### Game building

Clone the repository:

```
git clone https://github.com/Ezioleq/TheBilleh.git --depth 1
git lfs checkout
```

Build the game:

```
npm install
npm run build:prod
```

> You can type `npm run` to see available scripts.

And then open the `index.html` from the root directory to play.

### Documentation generation

```
npx typedoc
```

After this the documentation is available in the `docs/index.html` file.
