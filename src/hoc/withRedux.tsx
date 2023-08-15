import React from "react";
import { store } from "../store";
import { Provider } from "react-redux";

const withRedux =
  (Component: React.FC) =>
  ({ ...props }) => {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };

export default withRedux;
