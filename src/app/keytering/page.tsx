import HeroKeytering from "../components/keytering-page/Hero/hero";
import Keytering from "../components/main-page/keytering/keytering";
import Portfolio from "../components/keytering-page/Portfolio/portfolio";
import Questions from "../components/main-page/questions/questions";
import Includes from "../components/keytering-page/Includes/includes";
import Work from "../components/keytering-page/Work/work";
import KeytEvents from "../components/keytering-page/Events/events";
import Reviews from "../components/main-page/rewievs/rewievs";
import Contacts from "../components/main-page/contacts/contacts";


export default function KeyteringPage() {
  return (
    <>
      <HeroKeytering />
      <Keytering/>
      <Portfolio/>
      <section className="container" style={{paddingTop:"0px"}}>
        <Questions/>
      </section>
      <Includes/>
      <Work/>
      <KeytEvents/>
      <Reviews/>
      <Contacts/>
    </>
  );
}
