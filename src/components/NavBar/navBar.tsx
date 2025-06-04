type Props = {
  cartItemsCount: number;
};

export const NavBar = ({ cartItemsCount }: Props) => {
  return <div>{cartItemsCount}</div>;
};
