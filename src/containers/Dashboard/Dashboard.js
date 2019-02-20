import React from 'react';
import classes from './Dashboard.module.scss';

const Dashboard=()=>{
  return(
      <div className={classes.container}>
          <div className={classes.content}>
            <div className={classes.item}></div>
            <div className={classes.item}></div>
            <div className={classes.item}></div>
          </div>
          <div className={classes.latestItems}></div>
      </div>
  )
}
export default Dashboard;