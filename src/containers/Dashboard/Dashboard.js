import React from 'react';
import classes from './Dashboard.module.scss';

const Dashboard=()=>{
  return(
      <div className={classes.content}>
          <div className={classes.item}></div>
          <div className={classes.item}></div>
          <div className={classes.item}></div>
          <div className={classes.item}></div>
      </div>
  )
}
export default Dashboard;