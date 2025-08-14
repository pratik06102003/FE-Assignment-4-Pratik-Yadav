import { Button } from 'antd';
import { useFirebase } from './firebase';
export const App = () => {
  const firebase = useFirebase();
  return (
    <Button type="primary" onClick={firebase?.testService}>
      Test Firebase Service
    </Button>
  );
};
