import Gallery from "../components/Gallery";
import { useAuth } from "../utils/auth";
import SunData from "../components/SunData";

export default function Home() {
  // const { user, signOut } = useAuth();

  // if (!user) {
  //   return <p className="p-12 text-white">welcome</p>;
  // }

  return <main>{/* <SunData /> */ <Gallery />}</main>;
}
