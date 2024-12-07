import { Button } from "@mui/material";

export const AddWallet = ({ onAddNewWallet }) => {
    return (
        <Button variant={"contained"} color="success" onClick={() => { onAddNewWallet() }}>Add new wallet</Button>);
}