import { bootstrap } from './app';

const app = bootstrap();

app.init().catch((e) => console.log(e));
