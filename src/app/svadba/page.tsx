import Description from "../components/svadba-page/Descriton/Description";
import Hero from "../components/svadba-page/Hero/Hero";
import InPrice from "../components/svadba-page/IncludedInPrice/IncludedInPrice";
import Special from "../components/svadba-page/Special/Special";

export default function svadba() {
    return (
        <>
        <Hero />
        <Description />
        <Special />
        <InPrice />
        </>
    )
}