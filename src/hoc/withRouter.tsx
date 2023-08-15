import { BrowserRouter } from "react-router-dom";

const withRouter =
  (Component: React.FC) =>
  ({ ...props }) => {
    return (
      <BrowserRouter>
        <Component {...props} />
      </BrowserRouter>
    );
  };

export default withRouter;
