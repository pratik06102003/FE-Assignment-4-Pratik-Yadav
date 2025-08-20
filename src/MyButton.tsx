import React from 'react';
import { Button } from 'antd';
import styles from './MyButton.module.scss';

const MyButton: React.FC = () => <Button className={styles.btn}>{JSON.stringify(styles)}</Button>;

export default MyButton;
