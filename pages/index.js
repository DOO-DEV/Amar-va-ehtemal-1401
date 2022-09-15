import Head from "next/head";
import { getLayout } from "../components/layout/PanelLayout";
import styles from "../styles/Home.module.css";
import { checkToken } from "../libs/utils";

export default function Home() {
  return null;
}

export const getServerSideProps = ({ req }) => {
  const { isAdmin } = checkToken(req);
  if (isAdmin) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin",
      },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/customer",
      },
    };
  }

  return { props: {} };
};

Home.getLayout = getLayout;
