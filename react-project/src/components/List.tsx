import React from 'react'
import Item from "./Item"

type Story = {
  objectID: string;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
};

type Stories = Array<Story>;

type ListProps = {
  list: Stories;
  onRemoveItem: (item: Story) => void;
}

//.memo this performs an equality check if something changed for the component
const List = React.memo(({ list, onRemoveItem }: ListProps) =>
  <>
    {list.map(item => (
    <Item key={item.objectID}
      item={item}
      onRemoveItem={onRemoveItem} />
  ))}
  </>
);

export default List;

