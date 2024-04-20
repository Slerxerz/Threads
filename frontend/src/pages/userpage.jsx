import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"

const UserPage = ()=>{
    return(
        <>
        <UserHeader/>
        <UserPost likes={1200} replies={481} postImg="/post1.png" postTitle="Let's talk about threads."/>
        <UserPost likes={3400} replies={51} postImg="/post2.png" postTitle="Nice Tutorial !!!"/>
        <UserPost likes={124} replies={131} postImg="/post3.png" postTitle="I love this guy."/>
        <UserPost likes={23} replies={3} postTitle="This is my first thread."/>

        </>
    )
}

export default UserPage
