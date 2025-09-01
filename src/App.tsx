import { Button } from 'antd';

import { testService } from '@app/services/firebaseTest.service';

export const App = () => (
  <Button type="primary" onClick={testService}>
    Test Firebase Service
  </Button>
);
