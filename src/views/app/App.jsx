import React from "react";
import { useSelector } from "react-redux";
import Routers from "~/components/app/routers/Routers";
import BaseLayout from "~/components/app/layout/BaseLayout";
import "react-toastify/dist/ReactToastify.css";
// import loginAction from "~/actions/loginAction";
// import { useDispatch } from "react-redux";
// import userAction from "~/actions/userAction";
// import Utils from "~/helpers/Utils";
// import { getToken } from "~/services/auth";
const App = () => {
  //   const { isAuthenticated } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  const auth = useSelector((state) => state.login?.auth);

 

  return (
    <div>
      {auth ? (
        <BaseLayout.AuthenticatedLayout>
          <Routers.Authenticated />
        </BaseLayout.AuthenticatedLayout>
      ) : (
        <BaseLayout.AnonymousLayout>
          <Routers.Anonymous />
        </BaseLayout.AnonymousLayout>
      )}
    </div>
  );
};

export default App;
