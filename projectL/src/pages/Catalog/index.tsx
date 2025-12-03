import { CatalogContainer, CatalogHeaderContainer, PerfumeLayoutContainer } from "./styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PerfumeCard from "../../components/PerfumeCard";


export default function Catalog() {
    return (
        <>
            <Header />
            <CatalogContainer>
                <CatalogHeaderContainer>
                    PRODUTOS IMPORTADOS
                </CatalogHeaderContainer>
                <PerfumeLayoutContainer>
                    <PerfumeCard />
                </PerfumeLayoutContainer>
            </CatalogContainer>
            <Footer />
        </>
    )
}