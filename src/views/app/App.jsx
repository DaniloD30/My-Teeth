import React from "react";
import { useSelector } from "react-redux";
import Routers from "~/components/app/routers/Routers";
import BaseLayout from "~/components/app/layout/BaseLayout";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  //   const { isAuthenticated } = useSelector((state) => state.auth);
  const  auth  = useSelector((state) => state.login?.auth);

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
