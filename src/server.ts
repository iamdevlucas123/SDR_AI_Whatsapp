import './config/env';
import app from './app';
import { env } from './config/env';

const PORT = env.PORT;

function listRoutes() {
  const router = (app as any).router;
  const stack = router?.stack ?? [];

  return stack
    .map((layer: any) => {
      if (layer.route?.path) {
        const methods = Object.keys(layer.route.methods)
          .filter((method) => layer.route.methods[method])
          .map((method) => method.toUpperCase())
          .join(', ');

        return `${methods} ${layer.route.path}`;
      }

      if (layer.name === 'router' && layer.handle?.stack) {
        return layer.handle.stack
          .filter((nestedLayer: any) => nestedLayer.route?.path)
          .map((nestedLayer: any) => {
            const methods = Object.keys(nestedLayer.route.methods)
              .filter((method) => nestedLayer.route.methods[method])
              .map((method) => method.toUpperCase())
              .join(', ');

            return `${methods} /webhook${nestedLayer.route.path}`;
          })
          .join('\n');
      }

      return null;
    })
    .filter(Boolean)
    .join('\n');
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Registered routes:\n${listRoutes()}`);
});
