import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>Next Js Meetups</title>
        <meta
          name="description"
          content="Browse a list of highly active next js meetups."
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}
export async function getStaticProps() {
  //fetch data from an Api
  const client = await MongoClient.connect(
    "mongodb+srv://testUser:testuser@cluster0.ijr5a.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
  };
}
export default HomePage;
//for server side rendering
// export async function gerServerSideProps(context) {
//   const req=context.req;
//   const res=context.res;
//   //fetch data from an Api
//   return {
//     props: {
//       meetups: data,
//     },
//   };
// }
