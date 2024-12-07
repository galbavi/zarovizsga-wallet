import { WalletList } from "./components/WalletList"
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AXIOS_METHOD, useApi } from "../../hooks/useApi";
import { LoadingBlock } from "../../components/LoadingBlock";

export const SharedWalletList = () => {
    const { sessionUser } = useAuth();
    const navigate = useNavigate();
    const [walletsResult, loading, error] = useApi(AXIOS_METHOD.GET, `/wallets`);

    if (loading === false && error !== false) {
        navigate('/404'); // redirect to home page
        return null;
    }

    if (loading === true) {
        return <LoadingBlock />;
    }

    return <WalletList listName={"Shared Wallets"} wallets={walletsResult.filter(wallet => wallet.created_by.id !== sessionUser.id && wallet.access.some(user => user.id === sessionUser.id))} />
}