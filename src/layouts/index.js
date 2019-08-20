import { Menu } from 'antd';
import GithubCorner from '@/components/GithubCorner';
import styles from './index.css';

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <Menu layout="inline">
        <Menu.Item>Star</Menu.Item>
        <Menu.Item>Contributor</Menu.Item>
        <Menu.Item>Commit</Menu.Item>
        <Menu.Item>Fork</Menu.Item>
      </Menu>
      <GithubCorner />
      {props.children}
    </div>
  );
}

export default BasicLayout;
