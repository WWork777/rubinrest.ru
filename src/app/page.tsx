import Contacts from "./components/main-page/contacts/contacts";
import Form from "./components/main-page/form/form";
import Hero from "./components/main-page/hero/Hero";
import Ivents from "./components/main-page/ivents/ivents";
import Meropriyatiya from "./components/main-page/meropriyatiya/Meropriyatiya";
import Rewievs from "./components/main-page/rewievs/rewievs";
import Stoimost from "./components/main-page/stoimost/stoimost";
import Whyus from "./components/main-page/whyus/whyus";
import Zali from "./components/main-page/zali/zali";
import Quiz from "./components/main-page/quiz/quiz";

export default function Home() {
  return (
    <>
      <Hero />
      <Rewievs />
      <Quiz />
      <Ivents />
      <Zali />
      <Whyus />
      <Meropriyatiya />
      <Stoimost />
      <Form />
      <Contacts />
    </>
  );
}
