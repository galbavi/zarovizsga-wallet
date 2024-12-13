import { Grid2 } from "@mui/material"
import { WalletList } from "./components/WalletList"
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AXIOS_METHOD, useApi } from "../../hooks/useApi";
import { LoadingBlock } from "../../components/LoadingBlock";
import { MODALS, useModals } from "../../hooks/useModal";

export const MyWalletList = () => {
    const { sessionUser } = useAuth();
    const { showModal } = useModals();
    const navigate = useNavigate();
    const [walletsResult, loading, error, refreshWalletsList] = useApi(AXIOS_METHOD.GET, `/wallets`);

    const onAddNewWallet = () => {
        showModal(MODALS.WALLET,  { onSuccessful: refreshWalletsList });
    }

    if (loading === false && error !== false) {
        navigate('/404'); // redirect to home page
        return null;
    }

    if (loading === true) {
        return <LoadingBlock />;
    }

    return <WalletList listName={"My Wallets"} wallets={walletsResult.filter(wallet => wallet.created_by.id === sessionUser.id)} onAddNewWallet={onAddNewWallet} />
}