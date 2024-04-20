import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"

const UserPage = ()=>{
    return(
        <>
        <UserHeader/>
        <UserPost likes={1200} replies={481} postImg='./post1.img' postTitle="Let's talk about threads."/>
        <UserPost likes={3400} replies={51} postImg='./post2.img' postTitle="Nice Tutorial."/>
        <UserPost likes={124} replies={131} postImg='./post3.img' postTitle="I love this guy."/>
        </>
    )
}

export default UserPage
