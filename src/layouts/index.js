import GithubCorner from '@/components/GithubCorner';
import styles from './index.css';

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <GithubCorner />
      {props.children}
    </div>
  );
}

export default BasicLayout;
