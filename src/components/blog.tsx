import { useSelector } from "react-redux";
import BlogGrid from "./blogGrid"
import Header from "./header"
import { RootState } from "../store";



const Blog = () => {
    const user = useSelector((state: RootState) => state.user.user);
    console.log('user :>> ', user);
    return (
        <><Header /><BlogGrid /></>
    )
}

export default Blog