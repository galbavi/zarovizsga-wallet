import { Button } from "@mui/material";

export const AddTransaction = ({ onAddNewTransaction }) => {
    return (
        <Button variant={"contained"} color="success" onClick={() => { onAddNewTransaction() }}>Add new Transaction</Button>);
}