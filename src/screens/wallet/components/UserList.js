import { Chip } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";

export const UserList = ({ createdBy, users, onDelete }) => {
    const { sessionUser } = useAuth();

    return (
        <>
            {users.map(user => {
                return (<Chip variant="outlined"
                    key={user.id} label={user.name}
                    onDelete={sessionUser.id === createdBy.id && user.id !== createdBy.id ? () => onDelete(user.id) : null} />);
            })}
        </>
    )
}