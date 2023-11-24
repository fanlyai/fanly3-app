import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";

{/*9 SEP 2023*/}


export default function Home() {
  return (
    <>
    <Header showBackArrow label="Home"/>
    <Form placeholder="Whats happening"/>
    <PostFeed />
    </>
  )
}
