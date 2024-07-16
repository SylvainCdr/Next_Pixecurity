import UserAccount from "@/templates/User/UserAccount/UserAccount";

export function getServerSideProps() {
  return {
    props: {},
  };
}

export default function Page() {
  return <UserAccount />;
}
