import React from 'react'
import styles from '../App.module.css';
// import cs from "classnames"
import { ReactComponent as Check } from '../check.svg'

type Story ={
  objectID: string;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
};

type ItemProps = {
  item:Story;
  onRemoveItem: (item:Story) => void;
};

export default function Item({ item, onRemoveItem }: ItemProps) {
  return (
    <>
      <span>
        <a href={item.url}> {item.title} </a>
      </span>
      <span style={{ width: '30%' }}>{item.author} </span>
      <span>{item.num_comments} </span>
      <span>{item.points} </span>
      <span>
        {/* <button className = {`${styles.button} ${styles.buttonSmall}`} type="button" onClick={() => onRemoveItem(item)}> */}
        <button className={`${styles.button} ${styles.buttonSmall}`} type="button" onClick={() => onRemoveItem(item)}>
          <Check height="18px" width="18px" />
        </button>
      </span>
    </>

  )

}
