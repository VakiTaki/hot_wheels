import React, { FC } from "react";
import { useParams } from "react-router-dom";
type Props = {};

const Finance: FC<Props> = () => {
  const { id } = useParams();
  console.log(id);
  return <div>Finance</div>;
};

export default Finance;
