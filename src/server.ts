import 'module-alias/register';
import Something  from '@src/app';

new Something().app.listen(process.env.PORT || 3000);
