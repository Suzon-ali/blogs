import app from './app';
const port: number = 3000;

async function main() {
  app.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });
}

main();
