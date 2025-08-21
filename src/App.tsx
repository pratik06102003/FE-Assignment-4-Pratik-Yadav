import { RouterProvider } from 'react-router-dom';

<<<<<<< HEAD
import { testService } from '@app/services/firebaseTest.service';

export const App = () => (
  <Button type="primary" onClick={testService}>
    Test Firebase Service
  </Button>
);
=======
import { router } from './routes/router';

export const App = () => <RouterProvider router={router} />;
>>>>>>> 5f8205e (YP_RU_01: Main Layout: Added Main Layuot (Rebased))
