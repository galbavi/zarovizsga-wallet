import {Chip} from "@mui/material";

export const UserList  = ({users, onDelete}) => {
    return (
        <>
            {users.map(user => {
                return (<Chip variant="outlined"
                              key={user.id} label={user.name}
                              onDelete={() => onDelete(user.id)} />);
                            })}
        </>
    )
}