import * as React from 'react';
import { Container } from "@mui/material";
import { AppMenu } from "./components/AppMenu";
import { Navigate, Route, Routes } from "react-router-dom";
import { Page404 } from "./screens/404/Page404";
import { Providers } from "./Providers";
import { useAuth } from "./hooks/useAuth";
import { LoginPage } from './screens/login/LoginPage';
import { MainPage } from './screens/list/MainPage';
import { RegistrationPage } from './screens/registration/RegistrationPage';
import { MyWalletList } from './screens/list/MyWalletList';
import { SharedWalletList } from './screens/list/SharedWalletList';
import { WalletPage } from './screens/wallet/WalletPage';

function ProtectedPage({ children }) {
    const { authToken } = useAuth();
    if (authToken === false) {
        return <Navigate to="/login"></Navigate>;
    }

    return children;
}

function App() {
    return (
        <Providers>
            <AppMenu />
            <Container maxWidth={"lg"}>
                <Routes>
                    <Route path="/" exact element={<ProtectedPage><MainPage /></ProtectedPage>} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/reg" element={<RegistrationPage />} />
                    <Route path="/mywallets" element={<ProtectedPage><MyWalletList /></ProtectedPage>} />
                    <Route path="/sharedwallets" element={<ProtectedPage><SharedWalletList /></ProtectedPage>} />
                    <Route path="/wallet/:id" element={<ProtectedPage><WalletPage/></ProtectedPage>}/>
                    {/* <Route path="/me" exact element={<ProtectedPage><MePage/></ProtectedPage>}/>
                    <Route path="/new" exact element={<ProtectedPage>
                        <NewPage/></ProtectedPage>}/>
                    <Route path="/user/:id" element={<ProtectedPage><UserPage/></ProtectedPage>}/> */}
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </Container>
        </Providers>
    );
}

export default App;
