import { FC, PropsWithChildren, useState } from "react";
import { Container } from "react-grid-system";
import { Button } from "../../atomic/button.mol/button.mol";
import { Footer, Header, Main } from "../../atomic/layout.org/layout.mol";
import { H2 } from "../../atomic/typography.mol";
import { useOnboardTour } from "../home/onboard-tour/onboard-tour.context";
import { onboardTourCSSClass } from "../home/onboard-tour/onboard-tour.style";
import { string } from "./constants";
import { WalletManagerModal } from "./wallet-manager.modal";

export const SharedLayout: FC<PropsWithChildren> = ({ children }) => {
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
    const onboardTour = useOnboardTour();

    return (
        <>
            <Header>
                <H2 color="lightMain" paddingX="md" isBold>
                    {string.header}
                </H2>
                <Button
                    className={onboardTourCSSClass["onboard-tour-element-1"]}
                    variant="link"
                    onClick={() => {
                        setIsWalletModalOpen(true);
                    }}
                >
                    {string.manageWalletButton.text}
                </Button>
                <WalletManagerModal
                    isOpen={isWalletModalOpen}
                    onClose={() => {
                        setIsWalletModalOpen(false);
                    }}
                />
            </Header>
            <Main>
                <Container fluid>{children}</Container>
            </Main>
            <Footer>
                <Button variant="link" onClick={onboardTour.start}>
                    {string.onboardTourButton.text}
                </Button>
            </Footer>
        </>
    );
};
