import Description from "../components/svadba-page/Descriton/Description";
import Hero from "../components/svadba-page/Hero/Hero";
import InPrice from "../components/svadba-page/IncludedInPrice/IncludedInPrice";
import Meropriyatiya from "../components/svadba-page/meropriyatiya/meropriyatiya";
import Special from "../components/svadba-page/Special/Special";
import Whyus from "../components/svadba-page/whyus/whyus";
import Zali from "../components/svadba-page/Zali/zali";

export default function svadba() {
    return (
        <>
        <Hero />
        <Description />
        <Special />
        <InPrice />
        <Zali />
        <Whyus />
        <Meropriyatiya />
        </>
    )
}